<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/workzone/blog/db/db.php';

$errorStatus = false;
if (isset($_POST['n'])) {
    $nameMobile = $_POST['n'];
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

    $login = $_POST['login'];
    $password = str_replace(' ', '+', $_POST['password']);
    $password = base64_decode($password);
    $is_login_exists = false;
    $hashed_password = '';
    $current_user_id = null;

    foreach ($usersList as $user) {
        if ($user['email'] == $login || $user['username'] == $login) {
            $hashed_password = $user['password'];
            $current_user_id = $user['id'];
            $is_login_exists = true;
            break;
        }
    }

    if ($is_login_exists) {
        if (password_verify($password, $hashed_password) == true) {
            $allInfoArray = [
                'result' => true,
                'status' => 200,
                'user_id' => $current_user_id,
            ];

            echo json_encode($allInfoArray, JSON_UNESCAPED_UNICODE);
            die();
        } else {
            http_response_code(400);
        }
    } else {
        http_response_code(400);
    }
} else {
    http_response_code(400);
}