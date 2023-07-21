<?php
include('connection.php');


$email = $_POST['email'];
$password = $_POST['password'];
$name = $_POST['name'];

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(email,password,name) values(?,?,?)');
    $query->bind_param('sss', $email, $hashed_password, $name);
    $query->execute();

    $response['status'] = "success";
    $response['message'] = "another message in success";
} else {
    $response['status'] = "failed";
    $response['message'] = "Please choose another email address";
}

// types of http request : POST,GET,PUT,DELETE 
echo json_encode($response);
