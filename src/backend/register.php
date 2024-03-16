<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with the registration process
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get login data from the Axios POST request in the React app
    $data = json_decode(file_get_contents('php://input'), true);

    // Receive POST data from frontend
    $type = $data['type'];
    $name = $data['name'];
    $email = $data['email'];
    $phoneNumber = $data['phoneNumber'];
    $password = $data['password'];

    // Validate the received data here if needed

    // Determine the appropriate database table based on the selected type
    $tableName = '';
    switch ($type) {
        case 'candidate':
            $tableName = 'candidate'; // Replace with the actual table name for candidates
            break;
        case 'institute':
            $tableName = 'academicinstitution'; // Replace with the actual table name for institutes
            break;
        case 'recruiter':
            $tableName = 'recruiter'; // Replace with the actual table name for recruiters
            break;
        case 'officer':
            $tableName = 'deiofficer'; // Replace with the actual table name for officers
            break;
        case 'admin':
            $tableName = 'admin'; // Replace with the actual table name for admins
            break;
        default:
            // Invalid type received, you can handle the error here
            $response = array('status' => 'error', 'message' => 'Invalid registration type.');
            echo json_encode($response);
            exit;
    }

    // Check if the user already exists in the database
    $sqlCheckExistingUser = "SELECT * FROM $tableName WHERE email = :email";
    $stmtCheckExistingUser = $connection->prepare($sqlCheckExistingUser);
    $stmtCheckExistingUser->bindValue(':email', $email, PDO::PARAM_STR);
    $stmtCheckExistingUser->execute();
    $result = $stmtCheckExistingUser->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'User with the provided email already exists. Please try logging in.');
        echo json_encode($response);
        $stmtCheckExistingUser->closeCursor();
        exit;
    }

    // Insert user data into the appropriate database table
    $sql = "INSERT INTO $tableName (name, email, phoneNumber, password) VALUES (:name, :email, :phoneNumber, :password)";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':phoneNumber', $phoneNumber, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Registration successful
        $response = array('status' => 'success', 'message' => 'Registration successful.');
        echo json_encode($response);
    } else {
        // Registration failed
        $response = array('status' => 'error', 'message' => 'Registration failed. Please try again later.');
        echo json_encode($response);
    }

    // Close the database connection and exit
    $stmt->closeCursor();
    // Example: $connection = null;
    exit;
}
?>
