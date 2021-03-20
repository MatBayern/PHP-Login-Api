<?php
require_once "../../api/login.php";
$login->checkLoginWithPermissions($_SESSION["username"], "admin");
header("Content-Type: application/json");
$settings = $login->getSettings();
for ($i = 0; $i < count($settings); $i++) {
    $name = $settings[$i]["name"];
    if (isset($_POST[$name])) {
        $value = $_POST[$name];
        if (is_numeric($value)) {
            if ($name === "register") {
                $login->setSetting($name, $value);
            } else {
                if ($value > 0) {
                    $login->setSetting($name, $value);
                } else {
                    $login->throwError("Invalid value for " . $name);
                }
            }
        }else {
            $login->throwError("Invalid value for " . $name);
        }
    }
}
$login->throwSuccess();
