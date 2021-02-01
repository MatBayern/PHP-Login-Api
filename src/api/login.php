<?php
class ERR
{
    public $error = false;
    public $errorMessage;

    public function __construct($errMsg = "")
    {
        if ($errMsg !== "") {
            $this->error = true;
            $this->errorMessage = $errMsg;
        }
    }
}

class LOGIN
{
    // Variables
    private $conn;
    private $username;
    private $password0;
    private $password1;
    //Contstructor
    public function __construct()
    {
        //Check if content is in the POST request
        if ((isset($_POST["username"]) && isset($_POST["password0"]) && isset($_POST["password1"]))) {
            $this->username = $_POST["username"];
            $this->password0 = $_POST["password0"];
            $this->password1 = $_POST["password1"];
        }
        require __DIR__ . "/../config.php";

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

    /*

    USER

     */

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
        $permission = array($username);
        $args = func_get_args();
        for ($i = 2; $i < count($args); $i++) {
            array_push($permission, $args[$i]);
        }
        call_user_func_array(array($this, "addPermissions"), $permission);
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

    /*

    PERMISSONS

     */

    public function getPermissions($user)
    {
        // prepare and bind
        $stmt = $this->conn->prepare('SELECT permissions FROM user WHERE user = ?');
        $stmt->bind_param("s", $user);
        $stmt->execute();

        $result = $stmt->get_result();
        $output = $result->fetch_assoc();
        $permissions = json_decode($output["permissions"]);

        return $permissions;
    }

    public function checkPermission($user, $permissions)
    {
        $oldPermissons = $this->getPermissions($user);
        if (isset($oldPermissons)) {
            if (in_array($permissions, $oldPermissons)) {
                $output = true;
            } else {
                $output = false;
            }
        } else {
            $output = false;
        }

        return $output;
    }

    public function addPermissions($user)
    {
        $oldPermissons = $this->getPermissions($user);
        if (!isset($output["permissions"])) {
            $oldPermissons = array();
        }
        $args = func_get_args();
        for ($i = 1; $i < count($args); $i++) {
            $permission = $args[$i];
            if ($this->checkPermission($user, $permission) === false) {
                array_push($oldPermissons, $permission);
            }
        }
        $oldPermissons = array_unique($oldPermissons);
        $permissions = json_encode($oldPermissons);

        // prepare and bind
        $stmt = $this->conn->prepare("UPDATE `user` SET `permissions` = ? WHERE `user` = ?;");
        $stmt->bind_param("ss", $permissions, $user);
        $stmt->execute();
    }

    public function deletePermissions($user)
    {
        $oldPermissons = $this->getPermissions($user);
        $args = func_get_args();
        for ($i = 1; $i < count($args); $i++) {
            $permission = $args[$i];
            if ($this->checkPermission($user, $permission) === true) {
                // array_push($oldPermissons, $permission);
                $index = array_search($permission, $oldPermissons);
                unset($oldPermissons[$index]);
                $oldPermissons = array_values($oldPermissons);
            }
        }

        $permissions = json_encode($oldPermissons);

        // prepare and bind
        $stmt = $this->conn->prepare("UPDATE `user` SET `permissions` = ? WHERE `user` = ?;");
        $stmt->bind_param("ss", $permissions, $user);
        $stmt->execute();
    }

    /*

    REQUEST

     */

    public function checkUsername($username)
    {

        // check if username empty
        if (empty($username)) {
            $this->throwError("Username can't be empty!");
            return false;
        }
        // check if username is too long
        else if (strlen($username) > 64) {
            $this->throwError("Username is too long!");
            return false;
        }
        // check if user already exsits
        else if ($this->checkUser($username)) {
            $this->throwError("Username already exsits!");
            return false;
        } else {
            return true;
        }
    }

    public function getUsername()
    {
        if ($this->checkUsername($this->username)) {
            return $this->username;
        }
    }

    public function getPassword()
    {
        if ($this->checkPassword($this->password0) and $this->comparePasswords($this->password0, $this->password1)) {
            return $this->password0;
        }
    }

    public function checkPassword($password)
    {
        // check if password empty
        if (!empty($password)) {
            return true;
        } else {
            $this->throwError("Password can't be empty!");
            return false;
        }
    }

    public function comparePasswords($password0, $password1)
    {
        // check if passwords are equal
        if ($password0 === $password1) {
            return true;
        } else {
            $this->throwError("Passwords are not equal!");
            return false;
        }
    }

    public function throwError($errorMessage, $printError = true)
    {
        $error = new ERR($errorMessage);

        if ($printError) {
            header("Content-Type: application/json");
            $json = json_encode($error);
            print($json);
            exit();
        }

    }

    public function throwSuccess()
    {
        $error = new ERR();

        header("Content-Type: application/json");
        $json = json_encode($error);
        print($json);
        exit();
    }
}

$login = new LOGIN();
