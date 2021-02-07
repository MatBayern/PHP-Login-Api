<?php
require "../api/login.php";
$login->checkLogin();
if ($login->checkPermission($_SESSION["username"],"admin")) {
    $id = $_POST["id"];

    $login->deleteUserByID($id);
    $login->throwSuccess();
}
