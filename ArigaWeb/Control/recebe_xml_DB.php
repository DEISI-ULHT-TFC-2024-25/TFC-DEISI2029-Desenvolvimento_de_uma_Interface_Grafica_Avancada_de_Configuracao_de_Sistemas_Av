<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'dados' => ''
);

if (isset($_POST["xmlconf_xmlexportar_pesquisa"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $descresultado = '';
    $resultadofinalvalidacao = 0;
    $xmlconf_xmlexportar_pesquisa = 0;

    $xmlconf_xmlexportar_pesquisa = $_POST["xmlconf_xmlexportar_pesquisa"];

    if (valida_campos_form_gen::valida_id_dropdown($xmlconf_xmlexportar_pesquisa, 'Configuração de XML', $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= " Erro no(s) campo(s) - " . $descresultado;
    }

    if ($resultadofinalvalidacao < 1) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] = "Campos identificados para alteração: 1, diferente do verificado: " . $resultadofinalvalidacao . $conteudosaida["descresultado"];
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
        $xmlconf_xmlexportar_pesquisa,
        $idautenticacao
    );

    $retorno = 0;
    $ressql = "";
    $xml = "";
    $outXML = "";

    $retorno = GconexaoBD::executar_sql($objdb, "geraxml_withdesc", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {
            $conteudosaida["resultado"] = '1';
            $conteudosaida["descresultado"] =  $descresultado;
            $outXML = $descresultadoarrayPHP[0]["oxml"];

            $xml = new DOMDocument();
            $xml->preserveWhiteSpace = false;
            $xml->formatOutput = true;
            $xml->loadXML($outXML);
            $outXML = $xml->saveXML();
            $conteudosaida["dados"] = $outXML;

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
    $conteudosaida["descresultado"] = 'Não selecionou configuração para exportar!...';
    echo json_encode($conteudosaida);
}
