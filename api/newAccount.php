<?php
namespace Makson;
include_once $_SERVER['DOCUMENT_ROOT'].'/components/DB.php';


$errorStatus = false;
if (isset($_POST['n'])) {
    $nameMobile = $_POST['n'];
} else {
    $errorStatus = true;
}

if (!$errorStatus && $nameMobile == 'Lenya') {
    $errors_array = array(
        'email' => 0,
        'username' => 0,
    );
    $db = DB::getDb();
    $result = $db->prepare("SELECT * FROM `usertbl` ORDER BY id ASC");
    $result->execute();
    $result->setFetchMode(\PDO::FETCH_ASSOC);
    $usersList = $result->fetchAll();
    $result = null;

    $email = $_POST['email'];
    $fullname = $_POST['fullname'];
    $username = $_POST['username'];
    $password = str_replace(' ', '+', $_POST['password']);
    $password = base64_decode($password);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    foreach ($usersList as $user) {
        if (strtolower($user['email']) == strtolower($email)) {
            $errors_array['email'] = 1;
            break;
        }
    }
    foreach ($usersList as $user) {
        if (strtolower($user['username']) == strtolower($username)) {
            $errors_array['username'] = 1;
            break;
        }
    }
    if ($errors_array['email'] == 0 and $errors_array['username'] == 0) {
        $result = $db->prepare("INSERT INTO `usertbl` (`full_name`, `email`, `username`, `password`)
                                                  VALUES (:full_name, :email, :username, :password)");
        $result->bindParam(':full_name', $fullname);
        $result->bindParam(':email', $email);
        $result->bindParam(':username', $username);
        $result->bindParam(':password', $hashed_password);
        $result->execute();
        $result = null;

        echo json_encode(['result' => true, 'status' => 200], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        if ($errors_array['email'] == 1) {
            echo "Пользователь с такой почтой уже зарегистрирован";
        } elseif ($errors_array['username'] == 1) {
            echo "Пользователь с таким никнеймом уже зарегистрирован";
        }
    }
} else {
    http_response_code(400);
}