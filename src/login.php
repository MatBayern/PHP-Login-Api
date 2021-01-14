<?php
require "config.php";

if (isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
} else {
    $username = "";
    $password = "";
}

// Create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// prepare and bind
$stmt = $conn->prepare('SELECT password FROM user WHERE user = ?');
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
$output = $result->fetch_assoc();

class loginData
{
    public $login = false;
}

session_start();
$_SESSION["login"] = false;
if ($result->num_rows === 1) {
    if (password_verify($password, $output["password"])) {
        $_SESSION["login"] = true;
        if ($redirect === true) {
            header("Location: " . $redirectPath);
        }
    }

}

$conn->close();

header("Content-Type: application/json");
$loginData = new loginData();
$loginData->login = $_SESSION["login"];
$json = json_encode($loginData);
print($json);