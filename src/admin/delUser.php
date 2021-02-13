<?php
require "../api/login.php";
$login->checkLoginWithPermissions($_SESSION["username"], "admin");
$id = $_POST["id"];
if ($login->checkUserByID($id)) {
    $login->deleteUserByID($id);
    $login->throwSuccess();
} else {
    $login->throwError("User doesn't exist!");
}
