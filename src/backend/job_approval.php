<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the jobID, userID, and instituteID from the request
    $data = json_decode(file_get_contents('php://input'), true);

    $jobID = $data['jobId'];
    $candidateID = $data['candidateId'];
    $institutionID = $data['instituteId'];

    // Update the application record in the database
    $query = "INSERT INTO interview (candidateID, institutionID, positionID) VALUES (:candidateID, :institutionID, :jobID)";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':jobID', $jobID);
    $stmt->bindParam(':candidateID', $candidateID);
    $stmt->bindParam(':institutionID', $institutionID);

    if ($stmt->execute()) {
        // The job is applied successfully
        $response = array(
            'status' => 'success',
            'message' => 'Candidate recruited',
        );
    } else {
        // An error occurred while recruiting the candidate
        $response = array(
            'status' => 'error',
            'message' => 'Failed to recruit candidate',
        );
    }

    // Close the statement
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
