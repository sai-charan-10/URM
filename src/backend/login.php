<?php
// Include the database connection file
include 'db_connection.php';

// Get login data from the Axios POST request in the React app
$data = json_decode(file_get_contents('php://input'), true);

$type = $data['type'];
$email = $data['email'];
$password = $data['password'];

// Determine the table based on the selected 'type'
$table = '';
switch ($type) {
    case 'candidate':
        $table = 'candidate';
        break;
    case 'institute':
        $table = 'academicinstitution';
        break;
    case 'recruiter':
        $table = 'recruiter';
        break;
    case 'officer':
        $table = 'deiofficer';
        break;
    case 'admin':
        $table = 'admin';
        break;
    default:
        $response = array('status' => 'error', 'message' => 'Invalid credentials');
        // Handle any other cases if needed
        //break;
}

// Perform necessary validation and database operations to check user's credentials
// For example, assuming your users table has fields 'email' and 'password'
$query = "SELECT * FROM $table WHERE email = :email AND password = :password";
$stmt = $connection->prepare($query);
$stmt->execute(array(':email' => $email, ':password' => $password));
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Respond with a JSON object indicating the result of the login attempt
if ($user) {
    // Store the user data in the session
    session_start();
    $_SESSION['user_data'] = $user;
    
    $response = array('status' => 'success', 'message' => 'Login successful', 'type'=> $type, 'userData' => $user);
} else {
    $response = array('status' => 'error', 'message' => 'Invalid credentials');
}

header('Content-Type: application/json');
echo json_encode($response);
?>



