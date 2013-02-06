<?php
$seconds_to_cache = 60;
$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache);
header("Expires: $ts");
header("Pragma: cache");
header("Cache-Control: max-age=$seconds_to_cache");

//$value = array(
//    'ime' => 'Marko'
//);
$value = new stdClass();
$value->ime = $_GET['_'];

//echo serialize($value);
echo json_encode($value);

?>