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

if (isset($_POST["xmlconf_visualiza_pesquisa"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $descresultado = '';
    $resultadofinalvalidacao = 0;
    $xmlconf_visualiza_pesquisa = 0;

    $xmlconf_visualiza_pesquisa = $_POST["xmlconf_visualiza_pesquisa"];

    if (valida_campos_form_gen::valida_id_dropdown($xmlconf_visualiza_pesquisa, 'Configuração de XML', $descresultado) == 1) {
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
        $xmlconf_visualiza_pesquisa,
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
            $conteudosaida["descresultado"] =  "Registo pretendido devolvido!...";

            $ihtmltemp = "<table class=\"styled-table\" style=\"width:100%\">
            <thead>
                <tr>
                    <th style=\"white-space: nowrap;\">Nome da arquitetura</th>
                    <th style=\"white-space: nowrap;\">Nome do Módulo</th>
                    <th style=\"white-space: nowrap;\">Esquema de XML</th>
                </tr>
            </thead>
            <tbody>";

            $i = 0;
            $outXML = $descresultadoarrayPHP[$i]["oxml"];
            $xml = new DOMDocument();
            $xml->preserveWhiteSpace = false;
            $xml->formatOutput = true;
            $xml->loadXML($outXML);
            $outXML = $xml->saveXML();
            $descresultadoarrayPHP[$i]["oxml"] = $outXML;

            //Valida XML----------------------------------------
            $parser = xml_parser_create();
            if (!xml_parse($parser, $outXML, true)) {
                $conteudosaida["resultado"] =  'ERRO: Linha nº ' . xml_get_current_line_number($parser) . " Aqui: " . xml_error_string(xml_get_error_code($parser));
                xml_parser_free($parser);
                GconexaoBD::fechaconexaoBD($objdb, $message);

                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $message;
                echo json_encode($conteudosaida);

                return;
            }
            xml_parser_free($parser);

            $configuration = new SimpleXMLElement($outXML);
            $archname = strval($configuration->archname);
            $arinc653module = $configuration->arinc653module;
            $modulename = strval($arinc653module->modulename);
            $xmlnsxsi = strval($arinc653module->xmlnsxsi);

            $ihtmltemp = $ihtmltemp . "<tr id=\"idtr" . $i . "\" " . " data-id = \"" . $i . "\" onclick=\"seleciona_linha_listaon_visualiza(this)\">";
            $ihtmltemp = $ihtmltemp . "<td>" . $archname . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $modulename . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $xmlnsxsi . "</td>";
            $ihtmltemp = $ihtmltemp . "</tr>";
            $ihtmltemp = $ihtmltemp . "</tbody></table>";
            $conteudosaida["inhtml"] = $ihtmltemp;
            $conteudosaida["dados"] = json_encode($descresultadoarrayPHP);
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
    $conteudosaida["descresultado"] = 'Não selecionou configuração!...';
    echo json_encode($conteudosaida);
}
