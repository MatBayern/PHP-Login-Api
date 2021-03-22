<?php
require "api/login.php";

if ($login->login()) {
    $login->throwSuccess();
}
else {
    $login->throwError("Invalid login credentials");
}