<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'codutilizador_pesq' => ''
);



if (isset($_POST["existiu_alteracao_alt_per"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $existiu_alteracao_alt_per = $_POST["existiu_alteracao_alt_per"];

    if ($existiu_alteracao_alt_per < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
        echo json_encode($conteudosaida);
        return;
    }


    if (isset($_POST["idutilizador_alt_per"])) {
        $idutilizador_alt_per = $_POST["idutilizador_alt_per"];
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não selecionou um utilizador para alterar!...';
        echo json_encode($conteudosaida);
        return;
    }


    $dadovalidar_text = "";
    $descresultado = '';
    $resultadofinalvalidacao = 0;

    $perfil_alt_per = 0;
    if (isset($_POST["perfil_alt_per"])) {
        $perfil_alt_per = $_POST["perfil_alt_per"];

        if (valida_campos_form_gen::valida_id_dropdown($perfil_alt_per, 'perfil_alteracao', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] = $descresultado;
        }
    }


    if ($resultadofinalvalidacao < $existiu_alteracao_alt_per) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= ' Campos - ' . $resultadofinalvalidacao;
        echo json_encode($conteudosaida);
        return;
    }

    $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);

    if ($resultado < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $message;
        echo json_encode($conteudosaida);
        return;
    }

    $array_params_sql = array($idutilizador_alt_per, $idautenticacao, $perfil_alt_per);

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "alteraperfilutilizador", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["descresultado"] =  $descresultado;
            $conteudosaida["codutilizador_pesq"] = $_POST["emailutilizador_pesq_per"];
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
    $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
    echo json_encode($conteudosaida);
}
