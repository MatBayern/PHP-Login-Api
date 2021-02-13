<?php
require_once "../api/login.php";
$login->checkLogin();
if ($login->checkPermission($_SESSION["username"], "admin")) {
    header("Content-Type: application/json");
    print json_encode($login->getUser($_POST["search"], $_POST["limit"]));
}