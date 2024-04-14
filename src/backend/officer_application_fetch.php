<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the userId parameter from the request data
    $data = json_decode(file_get_contents('php://input'), true);
    $userID = $data['userId'];

    // Fetch the job applications for the given userId
    $query = "SELECT DISTINCT 
                a.applicationID, 
                a.candidateID, 
                a.positionID, 
                a.status, 
                a.dateApplied, 
                p.title, 
                p.description,
                p.fieldOfStudy,
                c.name,
                p.qualification,
                i.institutionID
            FROM 
                application a
                JOIN position p ON a.positionID = p.positionID
                JOIN academicinstitution i ON p.institutionID = i.institutionID
                JOIN candidate c ON a.candidateID = c.candidateID
                JOIN deiofficer d ON p.institutionID = d.institute
            WHERE 
                a.status = 'applied' 
                AND d.officerID = :userID;
            ";
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
header('Content-Type: application/json');
echo json_encode($response);
?>
