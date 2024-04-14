<?php
include 'db_connection.php';

// Function to send a message and save it to the database
function sendMessage($senderId, $senderType, $recipientId, $recipientType, $message, $time_stamp) {
    global $connection;
    $senderId = intval($senderId);
    $recipientId = intval($recipientId);
    // Query to insert the message into the messages table
    $query = "INSERT INTO messages (senderId, senderType, receiverId, receiverType, message, timestamp) VALUES (:senderId, :senderType, :recipientId, :recipientType, :message, :time_stamp)";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':senderId', $senderId, PDO::PARAM_INT);
    $stmt->bindParam(':senderType', $senderType, PDO::PARAM_STR);
    $stmt->bindParam(':recipientId', $recipientId, PDO::PARAM_INT);
    $stmt->bindParam(':recipientType', $recipientType, PDO::PARAM_STR);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->bindParam(':time_stamp', $time_stamp, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Registration successful
        $response = array('sender_id'=>$senderId, 'sender_type'=>$senderType, 'recipient_id'=>$recipientId, 'receipient_type'=>$recipientType, 'message' => $message, 'timestamp' => $time_stamp);
        echo json_encode($response);
    } else {
        // Registration failed
        $response = array('status' => 'error', 'message' => 'Failed');
        echo json_encode($response);
    }

    // Close the database connection and exit
    $stmt->closeCursor();
    // Example: $connection = null;
    exit;
}


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the message data from the POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $senderId = $data['senderId'];
    $senderType = $data['senderType'];
    $receiverId = $data['receiverId'];
    $receiverType = $data['receiverType'];
    $messageContent = $data['message'];
    $senttime = $data['timestamp'];
    sendMessage($senderId, $senderType, $receiverId, $receiverType, $messageContent, $senttime);

    echo 'Message sent successfully!';
} else {
    http_response_code(405);
    echo 'Method Not Allowed';
}
?>

