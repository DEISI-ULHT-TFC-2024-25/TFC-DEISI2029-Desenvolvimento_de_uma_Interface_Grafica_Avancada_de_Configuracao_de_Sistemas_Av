<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";
include_once "Generic/constants.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'dados' => '',
    'inhtml' => ''
);

$resultadofinalvalidacao = 0;
$criou_obj_conexaoBD = 0;
$alterou = 0;
$retorno = 0;
$ressql = "";
$modo = "";
$descresultadoarrayPHP;
$gestao_inf = null;
$listaretornar = "";

if (isset($_POST["existiu_alteracao"])) {

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;

    if (isset($_SESSION['GESTAO_INFORMACAO'])) {
        $gestao_inf = unserialize($_SESSION['GESTAO_INFORMACAO']);
        $listaretornar = $gestao_inf->getlistas("lista_sistema_total");
        $desclistarrayPHP = json_decode($listaretornar, true);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Faça login novamente. A sua sessão deve etr expirado.";
        echo json_encode($conteudosaida);
        return;
    }

    $existiu_alteracao = $_POST["existiu_alteracao"];

    if ($existiu_alteracao < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não efetuou alterações!...';
        echo json_encode($conteudosaida);
        return;
    }

    if (isset($_POST["objectoconfiguration"])) {
        $objectoconfiguration_temp = $_POST["objectoconfiguration"];
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = 'Não foi recebida informação para proceder às alterações pretendidas!...';
        echo json_encode($conteudosaida);
        return;
    }

    $objectoconfiguration = json_decode($objectoconfiguration_temp, true);

    if ($objectoconfiguration['alterado'][0] == 1) {

        $resultadofinalvalidacao = 0;
        $configurationid = 0;
        if (isset($objectoconfiguration['id'])) {
            $configurationid = $objectoconfiguration['id'];

            if (valida_campos_form_gen::valida_numero($configurationid, 'configuration.id', false, 0, 0, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $archname = "";
        if (isset($objectoconfiguration['archname'])) {
            $archname = $objectoconfiguration['archname'];

            if (valida_campos_form_gen::valida_texto($archname, 'configuration.archname', "", true, 1, 20, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $iddebugmonitor = 0;
        if (isset($objectoconfiguration["iddebugmonitor"])) {
            $iddebugmonitor = $objectoconfiguration["iddebugmonitor"];

            if (valida_campos_form_gen::valida_id_dropdown($iddebugmonitor, 'configuration.iddebugmonitor', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= " " . $descresultado;
            }
        }

        $idfpu = 0;
        if (isset($objectoconfiguration["idfpu"])) {
            $idfpu = $objectoconfiguration["idfpu"];

            if (valida_campos_form_gen::valida_id_dropdown($idfpu, 'configuration.idfpu', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= " " . $descresultado;
            }
        }

        $idtargetboard = 0;
        if (isset($objectoconfiguration["idtargetboard"])) {
            $idtargetboard = $objectoconfiguration["idtargetboard"];

            if (valida_campos_form_gen::valida_id_dropdown($idtargetboard, 'configuration.idtargetboard', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= " " . $descresultado;
            }
        }

        $idarchitecturetype = 0;
        if (isset($objectoconfiguration["idarchitecturetype"])) {
            $idarchitecturetype = $objectoconfiguration["idarchitecturetype"];

            if (valida_campos_form_gen::valida_id_dropdown($idtargetboard, 'configuration.idarchitecturetype', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= " " . $descresultado;
            }
        }

        $bare = "";
        if (isset($objectoconfiguration['bare'])) {
            $bare = $objectoconfiguration['bare'];

            if (valida_campos_form_gen::valida_boleano($bare, 'configuration.bare', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $installrtos = "";
        if (isset($objectoconfiguration['installrtos'])) {
            $installrtos = $objectoconfiguration['installrtos'];

            if (valida_campos_form_gen::valida_boleano($installrtos, 'configuration.installrtos', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $posixrtems5 = "";
        if (isset($objectoconfiguration['posixrtems5'])) {
            $posixrtems5 = $objectoconfiguration['posixrtems5'];

            if (valida_campos_form_gen::valida_boleano($posixrtems5, 'configuration.posixrtems5', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $rtems48i = "";
        if (isset($objectoconfiguration['rtems48i'])) {
            $rtems48i = $objectoconfiguration['rtems48i'];

            if (valida_campos_form_gen::valida_boleano($rtems48i, 'configuration.rtems48i', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $rtems5 = "";
        if (isset($objectoconfiguration['rtems5'])) {
            $rtems5 = $objectoconfiguration['rtems5'];

            if (valida_campos_form_gen::valida_boleano($rtems5, 'configuration.rtems5', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        if ($resultadofinalvalidacao < 11) {
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
        } else {
            $criou_obj_conexaoBD = 1;
        }

        $array_params_sql = array(
            $configurationid,
            $archname,
            $bare,
            $iddebugmonitor,
            $idfpu,
            $installrtos,
            $posixrtems5,
            $rtems48i,
            $rtems5,
            $idtargetboard,
            $idarchitecturetype,
            'S',
            $idautenticacao
        );

        $retorno = 0;
        $ressql = "";

        $retorno = GconexaoBD::executar_sql(
            $objdb,
            "altera_configuration",
            $array_params_sql,
            $ressql,
            $descresultado,
            $concat,
            $descresultadoarrayPHP,
            $descresultadojson
        );

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $objectoconfiguration['id'] = intval($ressql);
            $alterou = 1;
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
            return;
        }
    }

    if ($objectoconfiguration['alterado'][1] == 1) {

        $resultadofinalvalidacao = 0;
        $arinc653moduleid = 0;
        if (isset($objectoconfiguration['arinc653module_obj']['id'])) {
            $arinc653moduleid = $objectoconfiguration['arinc653module_obj']['id'];

            if (valida_campos_form_gen::valida_numero_indice($arinc653moduleid, 'arinc653module.id', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        if ($arinc653moduleid == 0) {
            $modo = "C";

            $arinc653module_idconfiguration = 0;
            if (isset($objectoconfiguration['id'])) {
                $arinc653module_idconfiguration = $objectoconfiguration['id'];

                if (valida_campos_form_gen::valida_numero($arinc653module_idconfiguration, 'arinc653module.idconfiguration', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        } else {
            $modo = "A";

            $arinc653module_idconfiguration = 0;
            if (isset($objectoconfiguration['arinc653module_obj']['idconfiguration'])) {
                $arinc653module_idconfiguration = $objectoconfiguration['arinc653module_obj']['idconfiguration'];

                if (valida_campos_form_gen::valida_numero($arinc653module_idconfiguration, 'arinc653module.idconfiguration', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        }

        $modulename = "";
        if (isset($objectoconfiguration['arinc653module_obj']['modulename'])) {
            $modulename = $objectoconfiguration['arinc653module_obj']['modulename'];

            if (valida_campos_form_gen::valida_texto($modulename, 'arinc653module.modulename', "", true, 1, 20, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $xmlnsxsi = "";
        if (isset($objectoconfiguration['arinc653module_obj']['xmlnsxsi'])) {
            $xmlnsxsi = $objectoconfiguration['arinc653module_obj']['xmlnsxsi'];

            if (valida_campos_form_gen::valida_texto($xmlnsxsi, 'arinc653module.xmlnsxsi', "", true, 0, 250, $descresultado) == 1) {
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

        if ($criou_obj_conexaoBD == 0) {

            $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
            if ($resultado < 1) {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $message;
                echo json_encode($conteudosaida);
                return;
            } else {
                $criou_obj_conexaoBD = 1;
            }
        }

        $array_params_sql = null;

        if ($modo == "A") {

            $array_params_sql = array(
                $arinc653moduleid,
                $modulename,
                $xmlnsxsi,
                $arinc653module_idconfiguration,
                'S',
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "altera_arinc653module",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        } else {

            $array_params_sql = array(
                $modulename,
                $xmlnsxsi,
                $arinc653module_idconfiguration,
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "cria_arinc653module",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        }

        if ($retorno > 0) {

            //Segue para a próxima etapa
            $objectoconfiguration['arinc653module_obj']['id'] = intval($ressql);
            if ($modo == "C") {
                $objectoconfiguration['arinc653module_obj']['idconfiguration'] = $arinc653module_idconfiguration;
            }
            $alterou = 1;
            //Segue para a próxima etapa

        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
            return;
        }
    }

    if ($objectoconfiguration['alterado'][2] == 1) {

        $resultadofinalvalidacao = 0;
        $modo = "";

        $airconfigurationid = 0;
        if (isset($objectoconfiguration['airconfiguration_obj']['id'])) {
            $airconfigurationid = $objectoconfiguration['airconfiguration_obj']['id'];

            if (valida_campos_form_gen::valida_numero_indice($airconfigurationid, 'airconfiguration.id', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        if ($airconfigurationid == 0) {
            $modo = "C";

            $airconfiguration_idarinc653module = 0;
            if (isset($objectoconfiguration['arinc653module_obj']['id'])) {
                $airconfiguration_idarinc653module = $objectoconfiguration['arinc653module_obj']['id'];

                if (valida_campos_form_gen::valida_numero($airconfiguration_idarinc653module, 'airconfiguration.idarinc653module', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        } else {
            $modo = "A";

            $airconfiguration_idarinc653module = 0;
            if (isset($objectoconfiguration['airconfiguration_obj']['idarinc653module'])) {
                $airconfiguration_idarinc653module = $objectoconfiguration['airconfiguration_obj']['idarinc653module'];

                if (valida_campos_form_gen::valida_numero($airconfiguration_idarinc653module, 'airconfiguration.idarinc653module', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        }

        $airconfiguration_requiredcores = 0;
        if (isset($objectoconfiguration['airconfiguration_obj']['requiredcores'])) {
            $airconfiguration_requiredcores = $objectoconfiguration['airconfiguration_obj']['requiredcores'];

            if (valida_campos_form_gen::valida_numero($airconfiguration_requiredcores, 'airconfiguration.requiredcores', false, 0, 0, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $airconfiguration_tickspersecond = 0;
        if (isset($objectoconfiguration['airconfiguration_obj']['tickspersecond'])) {
            $airconfiguration_tickspersecond = $objectoconfiguration['airconfiguration_obj']['tickspersecond'];

            if (valida_campos_form_gen::valida_numero($airconfiguration_tickspersecond, 'airconfiguration.tickspersecond', false, 0, 0, $descresultado) == 1) {
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

        if ($criou_obj_conexaoBD == 0) {

            $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
            if ($resultado < 1) {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $message;
                echo json_encode($conteudosaida);
                return;
            } else {
                $criou_obj_conexaoBD = 1;
            }
        }

        $array_params_sql = null;

        if ($modo == "A") {

            $array_params_sql = array(
                $airconfigurationid,
                $airconfiguration_requiredcores,
                $airconfiguration_tickspersecond,
                $airconfiguration_idarinc653module,
                'S',
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "altera_airconfiguration",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        } else {

            $array_params_sql = array(
                $airconfiguration_requiredcores,
                $airconfiguration_tickspersecond,
                $airconfiguration_idarinc653module,
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "cria_airconfiguration",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        }

        if ($retorno > 0) {

            //Segue para a próxima etapa
            $objectoconfiguration['airconfiguration_obj']['id'] = intval($ressql);
            if ($modo == "C") {
                $objectoconfiguration['airconfiguration_obj']['idarinc653module'] = $airconfiguration_idarinc653module;
            }
            $alterou = 1;
            //Segue para a próxima etapa

        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
            return;
        }
    }

    if ($objectoconfiguration['alterado'][3] == 1) {

        $resultadofinalvalidacao = 0;
        $modo = "";

        $modulescheduleid = 0;
        if (isset($objectoconfiguration['moduleschedule_obj']['id'])) {

            $modulescheduleid = $objectoconfiguration['moduleschedule_obj']['id'];

            if (valida_campos_form_gen::valida_numero_indice($modulescheduleid, 'moduleschedule.id', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        if ($modulescheduleid == 0) {
            $modo = "C";

            $moduleschedule_idarinc653module = 0;
            if (isset($objectoconfiguration['arinc653module_obj']['id'])) {
                $moduleschedule_idarinc653module = $objectoconfiguration['arinc653module_obj']['id'];

                if (valida_campos_form_gen::valida_numero($moduleschedule_idarinc653module, 'moduleschedule.idarinc653module', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        } else {
            $modo = "A";

            $moduleschedule_idarinc653module = 0;
            if (isset($objectoconfiguration['moduleschedule_obj']['idarinc653module'])) {
                $moduleschedule_idarinc653module = $objectoconfiguration['moduleschedule_obj']['idarinc653module'];

                if (valida_campos_form_gen::valida_numero($moduleschedule_idarinc653module, 'moduleschedule.idarinc653module', false, 0, 0, $descresultado) == 1) {
                    $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                } else {
                    $conteudosaida["descresultado"] .= $descresultado;
                }
            }
        }

        $schedulename = "";
        if (isset($objectoconfiguration['moduleschedule_obj']['schedulename'])) {
            $schedulename = $objectoconfiguration['moduleschedule_obj']['schedulename'];

            if (valida_campos_form_gen::valida_texto($schedulename, 'moduleschedule.schedulename', "", true, 1, 20, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $scheduleidentifier = 0;
        if (isset($objectoconfiguration['moduleschedule_obj']['scheduleidentifier'])) {
            $scheduleidentifier = $objectoconfiguration['moduleschedule_obj']['scheduleidentifier'];

            if (valida_campos_form_gen::valida_numero($scheduleidentifier, 'moduleschedule.scheduleidentifier', false, 0, 0, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $initialmoduleschedule = "";
        if (isset($objectoconfiguration['moduleschedule_obj']['initialmoduleschedule'])) {
            $initialmoduleschedule = $objectoconfiguration['moduleschedule_obj']['initialmoduleschedule'];

            if (valida_campos_form_gen::valida_boleano($initialmoduleschedule, 'moduleschedule.initialmoduleschedule', $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        $majorframeseconds = 0;
        if (isset($objectoconfiguration['moduleschedule_obj']['majorframeseconds'])) {
            $majorframeseconds = $objectoconfiguration['moduleschedule_obj']['majorframeseconds'];

            if (valida_campos_form_gen::valida_numero($majorframeseconds, 'moduleschedule.majorframeseconds', false, 0, 0, $descresultado) == 1) {
                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
            } else {
                $conteudosaida["descresultado"] .= $descresultado;
            }
        }

        if ($resultadofinalvalidacao < 6) {
            $conteudosaida["resultado"] = '-1';
            $conteudosaida["descresultado"] = 'Campos - ' . $conteudosaida["descresultado"];
            echo json_encode($conteudosaida);
            return;
        }

        if ($criou_obj_conexaoBD == 0) {

            $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
            if ($resultado < 1) {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $message;
                echo json_encode($conteudosaida);
                return;
            } else {
                $criou_obj_conexaoBD = 1;
            }
        }

        $array_params_sql = null;

        if ($modo == "A") {

            $array_params_sql = array(
                $modulescheduleid,
                $initialmoduleschedule,
                $majorframeseconds,
                $scheduleidentifier,
                $schedulename,
                $moduleschedule_idarinc653module,
                'S',
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "altera_moduleschedule",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        } else {

            $array_params_sql = array(
                $initialmoduleschedule,
                $majorframeseconds,
                $scheduleidentifier,
                $schedulename,
                $moduleschedule_idarinc653module,
                $idautenticacao
            );

            $retorno = GconexaoBD::executar_sql(
                $objdb,
                "cria_moduleschedule",
                $array_params_sql,
                $ressql,
                $descresultado,
                $concat,
                $descresultadoarrayPHP,
                $descresultadojson
            );
        }

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $objectoconfiguration['moduleschedule_obj']['id'] = intval($ressql);
            if ($modo == "C") {
                $objectoconfiguration['moduleschedule_obj']['idarinc653module'] = $moduleschedule_idarinc653module;
            }
            $alterou = 1;
            //Segue para a próxima etapa
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
            return;
        }
    }

    if ($objectoconfiguration['alterado'][4] == 1) {
        $resultadofinalvalidacao = 0;
        $modo = "";
        $conta_num_particoes = 0;

        if (isset($objectoconfiguration['partitions_obj'])) {
            $conta_num_particoes = count($objectoconfiguration['partitions_obj']);

            for ($i = 0; $i < $conta_num_particoes; $i++) {

                $partitionstateid = 0;
                if (isset($objectoconfiguration['partitions_obj'][$i]["stateid"])) {
                    $partitionstateid = $objectoconfiguration['partitions_obj'][$i]["stateid"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o estado da partição!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionid = 0;
                if (isset($objectoconfiguration['partitions_obj'][$i]["id"])) {
                    $partitionid = $objectoconfiguration['partitions_obj'][$i]["id"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id da partição!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionidarinc653module = 0;
                if (isset($objectoconfiguration['partitions_obj'][$i]["idarinc653module"])) {
                    $partitionidarinc653module = $objectoconfiguration['partitions_obj'][$i]["idarinc653module"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id de moduleschedule!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionidpartitionconfiguration = 0;
                if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["id"])) {
                    $partitionidpartitionconfiguration = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["id"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id de partitionconfiguration!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionidpartitionconfigurationmemory = 0;
                if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["memory_obj"]["id"])) {
                    $partitionidpartitionconfigurationmemory = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["memory_obj"]["id"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id de partitionconfiguration!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $resultadofinalvalidacao = 0;
                if ($partitionstateid == constants::$ALTERAR || $partitionstateid == constants::$CRIAR) {

                    $criticality = 0;
                    if (isset($objectoconfiguration['partitions_obj'][$i]["criticality"])) {
                        $criticality = $objectoconfiguration['partitions_obj'][$i]["criticality"];

                        if (valida_campos_form_gen::valida_id_dropdown($criticality, 'partitions.criticality' . $i, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= " " . $descresultado;
                        }
                    }

                    $entrypoint = 0;
                    if (isset($objectoconfiguration['partitions_obj'][$i]["entrypoint"])) {
                        $entrypoint = $objectoconfiguration['partitions_obj'][$i]["entrypoint"];

                        if (valida_campos_form_gen::valida_texto($entrypoint, 'partitions.entrypoint' . $i, "", true, 1, 30, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= " " . $descresultado;
                        }
                    }

                    $partitionname = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionname"])) {
                        $partitionname = $objectoconfiguration['partitions_obj'][$i]["partitionname"];

                        if (valida_campos_form_gen::valida_texto($partitionname, 'partitions.partitionname' . $i, "", true, 1, 20, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= " " . $descresultado;
                        }
                    }

                    $partitionidentifier = 0;
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionidentifier"])) {
                        $partitionidentifier = $objectoconfiguration['partitions_obj'][$i]["partitionidentifier"];

                        if (valida_campos_form_gen::valida_numero($partitionidentifier, 'partitions.partitionidentifier' . $i, false, 0, 0, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $systempartition = 0;
                    if (isset($objectoconfiguration['partitions_obj'][$i]["systempartition"])) {
                        $systempartition = $objectoconfiguration['partitions_obj'][$i]["systempartition"];

                        if (valida_campos_form_gen::valida_boleano($systempartition, 'partitions.systempartition' . $i, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $cache = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["cache"])) {
                        $cache = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["cache"];

                        if (valida_campos_form_gen::valida_texto($partitionname, 'partitionconfiguration.cache' . $i, "", false, 0, 0, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $cores = 0;
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["cores"])) {
                        $cores = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["cores"];

                        if (valida_campos_form_gen::valida_numero($cores, 'partitionconfiguration.cores' . $i, false, 0, 0, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $idslibs = "";

                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idslibs"])) {
                        $idslibs = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idslibs"];

                        if (valida_campos_form_gen::valida_multiselection($idslibs, 'partitionconfiguration.idslibs' . $i, 'LIB', 'S', $desclistarrayPHP, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $idspersonality = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idspersonality"])) {
                        $idspersonality = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idspersonality"];

                        if (valida_campos_form_gen::valida_multiselection($idspersonality, 'partitionconfiguration.idspersonality' . $i, 'PER', 'S', $desclistarrayPHP, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $idsdevices = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idsdevices"])) {
                        $idsdevices = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idsdevices"];

                        if (valida_campos_form_gen::valida_multiselection($idsdevices, 'partitionconfiguration.idsdevices' . $i, 'DEV', 'S', $desclistarrayPHP, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $idspermissions = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idspermissions"])) {
                        $idspermissions = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["idspermissions"];

                        if (valida_campos_form_gen::valida_multiselection($idspermissions, 'partitionconfiguration.idspermissions' . $i, 'PMY', 'S', $desclistarrayPHP, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $size = "";
                    if (isset($objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["memory_obj"]["size"])) {
                        $size = $objectoconfiguration['partitions_obj'][$i]["partitionconfiguration_obj"]["memory_obj"]["size"];

                        if (valida_campos_form_gen::valida_texto($size, 'memory.size' . $i, '/[0-9]{1}(x)(\d{6})$/', true, 8, 8, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    if ($resultadofinalvalidacao < 11) {
                        $conteudosaida["resultado"] = '-1';
                        $conteudosaida["descresultado"] = 'Campos - ' . $conteudosaida["descresultado"];
                        echo json_encode($conteudosaida);
                        return;
                    }
                }

                if ($partitionstateid == constants::$ALTERAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;

                    $array_params_sql = array($partitionid, $criticality, $partitionname, $partitionidentifier, $systempartition, $entrypoint, $partitionidarinc653module, 'S', $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "altera_partitions",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        $alterou = 1;
                        //Segue para a próxima etapa
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($partitionidpartitionconfiguration, $cache, $cores, $idslibs, $idspersonality, $idsdevices, $idspermissions, $partitionid, 'S', $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "altera_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($partitionidpartitionconfigurationmemory, $size, $partitionidpartitionconfiguration, 'S', $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "altera_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }

                if ($partitionstateid == constants::$CRIAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;

                    $array_params_sql = array($criticality, $partitionname, $partitionidentifier, $systempartition, $entrypoint, $partitionidarinc653module, $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "cria_partitions",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $partitionid = intval($ressql);
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($cache, $cores, $idslibs, $idspersonality, $idsdevices, $idspermissions, $partitionid, $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "cria_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $partitionidpartitionconfiguration = intval($ressql);
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($size, $partitionidpartitionconfiguration, $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "cria_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $partitionidpartitionconfigurationmemory = intval($ressql);
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }

                if ($partitionstateid == constants::$APAGAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;

                    $array_params_sql = array($partitionid, $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "delete_partitions",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        $alterou = 1;
                        //Segue para a próxima etapa
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Não enviou partições para inserir, alterar ou apagar!...";
            echo json_encode($conteudosaida);
            return;
        }
    }

    if ($objectoconfiguration['alterado'][5] == 1) {

        $resultadofinalvalidacao = 0;
        $modo = "";
        $conta_num_partitionschedule = 0;
        $conta_num_windowchedule = 0;
        $partitionschedule_stateid = array();
        $partitionschedule_id = array();
        $partitionschedule_idmoduleschedule = array();
        $partitionschedule_idwindowconfiguration = array();

        if (isset($objectoconfiguration['partitionschedule_obj'])) {
            $conta_num_partitionschedule = count($objectoconfiguration['partitionschedule_obj']);

            for ($i = 0; $i < $conta_num_partitionschedule; $i++) {

                $partitionschedule_stateid[$i] = 0;
                if (isset($objectoconfiguration['partitionschedule_obj'][$i]["stateid"])) {
                    $partitionschedule_stateid[$i] = $objectoconfiguration['partitionschedule_obj'][$i]["stateid"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o estado da partitionschedule" . $i . " !...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionschedule_id[$i] = 0;
                if (isset($objectoconfiguration['partitionschedule_obj'][$i]["id"])) {
                    $partitionschedule_id[$i] = $objectoconfiguration['partitionschedule_obj'][$i]["id"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id da partitionschedule" . $i . " !...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionschedule_idmoduleschedule[$i] = 0;
                if (isset($objectoconfiguration['partitionschedule_obj'][$i]["idmoduleschedule"])) {
                    $partitionschedule_idmoduleschedule[$i] = $objectoconfiguration['partitionschedule_obj'][$i]["idmoduleschedule"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id de moduleschedule!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $partitionschedule_idwindowconfiguration[$i] = 0;
                if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["id"])) {
                    $partitionschedule_idwindowconfiguration[$i] = $objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["id"];
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Erro a obter o id de partitionconfiguration!...";
                    echo json_encode($conteudosaida);
                    return;
                }

                $resultadofinalvalidacao = 0;
                if ($partitionschedule_stateid[$i] == constants::$ALTERAR || $partitionschedule_stateid[$i] == constants::$CRIAR) {

                    $perioddurationseconds = "";
                    if (isset($objectoconfiguration['partitionschedule_obj'][$i]["perioddurationseconds"])) {
                        $perioddurationseconds = $objectoconfiguration['partitionschedule_obj'][$i]["perioddurationseconds"];

                        if (valida_campos_form_gen::valida_texto($perioddurationseconds, 'partitionschedule.perioddurationseconds' . $i, '/[0-9]{1}(\.)(\d{5})$/', true, 7, 7, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= " " . $descresultado;
                        }
                    }

                    $periodseconds = "";
                    if (isset($objectoconfiguration['partitionschedule_obj'][$i]["periodseconds"])) {
                        $periodseconds = $objectoconfiguration['partitionschedule_obj'][$i]["periodseconds"];

                        if (valida_campos_form_gen::valida_texto($periodseconds, 'partitionschedule.periodseconds' . $i, '/[0-9]{1}(\.)(\d{5})$/', true, 7, 7, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= " " . $descresultado;
                        }
                    }

                    $windowidentifier = 0;
                    if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["windowidentifier"])) {
                        $windowidentifier = $objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["windowidentifier"];

                        if (valida_campos_form_gen::valida_numero($windowidentifier, 'partitionschedule.windowconfiguration.windowidentifier' . $i, false, 0, 0, $descresultado) == 1) {
                            $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                        } else {
                            $conteudosaida["descresultado"] .= $descresultado;
                        }
                    }

                    $cores = 0;
                    if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["cores"])) {
                        $cores = $objectoconfiguration['partitionschedule_obj'][$i]["windowconfiguration_obj"]["cores"];

                        if (valida_campos_form_gen::valida_numero($cores, 'partitionschedule.windowconfiguration.cores' . $i, false, 0, 0, $descresultado) == 1) {
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
                }

                if ($partitionschedule_stateid[$i] == constants::$ALTERAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;
                    $array_params_sql = array($partitionschedule_id[$i], $perioddurationseconds, $periodseconds, $partitionschedule_idmoduleschedule[$i], 'S', $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "altera_partitionschedule",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        $alterou = 1;
                        //Segue para a próxima etapa
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($partitionschedule_idwindowconfiguration[$i], $windowidentifier, $cores, $partitionschedule_id[$i], 'S', $idautenticacao);
                    $retorno = GconexaoBD::executar_sql($objdb, "altera_windowconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }

                if ($partitionschedule_stateid[$i] == constants::$CRIAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;
                    $array_params_sql = array($perioddurationseconds, $periodseconds, $partitionschedule_idmoduleschedule[$i], $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "cria_partitionschedule",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $partitionschedule_id[$i] = intval($ressql);
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    $array_params_sql = array($windowidentifier, $cores, $partitionschedule_id[$i], $idautenticacao);
                    $retorno = GconexaoBD::executar_sql($objdb, "cria_windowconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $partitionschedule_idwindowconfiguration[$i] = intval($ressql);
                        $alterou = 1;
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }

                if ($partitionschedule_stateid[$i] == constants::$APAGAR) {

                    $retorno = 0;
                    $array_params_sql = null;
                    $ressql = "";
                    $descresultado = "";
                    $concat = "";
                    $descresultadoarrayPHP = "";
                    $descresultadojson = "";

                    if ($criou_obj_conexaoBD == 0) {

                        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                        if ($resultado < 1) {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = $message;
                            echo json_encode($conteudosaida);
                            return;
                        } else {
                            $criou_obj_conexaoBD = 1;
                        }
                    }

                    $array_params_sql = null;
                    $array_params_sql = array($partitionschedule_id[$i], $idautenticacao);

                    $retorno = GconexaoBD::executar_sql(
                        $objdb,
                        "delete_partitionschedule",
                        $array_params_sql,
                        $ressql,
                        $descresultado,
                        $concat,
                        $descresultadoarrayPHP,
                        $descresultadojson
                    );

                    if ($retorno > 0) {
                        $alterou = 1;
                        //Segue para a próxima etapa
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado;
                        echo json_encode($conteudosaida);
                        return;
                    }
                }
            }

            for ($i = 0; $i < $conta_num_partitionschedule; $i++) {

                $conta_num_windowchedule = 0;
                $windowschedule_stateid = 0;
                $ws_id = 0;

                if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"])) {

                    $conta_num_windowchedule = count($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"]);

                    for ($j = 0; $j < $conta_num_windowchedule; $j++) {

                        $resultadofinalvalidacao = 0;

                        $windowschedule_stateid = "";
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["stateid"])) {
                            $windowschedule_stateid = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["stateid"];
                        } else {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = "Erro a obter o state da windowschedule" . $i . " !...";
                            echo json_encode($conteudosaida);
                            return;
                        }

                        $ws_id = 0;
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["id"])) {
                            $ws_id = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["id"];
                        } else {
                            $conteudosaida["resultado"] = '0';
                            $conteudosaida["descresultado"] = "Erro a obter o id da windowschedule" . $i . " !...";
                            echo json_encode($conteudosaida);
                            return;
                        }

                        $ws_windowidentifier = 0;
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowidentifier"])) {
                            $ws_windowidentifier = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowidentifier"];

                            if (valida_campos_form_gen::valida_numero($ws_windowidentifier, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'windowidentifier', false, 0, 0, $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= $descresultado;
                            }
                        }

                        $ws_coreidentifier = 0;
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["coreidentifier"])) {
                            $ws_coreidentifier = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["coreidentifier"];

                            if (valida_campos_form_gen::valida_numero($ws_coreidentifier, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'coreidentifier', false, 0, 0, $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= $descresultado;
                            }
                        }

                        $ws_idpartitionconfiguration = 0;
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["idpartitionconfiguration"])) {
                            $ws_idpartitionconfiguration = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["idpartitionconfiguration"];

                            if (valida_campos_form_gen::valida_id_dropdown($ws_idpartitionconfiguration, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'idpartitionconfiguration', $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= " " . $descresultado;
                            }
                        }

                        $ws_windowdurationseconds = "";
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowdurationseconds"])) {
                            $ws_windowdurationseconds = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowdurationseconds"];

                            if (valida_campos_form_gen::valida_texto($ws_windowdurationseconds, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'windowdurationseconds', '/[0-9]{1}(\.)(\d{5})$/', true, 7, 7, $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= " " . $descresultado;
                            }
                        }

                        $ws_windowstartseconds = "-1";
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowstartseconds"])) {
                            $ws_windowstartseconds = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["windowstartseconds"];

                            if (valida_campos_form_gen::valida_texto($ws_windowstartseconds, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'windowstartseconds', '/[0-9]{1}(\.)(\d{5})$/', true, 7, 7, $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= " " . $descresultado;
                            }
                        }

                        $ws_partitionperiodstart = "";
                        if (isset($objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]['partitionperiodstart'])) {
                            $ws_partitionperiodstart = $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]['partitionperiodstart'];

                            if (valida_campos_form_gen::valida_boleano($ws_partitionperiodstart, 'partitionschedule.' . $i . 'windowschedule.' . $j . 'partitionperiodstart', $descresultado) == 1) {
                                $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
                            } else {
                                $conteudosaida["descresultado"] .= $descresultado;
                            }
                        }

                        if ($resultadofinalvalidacao < 6) {
                            $conteudosaida["resultado"] = '-1';
                            $conteudosaida["descresultado"] = 'Campos - ' . $conteudosaida["descresultado"];
                            echo json_encode($conteudosaida);
                            return;
                        }

                        $retorno = 0;
                        $array_params_sql = null;
                        $ressql = "";
                        $descresultado = "";
                        $concat = "";
                        $descresultadoarrayPHP = "";
                        $descresultadojson = "";

                        if ($windowschedule_stateid == constants::$ALTERAR) {

                            if ($criou_obj_conexaoBD == 0) {

                                $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                                if ($resultado < 1) {
                                    $conteudosaida["resultado"] = '0';
                                    $conteudosaida["descresultado"] = $message;
                                    echo json_encode($conteudosaida);
                                    return;
                                } else {
                                    $criou_obj_conexaoBD = 1;
                                }
                            }

                            $array_params_sql = null;
                            $array_params_sql = array($ws_id, $ws_partitionperiodstart, $ws_windowdurationseconds, $ws_windowidentifier, $ws_windowstartseconds, $ws_coreidentifier, $partitionschedule_id[$i], $ws_idpartitionconfiguration, 'S', $idautenticacao);


                            $retorno = GconexaoBD::executar_sql(
                                $objdb,
                                "altera_windowschedule",
                                $array_params_sql,
                                $ressql,
                                $descresultado,
                                $concat,
                                $descresultadoarrayPHP,
                                $descresultadojson
                            );

                            if ($retorno > 0) {
                                $alterou = 1;
                                //Segue para a próxima etapa
                            } else {
                                $conteudosaida["resultado"] = '0';
                                $conteudosaida["descresultado"] = $descresultado;
                                echo json_encode($conteudosaida);
                                return;
                            }
                        }

                        $retorno = 0;
                        $array_params_sql = null;
                        $ressql = "";
                        $descresultado = "";
                        $concat = "";
                        $descresultadoarrayPHP = "";
                        $descresultadojson = "";

                        if ($windowschedule_stateid == constants::$CRIAR) {

                            if ($criou_obj_conexaoBD == 0) {

                                $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                                if ($resultado < 1) {
                                    $conteudosaida["resultado"] = '0';
                                    $conteudosaida["descresultado"] = $message;
                                    echo json_encode($conteudosaida);
                                    return;
                                } else {
                                    $criou_obj_conexaoBD = 1;
                                }
                            }

                            $array_params_sql = null;
                            $array_params_sql = array($ws_partitionperiodstart, $ws_windowdurationseconds, $ws_windowidentifier, $ws_windowstartseconds, $ws_coreidentifier, $partitionschedule_id[$i], $ws_idpartitionconfiguration, $idautenticacao);

                            $retorno = GconexaoBD::executar_sql(
                                $objdb,
                                "cria_windowschedule",
                                $array_params_sql,
                                $ressql,
                                $descresultado,
                                $concat,
                                $descresultadoarrayPHP,
                                $descresultadojson
                            );

                            if ($retorno > 0) {
                                $alterou = 1;
                                $objectoconfiguration['partitionschedule_obj'][$i]["windowschedule_obj"][$j]["id"] = intval($ressql);
                                //Segue para a próxima etapa
                            } else {
                                $conteudosaida["resultado"] = '0';
                                $conteudosaida["descresultado"] = $descresultado;
                                echo json_encode($conteudosaida);
                                return;
                            }
                        }

                        $indicepartition = -1;
                        $retorno = 0;
                        $array_params_sql = null;
                        $ressql = "";
                        $descresultado = "";
                        $concat = "";
                        $descresultadoarrayPHP = "";
                        $descresultadojson = "";

                        if ($windowschedule_stateid == constants::$APAGAR) {

                            $indicepartition = valida_campos_form_gen::devolve_indice_array_partition($ws_idpartitionconfiguration, $objectoconfiguration['partitions_obj']);

                            if ($indicepartition < 0) {
                                $conteudosaida["resultado"] = '0';
                                $conteudosaida["descresultado"] = "Não foi possível identificar a partition!...";
                                echo json_encode($conteudosaida);
                                return;
                            }

                            if ($partitionschedule_stateid[$i] != constants::$APAGAR && $objectoconfiguration['partitions_obj'][$indicepartition]["stateid"] != constants::$APAGAR) {

                                if ($criou_obj_conexaoBD == 0) {

                                    $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
                                    if ($resultado < 1) {
                                        $conteudosaida["resultado"] = '0';
                                        $conteudosaida["descresultado"] = $message;
                                        echo json_encode($conteudosaida);
                                        return;
                                    } else {
                                        $criou_obj_conexaoBD = 1;
                                    }
                                }

                                $array_params_sql = array($ws_id, $idautenticacao);

                                $retorno = GconexaoBD::executar_sql(
                                    $objdb,
                                    "delete_windowschedule",
                                    $array_params_sql,
                                    $ressql,
                                    $descresultado,
                                    $concat,
                                    $descresultadoarrayPHP,
                                    $descresultadojson
                                );

                                if ($retorno > 0) {
                                    $alterou = 1;
                                    //Segue para a próxima etapa
                                } else {
                                    $conteudosaida["resultado"] = '0';
                                    $conteudosaida["descresultado"] = $descresultado;
                                    echo json_encode($conteudosaida);
                                    return;
                                }
                            }
                        }
                    } //for windowschedule
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Não enviou windowschedule para inserir, alterar ou apagar!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            } //for partitionschedule
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Não enviou partitionschedule para inserir, alterar ou apagar!...";
            echo json_encode($conteudosaida);
            return;
        }
    }


    if ($alterou == 1) {

        $array_params_sql_pesq = array(
            $objectoconfiguration['id'],
            $idautenticacao
        );

        $retorno_pesq = 0;
        $ressql_pesq = "";
        $xml_pesq = "";
        $outXML_pesq = "";
        $descresultado_pesq = "";

        $retorno_pesq = GconexaoBD::executar_sql(
            $objdb,
            "geraxml_withdesc",
            $array_params_sql_pesq,
            $ressql_pesq,
            $descresultado_pesq,
            $concat_pesq,
            $descresultadoarrayPHP_pesq,
            $descresultadojson_pesq
        );

        if ($retorno_pesq == 1) {
            if ($ressql_pesq == "1") {
                $conteudosaida["resultado"] = '1';
                $conteudosaida["descresultado"] =  "Configuração alterada com sucesso e atualizada localmente!...";

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
                $outXML_pesq = $descresultadoarrayPHP_pesq[$i]["oxml"];
                $xml_pesq = new DOMDocument();
                $xml_pesq->preserveWhiteSpace = false;
                $xml_pesq->formatOutput = true;
                $xml_pesq->loadXML($outXML_pesq);
                $outXML_pesq = $xml_pesq->saveXML();
                $descresultadoarrayPHP_pesq[$i]["oxml"] = $outXML_pesq;

                //Valida XML----------------------------------------
                $parser = xml_parser_create();
                if (!xml_parse($parser, $outXML_pesq, true)) {
                    $conteudosaida["resultado"] =  'ERRO: Linha nº ' . xml_get_current_line_number($parser) . " Aqui: " . xml_error_string(xml_get_error_code($parser));
                    xml_parser_free($parser);
                    GconexaoBD::fechaconexaoBD($objdb, $message);

                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $message;
                    echo json_encode($conteudosaida);

                    return;
                }
                xml_parser_free($parser);

                $configuration_pesq = new SimpleXMLElement($outXML_pesq);
                $archname_pesq = strval($configuration_pesq->archname);
                $arinc653module_pesq = $configuration_pesq->arinc653module;
                $modulename_pesq = strval($arinc653module_pesq->modulename);
                $xmlnsxsi_pesq = strval($arinc653module_pesq->xmlnsxsi);

                $ihtmltemp = $ihtmltemp . "<tr id=\"idtr" . $i . "\" " . " data-id = \"" . $i . "\" onclick=\"seleciona_linha_listaon_configura(this)\">";
                $ihtmltemp = $ihtmltemp . "<td>" . $archname_pesq . "</td>";
                $ihtmltemp = $ihtmltemp . "<td>" . $modulename_pesq . "</td>";
                $ihtmltemp = $ihtmltemp . "<td>" . $xmlnsxsi_pesq . "</td>";
                $ihtmltemp = $ihtmltemp . "</tr>";
                $ihtmltemp = $ihtmltemp . "</tbody></table>";
                $conteudosaida["inhtml"] = $ihtmltemp;
                $conteudosaida["dados"] = json_encode($descresultadoarrayPHP_pesq);
                echo json_encode($conteudosaida);
            }
        }
    }
    if ($criou_obj_conexaoBD) GconexaoBD::fechaconexaoBD($objdb, $message);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["inhtml"] = "";
    $conteudosaida["descresultado"] = 'Não foram enviados dados para efetuar alterações na configuração!...';
    echo json_encode($conteudosaida);
}
