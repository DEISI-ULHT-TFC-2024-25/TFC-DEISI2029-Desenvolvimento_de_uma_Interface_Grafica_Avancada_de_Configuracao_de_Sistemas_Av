<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Generic/constants.php";

$conteudosaida = array(
    'inhtml' => '',
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'pagina_a_redirecionar' =>  ''
);


if (isset($_POST["utilizador"])) {

    $utilizador = $_POST["utilizador"];
    $password = $_POST["password"];
    $captcha_login = $_POST["captcha"];

    $descresultado = "";
    $resultadofinalvalidacao = 0;

    if (valida_campos_form_gen::valida_texto($utilizador, "Utilizador", "", true, 14, 30, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] =  $conteudosaida["descresultado"] . $descresultado;
    }

    if (valida_campos_form_gen::valida_texto($password, "Password", "", true, 8, 16, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .=  $conteudosaida["descresultado"] . $descresultado;
    }

    if (valida_campos_form_gen::valida_compara_captcha_gen($captcha_login, 'CAPTCHA_CODE_LOGIN', "Captcha", $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .=  $conteudosaida["descresultado"] . $descresultado;
    }


    if ($resultadofinalvalidacao < 3) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= " campos validados:" . $resultadofinalvalidacao;
        echo json_encode($conteudosaida);
        return;
    }

    $resultado =  GconexaoBD::criarconexaoBD($idmesg, $objdb);
    if ($resultado < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "A pagina encontra-se inacessível, por favor tente mais tarde!...";
        echo json_encode($conteudosaida);
        return;
    }

    $retorno = 1;
    $ressql = "1";

    $array_params_sql = array($utilizador,  md5($password),);

    $retorno = GconexaoBD::executar_sql($objdb, "verifica_autenticacao_devolv_ids", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["descresultado"] =  $descresultado;
            $conteudosaida["pagina_a_redirecionar"] = constants::$paginainterna;
            $conteudosaida["inhtml"] = '';
            $_SESSION['IDSESSIONBD'] = $descresultadoarrayPHP[0]["idsessao"];
            $_SESSION['IDAUTENTICACAO'] = $descresultadoarrayPHP[0]["idautenticacao"];
            $_SESSION['IDUTILIZADOR'] = $descresultadoarrayPHP[0]["idutilizador"];
            $_SESSION['CODUTILIZADOR'] = $utilizador;
            $_SESSION['IDPERFILUTILIZADOR'] = $descresultadoarrayPHP[0]["idperfilutilizador"];
            $_SESSION['CODPERFIL'] = $descresultadoarrayPHP[0]["codperfil"];
            echo json_encode($conteudosaida);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            $conteudosaida["pagina_a_redirecionar"] = "";
            $conteudosaida["inhtml"] = '';
            echo json_encode($conteudosaida);
        }
    } else if ($retorno > 1) {
        $conteudosaida["resultado"] =  strval($retorno);
        $conteudosaida["descresultado"] = $descresultado;
        $conteudosaida["pagina_a_redirecionar"] = "";
        $conteudosaida["inhtml"] = '';
        echo json_encode($conteudosaida);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        $conteudosaida["pagina_a_redirecionar"] = "";
        $conteudosaida["inhtml"] = '';
        echo json_encode($conteudosaida);
    }

    GconexaoBD::fechaconexaoBD($objdb, $message);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = "Erro: Utilizador não recebido!...";
    $conteudosaida["pagina_a_redirecionar"] = "";
    $conteudosaida["inhtml"] = '';
    echo json_encode($conteudosaida);
}
