<?php

function cleanupEmail($email) {
    $email = htmlentities($email, ENT_COMPAT, 'UTF-8');
    $email = preg_replace('=((<CR>|<LF>|0x0A/%0A|0x0D/%0D|\\n|\\r)\S).*=i', null, $email);
    return $email;
}

function cleanupMessage($message) {
    $message = wordwrap($message, 70, "\r\n");
    return $message;
}

$to = 'voltenukropt@gmail.com';
$from = 'voltenukropt@gmail.com';
$subject = 'Отправка Форма Домашняя страница';

$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$email = cleanupEmail($email);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$server = htmlentities($_SERVER["SERVER_NAME"], ENT_COMPAT, 'UTF-8');
$ip = htmlentities($_SERVER["REMOTE_ADDR"], ENT_COMPAT, 'UTF-8');

$message =
    '<!doctype html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <title>{{ subject }}</title>
    </head>
    <body style="background-color: #ffffff; color: #000000; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: 18px; font-family: helvetica, arial, verdana, sans-serif;">
    <h2 style="background-color: #eeeeee;">Отправка новой формы</h2>
    <table cellspacing="0" cellpadding="0" width="100%" style="background-color: #ffffff;">
        <tr>
            <td valign="top" style="background-color: #ffffff;"><b>Имя:</b></td>
            <td>{{ phone }}</td>
        </tr>
        <tr>
            <td valign="top" style="background-color: #ffffff;"><b>Электронная поча:</b></td>
            <td>{{ email }}</td>
        </tr>
    </table>
    <br><br>
    <div style="background-color: #eeeeee; font-size: 10px; line-height: 11px;">Формы, отправленные с веб-сайта {{ server }}</div>
    <div style="background-color: #eeeeee; font-size: 10px; line-height: 11px;">IP-адрес посетителя: {{ ip }}</div>
    </body>
    </html>';

$message = str_replace(
    array(
        '{{ email }}',
        '{{ phone }}',
        '{{ subject }}',
        '{{ server }}',
        '{{ ip }}',
    ),
    array(
        $email,
        $phone,
        $subject,
        $server,
        $ip
    ),
    $message
);
$message = cleanupMessage($message);

$headers =
    'From: ' . $from . "\r\n"
    . 'Reply-To: ' . $email . "\r\n"
    . 'X-Mailer: PHP/' . phpversion() . "\r\n"
    . 'Content-type: text/html; charset=utf-8' . "\r\n";

$sent = @mail($to, $subject, $message, $headers);
if ($sent) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Failed to send email'));
}
