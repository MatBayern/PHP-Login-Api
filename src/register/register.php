<?php
require "../config.php";

if (isset($_POST["username"]) && isset($_POST["password0"]) && isset($_POST["password1"])) {
    $username = $_POST["username"];
    $password0 = $_POST["password0"];
    $password1 = $_POST["password1"];
} else {
    $username;
    $password0;
    $password1;
}

class userData
{
    public $created = true;
    public $createdUser;
    public $error;
}
$userData = new userData();

function throwError($errorMessage)
{
    global $userData;
    $userData->created = false;
    $userData->error = $errorMessage;
}


// check if username empty
if (empty($username)) {
    throwError("Username can't be empty!");
}

// check if password empty
if (empty($password0) || empty($password1)) {
    throwError("Password can't be empty!");
}

// check if passwords are equal
if ($password0 != $password1) {
    throwError("Passwords are not equal!");
}

// Create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user exists
$stmt = $conn->prepare('SELECT user FROM user WHERE user = ?');
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    throwError("User already exits!");
}
// Checking if the username is too long
if (strlen($username) > 64) {
    throwError("Username is too long!");
}

if ($userData->created === true) {
    require "../api/user.php";
    $user->addUser($username, $password0);
}

$conn->close();

header("Content-Type: application/json");
$json = json_encode($userData);
print($json);