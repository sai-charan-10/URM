<?php
// db_connection.php - Include your database connection file here
include 'db_connection.php';

// Function to fetch job data from the database for multiple job IDs
function getJobsDataFromDatabase($jobIDs) {
    global $connection;

    // Prepare the list of job IDs for the SQL query
    $placeholders = implode(',', array_fill(0, count($jobIDs), '?'));

    // Fetch job data from the `position` table for the specified job IDs
    $sql = "SELECT * FROM `position` WHERE positionID IN ($placeholders)";
    $stmt = $connection->prepare($sql);
    $stmt->execute($jobIDs);
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Close the database connection and return the job data
    $stmt->closeCursor();
    return $jobs;
}

// Assuming your database connection is established, you can proceed to fetch the job data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get the job IDs from the request data
        $data = json_decode(file_get_contents('php://input'), true);
        $jobIDs = $data['jobIDs'];

        // Fetch job data from the database for the specified job IDs
        $jobs = getJobsDataFromDatabase($jobIDs);

        // Return the job data as JSON response
        $response = array('status' => 'success', 'jobs' => $jobs);
        echo json_encode($response);
    } catch (PDOException $e) {
        // Handle any database connection or query errors
        $response = array('status' => 'error', 'message' => 'Failed to fetch job data.');
        echo json_encode($response);
    }
}
?>
