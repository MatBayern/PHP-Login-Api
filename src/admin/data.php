<?php
require_once "../api/login.php";
$login->checkLogin();
if ($login->checkPermission($_SESSION["username"], "admin")) {
    header("Content-Type: application/json");
    $json["info"] = $login->countUser();
    if (isset($_POST["search"]) && isset($_POST["limit"])) {
        $json["user"] = $login->getUser($_POST["search"], $_POST["limit"]);
    }
    print json_encode($json);
}