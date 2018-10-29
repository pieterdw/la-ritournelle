<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

require 'Parsedown/Parsedown.php';

$paramsJson = file_get_contents('php://input');
$params = json_decode($paramsJson);

if (verifyRecaptcha($params->recaptcha)) {
    sendMail($params);
} else {
    throw new Exception('Captcha invalid!');
}

function verifyRecaptcha($recaptcha)
{
    $recaptchaSecret = '6LcmM3cUAAAAAHRPqpQ6daQP0AVvfB5E-K8P9euR';
    $captchaResultJson = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptchaSecret . '&response=' . $recaptcha);
    $captchaResult = json_decode($captchaResultJson);
    return $captchaResult->success;
}

function sendMail($params)
{
    $parsedown = new Parsedown();
    $locale = $params->locale;
    $name = $params->name;
    $email = $params->email;
    $message = $parsedown->text($params->message);

    $subject = 'Bericht via contactformulier';

    $body = <<<END
<p>
    Beste,
    <br />
    <br />Er is een nieuw bericht via het contactformulier op www.vakantiehuisantibes.com.
    <br />
    <br />Naam: $name
    <br />Email: $email
    <br />Taal website: $locale
    <br />
    <br /><strong>Bericht:</strong>
    <div style="border: 1px solid #ddd; border-radius: 2px; padding: 5px 7px; margin-top: 5px;">$message</div>
    <br />
    <br />
    <br />Met vriendelijke groeten,
    <br />
    <br />Vakantiehuis La Ritournelle
</p>
END;

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.mailgun.org';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@vakantiehuisantibes.com';
    $mail->Password = '22238f6934689f92ad6d';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('info@vakantiehuisantibes.com', 'Vakantiehuis La Ritournelle');
    $mail->addAddress('info@vakantiehuisantibes.com');

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->XMailer = 'Straffe Koffie';
    $mail->send();

}
?>