<?php
$data = '<?php
$dbServername = "'. $_POST["dbServername"].'";
$dbUsername = "'.$_POST["dbUsername"].'";
$dbPassword = "'. $_POST["dbPassword"].'";
$dbName = "'.$_POST["dbName"].'";';
file_put_contents('../config.php', $data);
chmod("../config.php", 0644);
require "../config.php";
require "data.php";

class tableData
{
    public $success = true;
    public $error;
}

$tableData = new tableData();

if ($info->phpVersionCompatible === false) {
    $tableData->success = false;
    $tableData->error = "Outdated php version!";
}

if ($info->phpMysqliInstalled === false) {
    $tableData->success = false;
    $tableData->error = "MySQLi extention is not installed!";
}

if ($info->configWritable === false) {
    $tableData->success = false;
    $tableData->error = "Config is not writable!";
}

// Create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    $tableData->success = false;
    $tableData->error = "Connection failed: " . $conn->connect_error;
}

$sql = 'CREATE TABLE `php-login`.`user` ( `user` VARCHAR(64) NOT NULL ,  `password` TINYTEXT NOT NULL ,  `permissions` JSON ,  `creationDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,  `ID` INT NOT NULL AUTO_INCREMENT ,    PRIMARY KEY  (`ID`),    UNIQUE  (`user`));';

if ($tableData->success) {
    if ($conn->query($sql) === true) {
        $tableData->success = true;
    } else {
        $tableData->success = false;
        $tableData->error = $conn->error;
    }
}

$conn->close();

header("Content-Type: application/json");
$json = json_encode($tableData);
print($json);


/* $redirect = false;
$redirectPath = "";

$hashOptions = [
    'memory_cost' => 97656,
    'time_cost' => 8,
    'threads' => PASSWORD_ARGON2_DEFAULT_THREADS,
]; */