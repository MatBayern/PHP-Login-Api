<?php

class loginData
{
    public $login = false;
}

session_start();

$loginData = new loginData();

if (isset($_SESSION["login"])) {
    $loginData->login = $_SESSION["login"];
}

header("Content-Type: application/json");
$json = json_encode($loginData);
print($json);
?>