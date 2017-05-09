<?php
$filename = date('YmdHis') . '.jpg';
$result = file_put_contents($filename, file_get_contents('php://input') );
if (!$result) {
	print "ERROR: Failed to write data to $filename, check permissions\n";
	exit();
}


echo '{"state":1,"data":"'. $filename.'","msg":"错误!"}';




?>
