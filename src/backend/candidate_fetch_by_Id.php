<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $candidateID = $data['id'];

    // Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM candidate WHERE candidateID=:candidateID";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':candidateID', $candidateID);

    if ($stmt->execute()) {
        $candidates = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (count($candidates) > 0) {
            $pdf_url = $candidates[0]['resume'];
            $pdf_data = file_get_contents($pdf_url);

            if ($pdf_data !== false) {
                $response = array(
                    'status' => 'success',
                    'details' => $candidates,
                    'resume' => base64_encode($pdf_data), // Encode PDF data as base64
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'message' => 'Failed to retrieve PDF file',
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'message' => 'Candidate not found',
            );
        }
    } else {
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
