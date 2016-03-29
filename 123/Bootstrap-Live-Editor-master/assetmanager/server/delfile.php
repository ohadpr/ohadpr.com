<?php

$root=$_SERVER["DOCUMENT_ROOT"];
$file = $root . $_POST["file"];

if(file_exists ($file)) {
	unlink($file);
} else {

}

echo $_POST["file"];

?>