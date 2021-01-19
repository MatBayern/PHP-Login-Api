<?php
class USER
{
    private $conn;

    public function __construct()
    {
        require "../config.php";

        // Create connection
        $this->conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    }

    public function __destruct()
    {
        $this->conn->close();
    }

    public function addUser($username, $password)
    {
        // Hash password
        // $password = password_hash($password0, PASSWORD_ARGON2ID, $hashOptions);
        $password = password_hash($password, PASSWORD_ARGON2ID);

        $stmt = $this->conn->prepare("INSERT INTO user (user, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
    }

    public function addUserWithPermissions($username, $password)
    {
        $this->addUser($username, $password);
        require "permissions.php";
        $permission = array($username);
        $args = func_get_args();
        for ($i = 2; $i < count($args); $i++) {
            array_push($permission, $args[$i]);
        }
        call_user_func_array(array($permissions, "addPermissions"), $permission);
    }

    public function deleteUser($username)
    {
        $stmt = $this->conn->prepare("DELETE FROM `user` WHERE `user` = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
    }

    public function checkUser($user)
    {
        $stmt = $this->conn->prepare('SELECT user FROM user WHERE user = ?');
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $result = $stmt->get_result();
        $output = $result->fetch_assoc();
        if (isset($output["user"])) {
            return true;
        } else {
            return false;
        }
    }
}

$user = new USER();
