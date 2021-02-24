<?php
require_once "../api/login.php";
$login->checkLogin();
if ($login->checkPermission($_SESSION["username"], "admin")) {
    header("Content-Type: application/json");
    $json["info"] = $login->countUser();
    if (isset($_POST["search"]) && isset($_POST["limit"])) {
        $json["user"] = $login->getUser($_POST["search"], $_POST["limit"]);
    } else if (isset($_POST["id"])) {
        $ids = json_decode($_POST["id"]);
        $user = [];
        for ($i = 0; $i < count($ids); $i++) {
            $confirmUser = $login->getUserByID($ids[$i]);
            array_push($user, $confirmUser);
        }
        $json["user"] = $user;
    }
    print json_encode($json);
}
