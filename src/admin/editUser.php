<?php
require "../api/login.php";
$login->checkLoginWithPermissions($_SESSION["username"], "admin");
$id = $_POST["id"];
if ($login->checkUsername($_POST["username"])) {
    $login->renameUser($id, $_POST["username"]);
    $login->throwSuccess();
} else {
    $login->throwError("User doesn't exist!");
}
