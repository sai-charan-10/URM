<?php
include './backend/db_connection.php';
include './backend/jwt.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$action = $uri[3];

$bearer_token = get_bearer_token();
$is_jwt_valid = isset($bearer_token) ? is_jwt_valid($bearer_token) : false;

$database = new Database();

if ($action === 'register') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $user = [
        'type' => $_POST['type'],
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'phoneNumber' => $_POST['phoneNumber'],
        'password' => md5($_POST['password']),
        'status' => $_POST['phoneNumber'],
    ];

    if ($user_id = $database->register($user)) {
        $user['id'] = $user_id;
        if ($code = $database->generateConfirmCode($user_id)) {
            //send generated code by email to user
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwt = generate_jwt($headers, $payload);
            return_json(['status' => $jwt]);
        }
    }
// } elseif ($action === 'confirm') {
//     if ($is_jwt_valid) {
//         $rest_json = file_get_contents('php://input');
//         $_POST = json_decode($rest_json, true);
//         $user_id = getPayload($bearer_token)->user->id;

//         if ($database->confirmCode($user_id, $_POST['code'])) {
//             if ($database->activeUser($user_id)) {
//                 return_json(['status' => 1]);
//             }
//         }
//     }
} elseif ($action === 'login') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);

    if (
        $user = $database->loginUser(
            $_POST['type'],
            $_POST['email'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $user];
        $jwt = generate_jwt($headers, $payload);
        return_json(['status' => $jwt]);
    }
} elseif ($action === 'reset') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);

    if ($user = $database->getUserByUsernameOrEmail($_POST['email'], $_POST['userType'])) {
        $generated_password = uniqid(round(11111, 99999));
        $user['password'] = md5($generated_password);
        if ($database->updateUser($_POST['email'], $_POST['userType'])) {
            //send password ($generated_password value) to user by email
            return_json(['status' => 1]);
        }
    }
} elseif ($action === 'user') {
    if ($is_jwt_valid) {
        $email = getPayload($bearer_token)->user->email;
        if ($user = $database->getUserByUsernameOrEmail($email)) {
            return_json(['status' => $user]);
        }
    }
}
return_json(['status' => 0]);

function return_json($arr)
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}