<?php

//Определяем переменные для передачи данных из нашей формы
if ($_POST) {
    $name = ($_POST['name']);
    $phone = ($_POST['tel']);
    $email = ($_POST['email']);
    $text = ($_POST['message']);

    $HTTP_HOST = $_SERVER["HTTP_HOST"];
    $messag = "Письмо об обратном звонке с сайта " . $HTTP_HOST . "\n";
    $messag = $messag . "-------------------------------------- \n\n";
    $messag = $messag . "Форма: " . substr(htmlspecialchars($_POST["whatisit"]), 0, 62) . "\n";
    $messag = $messag . "Имя: " . substr(htmlspecialchars($name), 0, 62) . "\n";
    $messag = $messag . "Телефон: " . substr(htmlspecialchars($phone), 0, 62) . "\n";
    $messag = $messag . "Email: " . substr(htmlspecialchars($email), 0, 62) . "\n";
    $messag = $messag . "Сообщение: " . substr(htmlspecialchars($text), 0, 62) . "\n";
    $messag = $messag . "-------------------------------------- \n\n";
    $messag = $messag . "Дата: " . date("d.m.Y h:i") . "\n";
    $messag = $messag . "IP: " . htmlspecialchars($_SERVER['REMOTE_ADDR']);
    $body = $messag;

    if (mail("tyfygas@mailto.plus", "Письмо об обратном звонке с сайта " . $HTTP_HOST , $body, "From: info@infa.ru\r\n")) {
        echo "oшибок нет";
    } else {
        echo "при отправке сообщения возникли ошибки";
    }
}

?>