<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include_once "Generic/constants.php";


$conteudosaida = array(
    'inhtml' => '',
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'pagina_a_redirecionar' =>  ''
);


if (isset($_SESSION["IDSESSIONBD"]) && $_SESSION["IDSESSIONBD"] !== "") {
    $_SESSION["IDSESSIONBD"] = "";
    $_SESSION['IDUTILIZADOR'] = "";
    $_SESSION['CODUTILIZADOR'] = "";
    $_SESSION['IDPERFILUTILIZADOR'] = "";
    $_SESSION["IDAUTENTICACAO"] = "";
    $_SESSION['CODPERFIL'] = "";
}

$conteudosaida["resultado"] = '1';
$conteudosaida["descresultado"] = "Foi efectuada o encerramento da sua sessão!...";

$conteudosaida["pagina_a_redirecionar"] = constants::$paginainicio;
echo json_encode($conteudosaida);
