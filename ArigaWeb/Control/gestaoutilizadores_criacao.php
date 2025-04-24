<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'codutilizador_pesq' => ''
);

if (isset($_POST["nome_criacao_gu"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $nome_criacao_gu = $_POST["nome_criacao_gu"];
    $perfil_criacao_gu = $_POST["perfil_criacao_gu"];
    $emailutilizador_criacao_gu = $_POST["emailutilizador_criacao_gu"];
    $codigoacesso_criacao_gu = $_POST["codigoacesso_criacao_gu"];

    $descresultado = '';
    $resultadofinalvalidacao = 0;

    $dadovalidar_text = "";
    $dadovalidar_num = 0;

    $dadovalidar_text = ltrim(rtrim($nome_criacao_gu));
    if (valida_campos_form_gen::valida_texto($dadovalidar_text, 'nome_criacao', "", true, 3, 80, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        $nome_criacao_gu = $dadovalidar_text;
    } else {
        $conteudosaida["descresultado"] = $descresultado;
    }

    if (valida_campos_form_gen::valida_id_dropdown($perfil_criacao_gu, 'perfil_criacao', $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= " " . $descresultado;
    }

    if (valida_campos_form_gen::valida_texto($emailutilizador_criacao_gu, 'emailutilizador_criacao', '/.+ariga\.com/', true, 11, 30, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= " " . $descresultado;
    }

    if (valida_campos_form_gen::valida_texto($codigoacesso_criacao_gu, 'codigoacesso_criacao', "", true, 8, 16, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= " " . $descresultado;
    }

    if ($resultadofinalvalidacao < 4) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] = 'Campos - ' .  $conteudosaida["descresultado"];
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

    $array_params_sql = array(
        $nome_criacao_gu,
        $emailutilizador_criacao_gu,
        md5($codigoacesso_criacao_gu),
        $perfil_criacao_gu,
        $idautenticacao
    );

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "insereutilizador", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["codutilizador_pesq"] =  $emailutilizador_criacao_gu;
            $conteudosaida["descresultado"] = $descresultado;
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
    $conteudosaida["descresultado"] = 'Nome do novo utilizador não foi preenchido!...';
    echo json_encode($conteudosaida);
}
