<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the userId parameter from the request data
    $data = json_decode(file_get_contents('php://input'), true);
    $userID = $data['userId'];

    // Fetch the job applications for the given userId
    $query = "SELECT a.applicationID, a.candidateID, a.positionID, a.status, a.dateApplied, i.name, p.title, p.description
            FROM application a, academicinstitution i, position p
            WHERE a.candidateID = :userID AND a.status = 'saved' AND a.positionID=p.positionID AND p.institutionID=i.institutionID";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':userID', $userID);

    if ($stmt->execute()) {
        // Fetch the job applications successfully
        $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'status' => 'success',
            'jobs' => $jobs,
        );
    } else {
        // An error occurred while fetching the job applications
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

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
