<?php
// job_save.php

// Include your database connection file here
include 'db_connection.php';
// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the jobID and userID from the request
    $data = json_decode(file_get_contents('php://input'), true);

    $jobID = $data['jobId'];
    $userID = $data['userId'];

    // Assuming you have a way to identify the candidate (e.g., using session, authentication, etc.)
    $candidateID = $userID;

    $sqlCheckExisting = "SELECT * FROM application WHERE positionID=:jobID AND candidateID=:candidateID AND status='saved'";
    $stmtCheckExisting = $connection->prepare($sqlCheckExisting);
    $stmtCheckExisting->bindParam(':jobID', $jobID);
    $stmtCheckExisting->bindParam(':candidateID', $candidateID);
    $stmtCheckExisting->execute();
    $result = $stmtCheckExisting->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'You already saved the job.');
        echo json_encode($response);
        $stmtCheckExisting->closeCursor();
        exit;
    }
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
    
    // The job is not saved, insert a new record
    $query = "INSERT INTO `Application` (`positionID`, `candidateID`, `status`, `dateApplied`) 
                VALUES (:jobID, :candidateID, 'saved', NOW())";
    $stmt = $connection->prepare($query);
    $stmt->bindValue(':jobID', $jobID);
    $stmt->bindValue(':candidateID', $candidateID);

    if ($stmt->execute()) {
        // The job is saved successfully
        $response = array(
            'status' => 'success',
            'message' => 'Job Saved Successfully',
        );
    } else {
        // An error occurred while saving the job
        $response = array(
            'status' => 'error',
            'message' => 'Failed to save the job',
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
