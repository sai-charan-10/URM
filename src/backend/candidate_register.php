<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with the registration process
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receive POST data from frontend
    $type = $_POST['type'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phoneNumber = $_POST['phoneNumber'];
    $address = $_POST['address'];
    $fieldofstudy = $_POST['fieldofstudy'];
    $education = $_POST['education'];
    $dofb = $_POST['dofb'];
    $summary = $_POST['summary'];
    $experience = $_POST['experience'];
    $isurm = $_POST['isurm'];
    $race = $_POST['race'];
    $resume = basename($_FILES['resume']['name']);
    $resumePath = 'uploads/resumes/';
    $resumeTargetPath = $resumePath . $resume;

//    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Determine the appropriate database table based on the selected type
    $tableName = 'candidate';

    // Check if the user already exists in the database
    $sqlCheckExistingUser = "SELECT * FROM $tableName WHERE email = :email";
    $stmtCheckExistingUser = $connection->prepare($sqlCheckExistingUser);
    $stmtCheckExistingUser->bindValue(':email', $email, PDO::PARAM_STR);
    $stmtCheckExistingUser->execute();
    $result = $stmtCheckExistingUser->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'User with the provided email already exists. Please try logging in.');
        echo json_encode($response);
        $stmtCheckExistingUser->closeCursor();
        exit;
    }

    // Handle file upload
    if (move_uploaded_file($_FILES['resume']['tmp_name'], $resumeTargetPath)) {
        // Insert user data into the appropriate database table
        $sql = "INSERT INTO $tableName (name, email, phoneNumber, password, address, fieldOfStudy, education, experience, dateOfBirth, summary, isURM, race, resume) VALUES (:name, :email, :phoneNumber, :password, :address, :fieldofstudy, :education, :experience, :dofb, :summary, :isurm, :race, :resume)";
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':name', $name, PDO::PARAM_STR);
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);
        $stmt->bindValue(':phoneNumber', $phoneNumber, PDO::PARAM_STR);
        $stmt->bindValue(':password', $password, PDO::PARAM_STR);
        $stmt->bindValue(':address', $address, PDO::PARAM_STR);
        $stmt->bindValue(':fieldofstudy', $fieldofstudy, PDO::PARAM_STR);
        $stmt->bindValue(':education', $education, PDO::PARAM_STR);
        $stmt->bindValue(':experience', $experience, PDO::PARAM_STR);
        $stmt->bindValue(':dofb', $dofb, PDO::PARAM_STR);
        $stmt->bindValue(':summary', $summary, PDO::PARAM_STR);
        $stmt->bindValue(':isurm', $isurm, PDO::PARAM_STR);
        $stmt->bindValue(':race', $race, PDO::PARAM_STR);
        $stmt->bindValue(':resume', $resumeTargetPath, PDO::PARAM_STR);

        if ($stmt->execute()) {
            // Registration successful
            $response = array('status' => 'success', 'message' => 'Registration successful.');
            echo json_encode($response);
        } else {
            // Registration failed
            $response = array('status' => 'error', 'message' => 'Registration failed. Please try again later.');
            echo json_encode($response);
        }

        $stmt->closeCursor();
    } else {
        // File upload failed
        $response = array('status' => 'error', 'message' => 'File upload failed. Please try again.');
        echo json_encode($response);
    }

    // Close the database connection and exit
    // Example: $connection = null;
    exit;
}
?>
