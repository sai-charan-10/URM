<?php
// job_apply.php

// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the jobID and userID from the request

    $data = json_decode(file_get_contents('php://input'), true);

    $jobID = $data['jobId'];
    $userID = $data['userId'];
    $candidateID = $userID;

    $sqlCheckExisting = "SELECT * FROM application WHERE positionID=:jobID AND candidateID=:candidateID AND status='applied'";
    $stmtCheckExisting = $connection->prepare($sqlCheckExisting);
    $stmtCheckExisting->bindParam(':jobID', $jobID);
    $stmtCheckExisting->bindParam(':candidateID', $candidateID);
    $stmtCheckExisting->execute();
    $result = $stmtCheckExisting->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'You already applied for the job.');
        echo json_encode($response);
        $stmtCheckExisting->closeCursor();
        exit;
    }
    $sqlCheckExisting = "SELECT * FROM interview WHERE positionID=:jobID AND candidateID=:candidateID";
    $stmtCheckExisting = $connection->prepare($sqlCheckExisting);
    $stmtCheckExisting->bindParam(':jobID', $jobID);
    $stmtCheckExisting->bindParam(':candidateID', $candidateID);
    $stmtCheckExisting->execute();
    $result = $stmtCheckExisting->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'You already applied and selected for interview.');
        echo json_encode($response);
        $stmtCheckExisting->closeCursor();
        exit;
    }
    // Insert the application record in the database
    $query = "INSERT INTO `application` (`positionId`, `candidateId`, `status`, `dateApplied`) 
              VALUES (:jobID, :candidateID, 'applied', CURDATE())";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':jobID', $jobID);
    $stmt->bindParam(':candidateID', $candidateID);

    if ($stmt->execute()) {
        // The job is applied successfully
        $response = array(
            'status' => 'success',
            'message' => 'Job Applied Successfully',
        );
    } else {
        // An error occurred while applying for the job
        $response = array(
            'status' => 'error',
            'message' => 'Failed to apply for the job',
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
