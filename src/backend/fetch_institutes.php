<?php
include 'db_connection.php';
function getinstitutes() {
    global $connection;
    $sql = "SELECT institutionID, name FROM `academicinstitution`";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $institutes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    return $institutes;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $institutes = getinstitutes();

        $response = array('status' => 'success', 'institutes' => $institutes);
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = array('status' => 'error', 'message' => 'Failed to fetch institutes.');
        echo json_encode($response);
    }
}
?>
