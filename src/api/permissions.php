<?php
class PERMISSIONS
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
        if (isset($output["permissions"])) {
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
}

$permissions = new PERMISSIONS();