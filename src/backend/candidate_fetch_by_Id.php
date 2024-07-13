<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $candidateID = isset($data['id']) ? intval($data['id']) : null;

    if (!$candidateID) {
        $response = array(
            'status' => 'error',
            'message' => 'Invalid candidate ID'
        );
        echo json_encode($response);
        exit;
    }

    // Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM candidate WHERE candidateID = :candidateID";
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':candidateID', $candidateID, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $candidates = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($candidates) > 0) {
            $pdf_url = $candidates[0]['resume'];

            // Debugging output
            error_log("Trying to access resume file: $pdf_url");

            // Ensure the file exists before trying to read it
            if (file_exists($pdf_url) && is_readable($pdf_url)) {
                $pdf_data = file_get_contents($pdf_url);

                if ($pdf_data !== false) {
                    $response = array(
                        'status' => 'success',
                        'details' => $candidates,
                        'resume' => base64_encode($pdf_data) // Encode PDF data as base64
                    );
                } else {
                    $response = array(
                        'status' => 'error',
                        'message' => 'Failed to read PDF file'
                    );
                    error_log("Error: Failed to read PDF file at $pdf_url");
                }
            } else {
                // More detailed error messages for debugging
                if (!file_exists($pdf_url)) {
                    $response = array(
                        'status' => 'error',
                        'message' => 'PDF file does not exist'
                    );
                    error_log("Error: PDF file does not exist at $pdf_url");
                } elseif (!is_readable($pdf_url)) {
                    $response = array(
                        'status' => 'error',
                        'message' => 'PDF file is not readable'
                    );
                    error_log("Error: PDF file is not readable at $pdf_url");
                }
            }
        } else {
            $response = array(
                'status' => 'error',
                'message' => 'Candidate not found'
            );
            error_log("Error: Candidate not found for candidateID $candidateID");
        }
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Failed to fetch candidate details'
        );
        error_log("Error: Failed to execute query for candidateID $candidateID");
    }
    $stmt->closeCursor();
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method'
    );
    error_log("Error: Invalid request method");
}

header('Content-Type: application/json');
echo json_encode($response);
?>
