<?php
// contact.php

// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with the job posting process
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get job data from the Axios POST request in the React app
    $data = json_decode(file_get_contents('php://input'), true);

    // Receive POST data from frontend
    $name = $data['name'];
    $email = $data['email'];
    $comments = $data['comments'];

    // Validate the received data here if needed

    // Insert job data into the `Job` table
    $sql = "INSERT INTO `feedback` (`name`, `email`, `comments`)
        VALUES (:name, :email, :comments)";

    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':comments', $comments, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Job posting successful

        // Fetch existing jobs posted from the database
        $sqlFetchFeedback = "SELECT * FROM `feedback`";
        $stmtFetchFeedback = $connection->prepare($sqlFetchFeedback);
        $stmtFetchFeedback->execute();
        $feedbacks = $stmtFetchFeedback->fetchAll(PDO::FETCH_ASSOC);

        $response = array('status' => 'success', 'message' => 'Feedback sent successfully.', 'feedback' => $feedbacks);
        echo json_encode($response);
    } else {
        // Job posting failed
        $response = array('status' => 'error', 'message' => 'Feedback failed. Please try again later.');
        echo json_encode($response);
    }

    // Close the database connection and exit
    $stmt->closeCursor();
    // Example: $connection = null;
    exit;
}
?>
