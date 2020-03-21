<?php
namespace Makson;
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/func/functions.php';

$errorStatus = false;
if (isset($_GET['n'])) {
    $nameMobile = $_GET['n'];
} else {
    $errorStatus = true;
}

if (!$errorStatus && $nameMobile == 'Lenya') {
    $postObject = new \Post();
    $allInfoArray = $postObject->get_all_info();

    if (!$allInfoArray) {
        http_response_code(400);
    } else {
        echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);
}


