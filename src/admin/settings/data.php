<?php
require_once "../../api/login.php";
header("Content-Type: application/json");
print json_encode($login->getSettings());