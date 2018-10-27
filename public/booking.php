<?php
    /*from      : info@mvakantiehuisantibes.com
    transport : smtp
    host      : smtp.mailgun.org
    user      : info@vakantiehuisantibes.com
    password  : 22238f6934689f92ad6d
    port      : 587
    auth      : true
    encryption: 'ssl'*/

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    $mail = new PHPMailer(true);
    try {
        // $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP();
        $mail->Host = 'smtp.mailgun.org';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@vakantiehuisantibes.com';
        $mail->Password = '22238f6934689f92ad6d';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('info@vakantiehuisantibes.com', 'Vakantiehuis Antibes');
        $mail->addAddress('pieterdewitte@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'Here is the subject';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->XMailer = 'Straffe Koffie';
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
?>