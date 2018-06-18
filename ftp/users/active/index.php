<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

require('../connect.php');

if (isset($_GET['accountId'])) {
  $accountId = $_GET['accountId'];
  if(isUserAlreadyExisted($conn, $accountId)) {
    $alreadyExistedRespArr = array(
      'message' => 'Already Existed!'
    );
    
    returnResponse(400, $alreadyExistedRespArr);
    return;
  }

  activatedNewUser($conn, $accountId);
} else {
  $invalidRespArr = array(
    'message' => 'Invalid Params!'
  );
  returnResponse(400, $invalidRespArr);
}

function isUserAlreadyExisted($conn, $accountId) {
  $sql = "SELECT * FROM truedice_user WHERE account_id='$accountId'";
  $stmt = $conn->query($sql);

  while ($row = $stmt->fetch()) {

    return true;
  }

  return false;
}

function activatedNewUser($conn, $accountId) {
  $note = "";
  $fbAddr = "";
  $active = 1;
  $adminId = 195;

  if (isset($_GET['note'])) {
    //$note = utf8_encode($_GET['note']);
    $note = $_GET['note'];
  }

  if (isset($_GET['fbAddr'])) {
    $fbAddr = $_GET['fbAddr'];
  }

  if (isset($_GET['active'])) {
    $active = $_GET['active'];
  }

  if(strlen($accountId) == 0) {
    $invalidRespArr = array(
      'message' => 'Invalid Params!'
    );
    returnResponse(400, $invalidRespArr);
  }

  $sql = "
  INSERT INTO `truedice_user`(
  `account_id`,
  `admin_id`,
  `active`,
  `note`,
  `fb_addr`,
  `creation_date`,
  `last_modified_date`
  ) 
  VALUES (
  '$accountId',
  $adminId,
  $active,
  '$note',
  '$fbAddr',
  unix_timestamp(), 
  unix_timestamp()
  )
  ";

  $conn->exec($sql);

  $activatedRespArr = array(
    'message' => 'Activated!'
  );
  returnResponse(201, $activatedRespArr);
}

function returnResponse($respCode, $response) {
  http_response_code($respCode);
  echo json_encode($response, JSON_PRETTY_PRINT);
  die();
}