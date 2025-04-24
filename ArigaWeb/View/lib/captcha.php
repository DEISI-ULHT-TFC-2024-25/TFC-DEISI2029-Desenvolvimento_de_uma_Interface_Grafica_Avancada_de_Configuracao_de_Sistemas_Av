<?php
// Generate captcha code

class captcha2
{
    public const login = 'CAPTCHA_CODE_LOGIN';

    public static function geracaptcha($nomeacao)
    {
        session_start();
        $random_num    = md5(random_bytes(64));
        $captcha_code  = substr($random_num, 0, 6);
        // Assign captcha in session
        $_SESSION[$nomeacao] = $captcha_code;
        // Create captcha image
        $layer = imagecreatetruecolor(138, 27);
        $captcha_bg = imagecolorallocate($layer, 0, 0, 0);
        imagefill($layer, 0, 0, $captcha_bg);
        $captcha_text_color = imagecolorallocate($layer, 255, 255, 255);
        imagestring($layer, 10, 45, 5, $captcha_code, $captcha_text_color);
        header("Content-type: image/jpeg");
        imagejpeg($layer);
    }
}
