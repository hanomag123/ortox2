<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "";

//Сюда вставляем chat_id
$chat_id = "";

//Определяем переменные для передачи данных из нашей формы
if ($_POST) {
    $name = ($_POST['name']);
    $phone = ($_POST['tel']);
    $email = ($_POST['email']);
    $text = ($_POST['text']);

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Email' => $email,
        'Телефон:' => $phone,
        'Сообщение:' => $text,
    );

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

    if (mail("test.com", "Письмо об обратном звонке с сайта " . $HTTP_HOST , $body, "From: info@infa.ru\r\n")) {
        echo "oшибок нет";
    } else {
        echo "при отправке сообщения возникли ошибки";
    
        
        var_dump($name);
        var_dump($email);
        var_dump($message);
    }
}

?>