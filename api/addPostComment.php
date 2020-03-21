<?php
namespace Makson;
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/func/functions.php';

$errorStatus = false;
if (isset($_POST['n'])) {
    $nameMobile = $_POST['n'];
} else {
    $errorStatus = true;
}

if (!$errorStatus && $nameMobile == 'Lenya') {
    $postObject = new \Post();
    $result = $postObject->add_post_comment($_POST);

    $allInfoArray = [
        'result' => $result,
    ];

    echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
} else {
    $allInfoArray = [
        'content' => 'Ухади',
    ];

    echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
}