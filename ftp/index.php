<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

if(isset($_GET["accountId"])) {
    $accountId = $_GET["accountId"];
    if($accountId == "tienkiem") {
      $userRespArr = array(
            'active' => true
        );

        returnResponse(200, $userRespArr);
    }
}

$notFoundRespArr = array('message' => '404 User Not Found!');
returnResponse(404, $notFoundRespArr);

function returnResponse($respCode, $response) {
  http_response_code($respCode);
  echo json_encode($response, JSON_PRETTY_PRINT);
  die();
}