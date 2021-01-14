<?php
require "data.php";

header("Content-Type: application/json");
print($info->getJSON());