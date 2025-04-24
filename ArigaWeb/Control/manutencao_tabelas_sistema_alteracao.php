<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'dados_dd_activo' =>  '',
    'dados_dd_total' =>  ''
);

if (isset($_POST["existiu_alteracao_manutencao_tabelas_sistema_alteracao"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $existiu_alteracao = $_POST["existiu_alteracao_manutencao_tabelas_sistema_alteracao"];

    if ($existiu_alteracao < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
        echo json_encode($conteudosaida);
        return;
    }

    if (isset($_POST["idtabela_manutencao_tabelas_sistema_alteracao"])) {
        $idtabela = $_POST["idtabela_manutencao_tabelas_sistema_alteracao"];
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não selecionou item para alterar!...';
        echo json_encode($conteudosaida);
        return;
    }

    if (isset($_POST["codtabela_manutencao_tabelas_sistema_alteracao"])) {
        $codigo_tabela = $_POST["codtabela_manutencao_tabelas_sistema_alteracao"];
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não selecionou item para alterar (2)!...';
        echo json_encode($conteudosaida);
        return;
    }

    $dadovalidar_text = "";
    $descresultado = '';
    $resultadofinalvalidacao = 0;

    $codigo = "";
    if (isset($_POST["codigo_manutencao_tabelas_sistema_alteracao"])) {
        $codigo = $_POST["codigo_manutencao_tabelas_sistema_alteracao"];

        $dadovalidar_text = ltrim(rtrim($codigo));

        if (valida_campos_form_gen::valida_texto($dadovalidar_text, 'Código', "", true, 2, 20, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            $codigo = $dadovalidar_text;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $descricao = "";
    if (isset($_POST["descricao_manutencao_tabelas_sistema_alteracao"])) {
        $descricao = $_POST["descricao_manutencao_tabelas_sistema_alteracao"];

        if (valida_campos_form_gen::valida_texto($descricao, 'Descrição', "", true, 1, 80, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $activo = "";
    if (isset($_POST["activo_manutencao_tabelas_sistema_alteracao"])) {
        $activo = $_POST["activo_manutencao_tabelas_sistema_alteracao"];

        if (valida_campos_form_gen::valida_id_s_n_dropdown($activo, 'Activo', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    if ($resultadofinalvalidacao < $existiu_alteracao) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= "Campos - identificados para alteração: " . $existiu_alteracao . " diferente do verificado: " . $resultadofinalvalidacao;
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

    $array_params_sql = array($idtabela, $codigo, $descricao, $activo, $idautenticacao);

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "manutencaoalteraentrada", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {

            //Novo codigo
            $gestao_inf = null;
            if (isset($_SESSION['GESTAO_INFORMACAO'])) {

                $gestao_inf = unserialize($_SESSION['GESTAO_INFORMACAO']);
                $gestao_inf->inicializar_alterar_lista_sistema($objdb);
                $htmlopcoestotal = $gestao_inf->altera_opcoesdd_sistema($codigo_tabela, "N", $codigo_tabela);
                $htmlopcoes = $gestao_inf->altera_opcoesdd_sistema($codigo_tabela, "S", $codigo_tabela . "_A");

                $conteudosaida["dados_dd_activo"] = $htmlopcoes;
                $conteudosaida["dados_dd_total"] = $htmlopcoestotal;
                $_SESSION['GESTAO_INFORMACAO'] = serialize($gestao_inf);

                $conteudosaida["resultado"] = '1';
                $conteudosaida["descresultado"] = $descresultado;
                echo json_encode($conteudosaida);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Alterou na BD mas deu erro a atualizar sa dropdowns. carregue em CTRL-F5.";
                echo json_encode($conteudosaida);
            }

            //antigo código
            // $conteudosaida["resultado"] = '1';
            // $conteudosaida["descresultado"] =  $descresultado;
            // echo json_encode($conteudosaida);
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
    $conteudosaida["descresultado"] = 'Não não enviou dados para efetuar a alteração pretendida!...';
    echo json_encode($conteudosaida);
}
