<?php
// job_update.php

// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with updating the job data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the job ID from the URL parameter
    //$jobID = $_GET['id'];
    //$jobID = isset($_GET['jobID']) ? $_GET['jobID'] : null;
    // Get job data from the Axios POST request in the React app
    $data = json_decode(file_get_contents('php://input'), true);

    // Receive POST data from frontend
    $jobID = $data['id'];
    $title = $data['title'];
    $fieldOfStudy = $data['fieldOfStudy'];
    $description = $data['description'];
    $location = $data['location'];
    $qualification = $data['qualification'];
    $salary = $data['salary'];

    // Validate the received data here if needed

    // Update job data in the `Job` table
    $sql = "UPDATE `position` SET `title` = :title, `description` = :description, `fieldOfStudy` = :fieldOfStudy, `qualification` = :qualification, `salary` = :salary, `location` = :location WHERE `positionID` = :jobID";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':jobID', $jobID, PDO::PARAM_INT);
    $stmt->bindValue(':title', $title, PDO::PARAM_STR);
    $stmt->bindValue(':description', $description, PDO::PARAM_STR);
    $stmt->bindValue(':fieldOfStudy', $fieldOfStudy, PDO::PARAM_STR);
    $stmt->bindValue(':qualification', $qualification, PDO::PARAM_STR);
    $stmt->bindValue(':salary', $salary, PDO::PARAM_STR);
    $stmt->bindValue(':location', $location, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Job data updated successfully

        // Fetch the updated job data from the database
        $sqlFetchJob = "SELECT * FROM `position` WHERE `positionID` = :jobID";
        $stmtFetchJob = $connection->prepare($sqlFetchJob);
        $stmtFetchJob->bindValue(':jobID', $jobID, PDO::PARAM_INT);
        $stmtFetchJob->execute();
        $job = $stmtFetchJob->fetch(PDO::FETCH_ASSOC);

        $response = array('status' => 'success', 'message' => 'Job data updated successfully.', 'job' => $job);
        echo json_encode($response);
    } else {
        // Job data update failed
        $response = array('status' => 'error', 'message' => 'Job data update failed. Please try again later.');
        echo json_encode($response);
    }

    // Close the database connection and exit
    $stmt->closeCursor();
    // Example: $connection = null;
    exit;
}
?>
