<?php
class LOGINDATA
{
    public $created = true;
    public $createdUser;
    public $error;
}

class REGISTERDATA
{
    public $created = true;
    public $createdUser;
    public $error;
}

class REQUEST
{
    public function __construct()
    {

    }

    public function __destruct()
    {

    }

    public function checkUsername($username)
    {
        require "user.php";
        // check if username empty
        if (empty($userData)) {
            throwError("Username can't be empty!");
            return false;
        }
         // check if username is too long
        else if (strlen($username) > 64) {
            throwError("Username is too long!");
            return false;
        }
         // check if user already exsits
        else if (checkUser($username) !== true) {
            return false;
            throwError("Username already exsits!");
           
        }else {
            return true;
        }
    }

    public function checkPassword($password)
    {
        // check if password empty
        if (!empty($password)) {
            return true;
        } else {
            throwError("Password can't be empty!");
            return false;
        }
    }

    public function comparePasswords($password0, $password1)
    {
        // check if passwords are equal
        if ($password0 === $password1) {
            return true;
        } else {
            throwError("Passwords are not equal!");
            return false;
        }
    }

    public function throwError($errorMessage)
    {
        $error = new ERROR();
        $error->created = false;
        $error->error = $errorMessage;
    }
}

$request = new REQUEST();
