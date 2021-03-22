<?php
require "api/login.php";
$login->logout();
header('Location: /');