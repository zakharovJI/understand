<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/db/db.php';

$errorStatus = false;
if (isset($_GET['n'])) {
    $nameMobile = $_GET['n'];
} else {
    $errorStatus = true;
}

if (!$errorStatus && $nameMobile == 'Lenya') {
    $db = DB::getDb();
    $result = $db->prepare("SELECT * FROM `usertbl` ORDER BY id ASC");
    $result->execute();
    $result->setFetchMode(\PDO::FETCH_ASSOC);
    $usersList = $result->fetchAll();
    $result = null;

    $user_id = $_GET['user_id'];
    $current_user = [];

    foreach ($usersList as $user) {
        if ($user['id'] == $user_id) {
            $current_user = $user;
            unset($current_user['password']);
            break;
        }
    }

    if (count($current_user) > 0) {
        $allInfoArray = [
            'result' => true,
            'user' => $current_user,
        ];

        echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
        die();
    } else {
        http_response_code(400);
    }
} else {
    http_response_code(400);
}