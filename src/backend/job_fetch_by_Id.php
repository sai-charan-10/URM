<?php
// job_fetch_by_Id.php

// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with fetching job details
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get job ID from the Axios POST request in the React app
    $data = json_decode(file_get_contents('php://input'), true);
    $jobID = $_GET['id'];
    // Validate the received job ID here if needed

    // Fetch job data from the `position` table with the given job ID
    $sql = "SELECT * FROM `position` WHERE `positionID` = :jobID";
    $stmt = $connection->prepare($sql);

    // Bind parameters
    $stmt->bindValue(':jobID', $jobID, PDO::PARAM_INT);

    // Execute the query
    $stmt->execute();

    // Fetch the result
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output as JSON
    header('Content-Type: application/json');
    echo json_encode($result);
    $stmt->closeCursor();
    exit;
} else {
    // Handle other HTTP methods or return an error response
    $response = ['error' => 'Invalid request method'];
    
    // Output as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
