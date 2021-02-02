<?php
require_once "../api/login.php";
$login->checkLogin();

header("Content-Type: application/json");
print json_encode($login->getUser());
