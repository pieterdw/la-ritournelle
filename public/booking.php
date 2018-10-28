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
    $bookingOptions = getBookingOptions();
    sendMailToRequester($params, $bookingOptions);
} else {
    echo '{ "success": false }';
    // throw new Exception('Captcha invalid!');
}

function verifyRecaptcha($recaptcha)
{
    $recaptchaSecret = '6LcmM3cUAAAAAHRPqpQ6daQP0AVvfB5E-K8P9euR';
    $captchaResultJson = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptchaSecret . '&response=' . $recaptcha);
    $captchaResult = json_decode($captchaResultJson);
    return $captchaResult->success;
}

function getBookingOptions()
{
    $cmsToken = 'ab5b0c4737b57b8d7bac392bb68912';
    $bookingOptionsJson = file_get_contents('https://admin.vakantiehuisantibes.com/api/singletons/get/bookingoptions?token=' . $cmsToken);
    $bookingOptionsDecoded = json_decode($bookingOptionsJson);
    echo "Raw booking options: ", $bookingOptionsJson;
    return $bookingOptionsDecoded;
}

function sendMailToRequester($params, $bookingOptions)
{
    $subject = $bookingOptions->subject;
    if ($params->locale == 'en' && !is_null($bookingOptions->subject_en)) {
        $subject = $bookingOptions->subject_en;
    } else if ($params->locale == 'fr' && !is_null($bookingOptions->subject_fr)) {
        $subject = $bookingOptions->subject_fr;
    }
    $subject = replaceVariables($subject, $params);

    $body = $bookingOptions->body;
    if ($params->locale == 'en' && !is_null($bookingOptions->body_en)) {
        $subject = $bookingOptions->body_en;
    } else if ($params->locale == 'fr' && !is_null($bookingOptions->body_fr)) {
        $subject = $bookingOptions->body_fr;
    }
    $body = replaceVariables($body, $params);
    $parsedown = new Parsedown();
    $body = $parsedown->text($body);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.mailgun.org';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@vakantiehuisantibes.com';
    $mail->Password = '22238f6934689f92ad6d';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('info@vakantiehuisantibes.com', 'Vakantiehuis La Ritournelle');
    $mail->addCC('info@vakantiehuisantibes.com');
    $mail->addAddress('pieterdewitte@gmail.com');
    $mail->addAddress($params->email);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->XMailer = 'Straffe Koffie';
    $mail->send();

}

function replaceVariables($value, $params)
{
    $parsedown = new Parsedown();
    $value = str_replace('{{locale}}', $params->locale, $value);
    $value = str_replace('{{dates}}', $params->dates, $value);
    $value = str_replace('{{nights}}', $params->nights, $value);
    $value = str_replace('{{price}}', $params->price, $value);
    $value = str_replace('{{name}}', $params->name, $value);
    $value = str_replace('{{email}}', $params->email, $value);

    $request = $parsedown->text($params->request);
    $request = '<div style="border: 1px solid #ddd; border-radius: 2px; padding: 5px 10px;">' . $request . '</div>';
    $value = str_replace('{{request}}', $request, $value);

    return $value;
}

// $mail = new PHPMailer(true);
// try {
//     // $mail->SMTPDebug = 2; // Enable verbose debug output
//     $mail->isSMTP();
//     $mail->Host = 'smtp.mailgun.org';
//     $mail->SMTPAuth = true;
//     $mail->Username = 'info@vakantiehuisantibes.com';
//     $mail->Password = '22238f6934689f92ad6d';
//     $mail->SMTPSecure = 'tls';
//     $mail->Port = 587;

//     $mail->setFrom('info@vakantiehuisantibes.com', 'Vakantiehuis Antibes');
//     $mail->addAddress('pieterdewitte@gmail.com');

//     $mail->isHTML(true);
//     $mail->Subject = 'Here is the subject';
//     $mail->Body = 'This is the HTML message body <b>in bold!</b>';
//     $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

//     $mail->XMailer = 'Straffe Koffie';
//     $mail->send();
//     echo 'Message has been sent';
// } catch (Exception $e) {
//     echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
// }
?>