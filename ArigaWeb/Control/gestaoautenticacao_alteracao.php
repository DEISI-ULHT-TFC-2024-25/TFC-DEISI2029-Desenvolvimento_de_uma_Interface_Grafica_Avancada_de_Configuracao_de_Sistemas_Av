<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'codutilizador_pesq' => ''
);

if (isset($_POST["existiu_alteracao_alt_aut"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    // $idautenticacao = 1;

    $existiu_alteracao_alt_aut = $_POST["existiu_alteracao_alt_aut"];

    if ($existiu_alteracao_alt_aut < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
        echo json_encode($conteudosaida);
        return;
    }

    $dadovalidar_text = "";
    $descresultado = '';
    $resultadofinalvalidacao = 0;

    $activo_alt_aut = "";
    if (isset($_POST["activo_alt_aut"])) {

        $activo_alt_aut = $_POST["activo_alt_aut"];

        if (valida_campos_form_gen::valida_id_s_n_dropdown($activo_alt_aut, 'activo_alteracao', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] = $descresultado;
        }
    }

    $emailutilizador_alt_aut = "";
    if (isset($_POST["emailutilizador_alt_aut"])) {
        $emailutilizador_alt_aut = $_POST["emailutilizador_alt_aut"];
    }

    if ($resultadofinalvalidacao < $existiu_alteracao_alt_aut) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= ' Campos - ' . $resultadofinalvalidacao;
        echo json_encode($conteudosaida);
        return;
    }

    $idautenticacao_alt_aut = "";
    if (isset($_POST["idautenticacao_alt_aut"])) {
        $idautenticacao_alt_aut = $_POST["idautenticacao_alt_aut"];
    }

    $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
    if ($resultado < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $message;
        echo json_encode($conteudosaida);
        return;
    }

    $array_params_sql = array($idautenticacao_alt_aut, $idautenticacao, $activo_alt_aut);

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "alterautenticacao", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["descresultado"] =  $descresultado;
            if ($emailutilizador_alt_aut != "") {
                $conteudosaida["codutilizador_pesq"] = $emailutilizador_alt_aut;
            } else {
                $conteudosaida["codutilizador_pesq"] = $_POST["emailutilizador_pesq_aut"];
            }

            echo json_encode($conteudosaida);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
        }
    } else if ($retorno > 1) {
        $conteudosaida["resultado"] =  strval($retorno);
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
    }

    GconexaoBD::fechaconexaoBD($objdb, $message);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["inhtml"] = "";
    $conteudosaida["descresultado"] = 'Não efetuou alteraçoes...';
    echo json_encode($conteudosaida);
}
