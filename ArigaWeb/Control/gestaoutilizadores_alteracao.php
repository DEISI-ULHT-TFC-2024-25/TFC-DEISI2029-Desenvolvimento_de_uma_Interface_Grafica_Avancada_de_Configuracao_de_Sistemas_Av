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



if (isset($_POST["existiu_alteracao_alt_gu"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $existiu_alteracao_alt_gu = $_POST["existiu_alteracao_alt_gu"];

    if ($existiu_alteracao_alt_gu < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
        echo json_encode($conteudosaida);
        return;
    }

    if (isset($_POST["idutilizador_alt_gu"])) {
        $idutilizador_alt_gu = $_POST["idutilizador_alt_gu"];
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

    $nome_alt_gu = "";
    if (isset($_POST["nome_alt_gu"])) {
        $nome_alt_gu = $_POST["nome_alt_gu"];

        $dadovalidar_text = ltrim(rtrim($nome_alt_gu));
        if (valida_campos_form_gen::valida_texto($dadovalidar_text, 'nome_alteracao', "", true, 3, 80, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            $nome_alt_gu = $dadovalidar_text;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $activo_alt_gu = "";
    if (isset($_POST["activo_alt_gu"])) {

        $activo_alt_gu = $_POST["activo_alt_gu"];

        if (valida_campos_form_gen::valida_id_s_n_dropdown($activo_alt_gu, 'activo_alteracao', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= " " . $descresultado;
        }
    }

    $perfil_alt_gu = 0;
    if (isset($_POST["perfil_alt_gu"])) {
        $perfil_alt_gu = $_POST["perfil_alt_gu"];

        if (valida_campos_form_gen::valida_id_dropdown($perfil_alt_gu, 'perfil_alteracao', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= " " . $descresultado;
        }
    }

    $emailutilizador_alt_gu = "";
    if (isset($_POST["emailutilizador_alt_gu"])) {
        $emailutilizador_alt_gu = $_POST["emailutilizador_alt_gu"];

        if (valida_campos_form_gen::valida_texto($emailutilizador_alt_gu, 'emailutilizador_alteracao', '/.+@ariga\.com/', true, 11, 30, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= " " . $descresultado;
        }
    }

    $codigoacesso_alt_gu = "";
    $so_pws_alt_gu = 0;
    if (isset($_POST["codigoacesso_alt_gu"])) {
        $codigoacesso_alt_gu = $_POST["codigoacesso_alt_gu"];

        if (valida_campos_form_gen::valida_texto($codigoacesso_alt_gu, 'password_alteracao', '', true, 8, 16, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            $codigoacesso_alt_gu = md5($codigoacesso_alt_gu);
            $so_pws_alt_gu = 0;
            if (isset($_POST["so_pws_alt_gu"])) {
                $so_pws_alt_gu = $_POST["so_pws_alt_gu"];
            }
        } else {
            $conteudosaida["descresultado"] .= " " . $descresultado;
        }
    }

    if ($resultadofinalvalidacao < $existiu_alteracao_alt_gu) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= " Campos - identificados para alteração: " . $existiu_alteracao_alt_gu . " diferente do verificado: " . $resultadofinalvalidacao;
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
        $idutilizador_alt_gu,
        $nome_alt_gu,
        $emailutilizador_alt_gu,
        $activo_alt_gu,
        $perfil_alt_gu,
        $codigoacesso_alt_gu,
        $so_pws_alt_gu,
        $idautenticacao
    );

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "alterautilizador_com_pws", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["descresultado"] =  $descresultado;
            if ($emailutilizador_alt_gu != "") {
                $conteudosaida["codutilizador_pesq"] = $emailutilizador_alt_gu;
            } else {
                $conteudosaida["codutilizador_pesq"] = $_POST["emailutilizador_pesq_gu"];
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
    $conteudosaida["descresultado"] = 'Nome do utilizador não foi preenchido!...';
    echo json_encode($conteudosaida);
}
