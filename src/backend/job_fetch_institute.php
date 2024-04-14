<?php
// db_connection.php - Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed to fetch the job data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Fetch job data from the database
    $data = json_decode(file_get_contents('php://input'), true);
    $instituteID = $data['userId'];
    $sql = "SELECT * FROM position WHERE institutionID=:instituteID";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':instituteID', $instituteID);
    if ($stmt->execute()) {
        $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response = array(
            'status' => 'success',
            'jobs' => $jobs,
        );
    }
    else{
        $response = array(
            'status' => 'error',
            'message' => 'Failed to fetch job applications',
        );
    }
    $stmt->closeCursor();
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method',
    );
}
header('Content-Type: application/json');
echo json_encode($response);
?>
