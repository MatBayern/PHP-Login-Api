<?php
require "../../api/login.php";

$username = $login->getUsername();
$password = $login->getPassword();

$login->addUserWithPermissions($username, $password, "admin");
$login->throwSuccess();