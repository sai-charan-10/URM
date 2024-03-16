<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the user ID from the request
    $data = json_decode(file_get_contents('php://input'), true);

    $userID = $data['userId'];

    // Fetch the officer's profile data from the `Officers` table with the given userID
    $query = "SELECT * FROM `Officers` WHERE `OfficerID` = :userID";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':userID', $userID);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Officer profile data found
        $profileData = $stmt->fetch(PDO::FETCH_ASSOC);
        $response = array(
            'status' => 'success',
            'profileData' => $profileData,
        );
    } else {
        // Officer profile data not found
        $response = array(
            'status' => 'error',
            'message' => 'Officer profile data not found',
        );
    }

    $stmt->closeCursor();
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method',
    );
}

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
