<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 12/8/15
 * Time: 7:02 PM
 */

include 'dbconnect.php';

$command= "SELECT * FROM test";

if ($result=mysqli_query($db,$command)) {

    while ($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"] . " name: " . $row["name"] . "<br/>";
    }
    mysqli_free_result($result);
}

else {
    echo "0 results";
}



include 'dbclose.php';
?>