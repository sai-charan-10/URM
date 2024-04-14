<?php
// Replace these with your database connection details
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the userId parameter from the request data
    $data = json_decode(file_get_contents('php://input'), true);
    $senderId = $data['senderId'];
    $senderType = $data['senderType'];
    $recipientId = $data['recipientId'];
    $recipientType = $data['recipientType'];

    // Fetch the job applications for the given userId
    $query = "SELECT * FROM messages WHERE (senderId = :senderId AND senderType = :senderType AND receiverId = :recipientId AND receiverType = :recipientType) OR (senderId = :recipientId AND senderType = :recipientType AND receiverId = :senderId AND receiverType = :senderType) ORDER BY timestamp";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':senderId', $senderId);
    $stmt->bindParam(':senderType', $senderType);
    $stmt->bindParam(':recipientId', $recipientId);
    $stmt->bindParam(':recipientType', $recipientType);

    if ($stmt->execute()) {
        $mesgs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'status' => 'success',
            'messages' => $mesgs,
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
