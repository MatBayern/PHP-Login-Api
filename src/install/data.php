<?php
class INFO {
    public $configPath;
    public $phpVersion;
    public $phpRequiredVersion;
    public $phpVersionCompatible;
    public $phpMysqliInstalled;
    public $configPermission;
    public $configOwner;
    public $configGroup;
    public $configWritable;
    public $processUser;
    
    
    function __construct(){
        $this->configPath = realpath('../config.php');
        $this->phpVersion = PHP_VERSION;
        $this->phpRequiredVersion = '7.3.0';
        if (version_compare($this->phpVersion, $this->phpRequiredVersion) >= 0) {
            $this->phpVersionCompatible = true;
        }
        $this->phpMysqliInstalled = in_array('mysqli', get_loaded_extensions());
        $this->configPermission = substr(sprintf('%o', fileperms($this->configPath)), -4);
        $this->configOwner = posix_getpwuid(fileowner($this->configPath))["name"];
        $this->configGroup = posix_getpwuid(filegroup($this->configPath))["name"];
        $this->configWritable = is_writable($this->configPath);
        $this->processUser = posix_getpwuid(posix_geteuid())['name'];
    }
    function getJSON() {
        $json = json_encode($this);
        return $json;
    }
}

$info = new INFO();