<?php
namespace Makson;
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/func/functions.php';

// PUT
$errorStatus = false;
if (isset($_POST['n'])) {
    $nameMobile = $_POST['n'];
} else {
    $errorStatus = true;
}

if (!$errorStatus && $nameMobile == 'Lenya') {
    $postObject = new \Post();
    $allInfoArray = $postObject->add_post_comment($_POST);

    if (!$allInfoArray) {
        http_response_code(400);
    } else {
        echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(400);
}