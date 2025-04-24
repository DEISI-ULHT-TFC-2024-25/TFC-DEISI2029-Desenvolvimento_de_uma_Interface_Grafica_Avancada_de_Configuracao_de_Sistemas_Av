<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "View/obj/dropdown2.php";
include_once "Control/lib/gestao_informacao.php";

$conteudosaida = array(
    'ihtml' => '',
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'dados_dd_activo' =>  '',
    'dados_dd_total' =>  ''
);

if (isset($_POST["codigo_manutencao_tabelas_sistema_criacao"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $descresultado = '';
    $resultadofinalvalidacao = 0;

    $codigo = "";

    $codigo = $_POST["codigo_manutencao_tabelas_sistema_criacao"];

    if (valida_campos_form_gen::valida_texto($codigo, 'Código', "", true, 2, 20, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= $descresultado;
    }


    $descricao = "";
    if (isset($_POST["descricao_manutencao_tabelas_sistema_criacao"])) {
        $descricao = $_POST["descricao_manutencao_tabelas_sistema_criacao"];

        if (valida_campos_form_gen::valida_texto($descricao, 'Descrição', "", true, 1, 80, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $codigo_tabela = "";
    if (isset($_POST["codigo_tabela_manutencao_tabelas_sistema_criacao"])) {
        $codigo_tabela = $_POST["codigo_tabela_manutencao_tabelas_sistema_criacao"];

        if (valida_campos_form_gen::valida_texto($codigo_tabela, 'Código tabela', "", true, 2, 5, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $descricao_tabela = "";
    if (isset($_POST["descricao_tabela_manutencao_tabelas_sistema_criacao"])) {
        $descricao_tabela = $_POST["descricao_tabela_manutencao_tabelas_sistema_criacao"];

        if (valida_campos_form_gen::valida_texto($descricao_tabela, 'Descrição tabela', "", true, 1, 30, $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    if ($resultadofinalvalidacao < 4) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] = 'Campos - ' . $conteudosaida["descresultado"];
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

    $array_params_sql = array($codigo_tabela, $codigo, $descricao, $descricao_tabela, 'S', 0, $idautenticacao);

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "manutencaoinserenovaentrada", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if ($ressql == "1") {

            //Novo codigo
            $gestao_inf = null;
            if (isset($_SESSION['GESTAO_INFORMACAO'])) {

                $gestao_inf = unserialize($_SESSION['GESTAO_INFORMACAO']);
                $gestao_inf->geradropdown_tabcoddesc_nome_tabelas_lista(
                    0,
                    "pesquisa_manutencao_nome_tabelas",
                    "tabela_manutencao_tabelas_sistema_pesquisa",
                    "tabela_id_manutencao_tabelas_sistema_pesquisa",
                    "dados_elem_form_manutencao_tabelas_sistema_pesquisa",
                    true,
                    $objdb,
                    true,
                    true,
                    true,
                    "nome_tabela",
                    "nome_tabela_sistema",
                    $listaretornar,
                    $ihtmlretorno_manutencao_tabelas_sistema_pesquisa

                );
                $conteudosaida["ihtml"] = $ihtmlretorno_manutencao_tabelas_sistema_pesquisa;

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
                $conteudosaida["descresultado"] = "Criou na BD mas deu erro a carregar a dropdown. carregue em CTRL-F5.";
                echo json_encode($conteudosaida);
            }

            //antigo código
            // $conteudosaida["resultado"] = '1';
            // $conteudosaida["descresultado"] =  $descresultado;
            // $ddnome_tabela = new dropdown2();
            // $conteudosaida["ihtml"] = $ddnome_tabela->geradropdown_tabcoddesc_nome_tabelas_objBD( $objdb, 1, "pesquisa_manutencao_nome_tabelas", "tabela_manutencao_tabelas_sistema_pesquisa", "tabela_id_manutencao_tabelas_sistema_pesquisa", "dados_elem_form_manutencao_tabelas_sistema_pesquisa", true);
            //echo json_encode($conteudosaida);
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
    $conteudosaida["descresultado"] = 'Não não enviou dados para criar o pretendido!...';
    echo json_encode($conteudosaida);
}
