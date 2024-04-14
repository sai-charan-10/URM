<?php
// db_connection.php - Include your database connection file here
include 'db_connection.php';

// Function to fetch job data from the database and return as JSON
function getJobDataFromDatabase($userID) {
    global $connection;

    // Fetch job data from the `Job` table
    $sql = "SELECT p.positionID, p.title, p.description, p.fieldOfStudy, p.qualification, p.salary, p.location, i.name
            FROM position p, academicinstitution i
            WHERE p.institutionID=i.institutionID AND i.institutionID=:userID";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':userID', $userID);
    $stmt->execute();
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Close the database connection and return the job data
    $stmt->closeCursor();
    return $jobs;
}

// Assuming your database connection is established, you can proceed to fetch the job data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $userID = $data['userId'];
        // Fetch job data from the database
        $jobs = getJobDataFromDatabase($userID);

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
