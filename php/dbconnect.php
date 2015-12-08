<?php

/**
 * Created by PhpStorm.
 * User: root
 * Date: 12/8/15
 * Time: 6:59 PM
 */

$dbhost = 'uskkf9b78c90.snjf.koding.io';
$dbuser = 'root';
$dbpassword = 'root';
$dbname = 'dbproject';

$db = mysqli_connect($dbhost, $dbuser, $dbpassword,$dbname);

if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

}

?>

