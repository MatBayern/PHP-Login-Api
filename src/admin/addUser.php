<?php
require "../api/login.php";
$login->checkLoginWithPermissions($_SESSION["username"], "admin");
$username = $login->getUsername();
$password = $login->getPassword();
$permissions = $_POST["permissions"];
$login->addUserWithPermissions($username, $password, $permissions);
$login->throwSuccess();