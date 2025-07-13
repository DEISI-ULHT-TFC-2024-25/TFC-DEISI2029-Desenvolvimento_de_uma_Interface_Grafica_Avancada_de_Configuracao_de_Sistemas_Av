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

$archname = "";
if (isset($_POST["archname"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    $descresultado = '';
    $resultadofinalvalidacao = 0;


    $archname = $_POST["archname"];

    if (valida_campos_form_gen::valida_texto($archname, 'Archname', "", true, 1, 30, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= $descresultado;
    }

    $debugmonitor = 0;
    if (isset($_POST["debugmonitor"])) {
        $debugmonitor = $_POST["debugmonitor"];

        if (valida_campos_form_gen::valida_id_dropdown($debugmonitor, 'Debugmonitor', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $targetboard = 0;
    if (isset($_POST["targetboard"])) {
        $targetboard = $_POST["targetboard"];

        if (valida_campos_form_gen::valida_id_dropdown($targetboard, 'Targetboard', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $fpu = 0;
    if (isset($_POST["fpu"])) {
        $fpu = $_POST["fpu"];

        if (valida_campos_form_gen::valida_id_dropdown($fpu, 'Fpu', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $architecturetype = 0;
    if (isset($_POST["architecturetype"])) {
        $architecturetype = $_POST["architecturetype"];

        if (valida_campos_form_gen::valida_id_dropdown($architecturetype, 'Architecturetype', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $bare = 'false';
    if (isset($_POST["bare"])) {
        $bare = $_POST["bare"];

        if (valida_campos_form_gen::valida_boleano($bare, 'Bare', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $installrtos = 'false';
    if (isset($_POST["installrtos"])) {
        $installrtos = $_POST["installrtos"];

        if (valida_campos_form_gen::valida_boleano($installrtos, 'Installrtos', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $posixrtems5 = 'false';
    if (isset($_POST["posixrtems5"])) {
        $posixrtems5 = $_POST["posixrtems5"];

        if (valida_campos_form_gen::valida_boleano($posixrtems5, 'Posixrtems5', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $rtems48i = 'false';
    if (isset($_POST["rtems48i"])) {
        $rtems48i = $_POST["rtems48i"];

        if (valida_campos_form_gen::valida_boleano($rtems48i, 'Rtems48i', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    $rtems5 = 'false';
    if (isset($_POST["rtems5"])) {
        $rtems5 = $_POST["rtems5"];

        if (valida_campos_form_gen::valida_boleano($rtems5, 'Rtems5', $descresultado) == 1) {
            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
        } else {
            $conteudosaida["descresultado"] .= $descresultado;
        }
    }

    if ($resultadofinalvalidacao < 10) {
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

    $array_params_sql = array($archname, $bare, $debugmonitor, $fpu, $installrtos, $posixrtems5, $rtems48i, $rtems5, $targetboard, $architecturetype, $idautenticacao);

    $retorno = 0;
    $ressql = "";

    $retorno = GconexaoBD::executar_sql($objdb, "cria_configuration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno == 1) {
        if (intval($ressql) >= 1) {

            //Novo codigo
            $gestao_inf = null;
            if (isset($_SESSION['GESTAO_INFORMACAO'])) {

                $gestao_inf = unserialize($_SESSION['GESTAO_INFORMACAO']);
                $codigo_tabela = "CONF";

                if (isset($gestao_inf)) {

                    $gestao_inf->inicializar_alterar_lista_gestaoair($objdb);
                    $htmlopcoestotal = $gestao_inf->altera_opcoesdd_gestaoair($codigo_tabela, "N", $codigo_tabela);
                    $htmlopcoes = $gestao_inf->altera_opcoesdd_gestaoair($codigo_tabela, "S", $codigo_tabela . "_A");

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
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Criou na BD mas deu erro a carregar a dropdown. carregue em CTRL-F5.";
                echo json_encode($conteudosaida);
            }
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
