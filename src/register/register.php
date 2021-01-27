<?php
require "../api/login.php";

$username = $login->getUsername();
$password = $login->getPassword();

$login->addUser($username, $password);
$login->throwSuccess();
