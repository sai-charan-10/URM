<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming you have already established a connection to the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the profile data from the request
    $userID = $_POST['userID'];
    $name = $_POST['pName'];
    $email = $_POST['pEmail'];
    $password = $_POST['pPassword'];
    $address = $_POST['pAddress'];
    $phoneNumber = $_POST['pPhoneNumber'];
    $fieldOfStudy = $_POST['pFieldOfStudy'];
    $education = $_POST['pEducation'];
    $experience = $_POST['pExperience'];
    $dateOfBirth = $_POST['pDateOfBirth'];
    $summary = $_POST['pSummary'];
    $isURM = 1;
    $race = $_POST['pRace'];

    $resumeFileName = basename($_FILES['pResume']['name']);

    // Set the paths to store the uploaded files
    $resumePath = '../uploads/resumes/';

    $resumeTargetPath = $resumePath . $resumeFileName;

    if (move_uploaded_file($_FILES['pResume']['tmp_name'], $resumeTargetPath)) {

        // Update the user's profile data in the `Candidates` table with the given userID
        $query = "UPDATE `candidate` SET 
                    `name` = :name,
                    `email` = :email,
                    `password` = :password,
                    `address` = :address,
                    `phoneNumber` = :phoneNumber,
                    `fieldOfStudy` = :fieldOfStudy,
                    `education` = :education,
                    `experience` = :experience,
                    `dateOfBirth` = :dateOfBirth,
                    `summary` = :summary,
                    `isURM` = :isURM,
                    `race` = :race,
                    `resume` = :resume
                  WHERE `candidateID` = :userID";

        $stmt = $connection->prepare($query);
        $stmt->bindParam(':userID', $userID);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':phoneNumber', $phoneNumber);
        $stmt->bindParam(':fieldOfStudy', $fieldOfStudy);
        $stmt->bindParam(':education', $education);
        $stmt->bindParam(':experience', $experience);
        $stmt->bindParam(':dateOfBirth', $dateOfBirth);
        $stmt->bindParam(':summary', $summary);
        $stmt->bindParam(':isURM', $isURM);
        $stmt->bindParam(':race', $race);
        $stmt->bindParam(':resume', $resumeTargetPath);

        if ($stmt->execute()) {
            // Profile data updated successfully
            $response = array(
                'status' => 'success',
                'message' => 'Profile data updated successfully',
            );
        } else {
            // An error occurred while updating the profile data
            $response = array(
                'status' => 'error',
                'message' => 'Failed to update profile data',
            );
        }

        $stmt->closeCursor();
    } else {
        // An error occurred while uploading the files
        $response = array(
            'status' => 'error',
            'message' => 'Failed to upload files',
        );
    }
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
