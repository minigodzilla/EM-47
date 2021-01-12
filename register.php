<?php

header('Access-Control-Allow-Origin: *');

include "settings.php";
include "lib/mail/phpmailer.class.php";
include "lib/email.class.php";



	$location = 'https://api.spark.re/v1/contacts';
	$apiKey = 'd9fd7478301691d67ceba9af9737697cd91a8b39';

	$spark = array("contact" => array());
	$spark["contact"]["first_name"] = $_POST["FirstName"];
	$spark["contact"]["last_name"] = $_POST["LastName"];
	$spark["contact"]["email"] = $_POST["Email"];
	$spark["contact"]["phone"] = $_POST["Phone"];
	$spark["contact"]["address_line_1"] = $_POST["Address"];
	$spark["contact"]["postcode"] = $_POST["PostalCode"];
	$spark["contact"]["agent"] = false;
	if ($_POST["IsBroker"] == "yes") $spark["contact"]["agent"] = "true";
	$spark["source"] = "Website";

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_URL, $location);
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($spark));
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	  'Content-Type: application/json',
	  'Authorization: Token token='.$apiKey
	));
	$ret = curl_exec($curl);

	

$data = $_POST;
$data["IPAddress"] = $_SERVER["REMOTE_ADDR"];
$data["SourceIP"] = $_SERVER['SERVER_ADDR'] ? $_SERVER['SERVER_ADDR'] : $_SERVER['LOCAL_ADDR'];
$serialize = array();
foreach ($data as $key=>$val) {
                if ($key == "o" || $key == "n") continue;
                if (!is_array($val)) $serialize[] = $key . "=". urlencode($val);
                else {
                                foreach ($val as $key2=>$val2) {
                                                $serialize[] = $key . "[]=". urlencode($val2);
                                }
                }
}

$url = "http://wms.tbf.email/registration.php";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST      ,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, implode("&", $serialize));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION  ,1);
curl_setopt($ch, CURLOPT_HEADER      ,0);  // DO NOT RETURN HTTP HEADERS
curl_setopt($ch, CURLOPT_RETURNTRANSFER  ,1);  // RETURN THE CONTENTS OF THE CALL
 
$ret = json_decode(curl_exec($ch));

$email  = new CEmail($_POST);
$subject = "You’re on the list";
$template = "edm";
//$_POST["Email"] =  "lgrecu@joeyai.com";
$email->sendRich($_POST["Email"], $subject, $template);

?>

<?php print_r($data) ?>