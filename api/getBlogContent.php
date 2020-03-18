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
    $result = $postObject->get_all_info();
    $allInfoArray = [
        'content' => $result,
    ];

    echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
} else {
    $allInfoArray = [
        'content' => 'Ухади',
    ];

    echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
}


