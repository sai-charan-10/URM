<?php
include 'db_connection.php';

function getUsers($currentUserId = null, $currentUserType, $offset = 0, $limit = 10) {
    global $connection;
    // Prepare a WHERE clause to exclude the current user if currentUserId is provided

    // Query to fetch users from the database, optionally excluding the current user
    
    $sql = "";
    switch ($currentUserType) {
        case 'candidate':
            $sql = "SELECT officerID as id, name as username, 'officer' as usertype FROM deiofficer
            UNION
            SELECT institutionID as id, name as username, 'institute' as usertype FROM academicinstitution
            UNION
            SELECT candidateID as id, name as username, 'candidate' as usertype FROM candidate WHERE candidateID != $currentUserId";
            break;
        case 'officer':
            $sql = "SELECT candidateID as id, name as username,'candidate' as usertype FROM candidate
            UNION
            SELECT institutionID as id, name as username,'institute' as usertype FROM academicinstitution
            UNION
            SELECT officerID as id, name as username,'officer' as usertype FROM deiofficer WHERE officerID != $currentUserId";
            break;
        case 'institute':
            $sql = "SELECT candidateID as id, name as username,'candidate' as usertype FROM candidate
            UNION
            SELECT officerID as id, name as username, 'officer' as usertype FROM deiofficer
            UNION
            SELECT institutionID as id, name as username,'institute' as usertype FROM academicinstitution WHERE institutionID != $currentUserId";
            break;
        default:
            // Handle unknown user types
            return null;
    }
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    return $users;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $currentUserId = $data['currentUserId'];
        $currentUserType = $data['currentUserType'];
        // Fetch job data from the database
        $users = getUsers($currentUserId, $currentUserType);

        // Return the job data as JSON response
        $response = array('status' => 'success', 'userId'=>$currentUserId,'users' => $users);
        echo json_encode($response);
    } catch (PDOException $e) {
        // Handle any database connection or query errors
        $response = array('status' => 'error', 'userId'=>$currentUserId, 'userType'=>$currentUserType, 'message' => 'Failed to fetch users');
        echo json_encode($response);
    }
}
?>

