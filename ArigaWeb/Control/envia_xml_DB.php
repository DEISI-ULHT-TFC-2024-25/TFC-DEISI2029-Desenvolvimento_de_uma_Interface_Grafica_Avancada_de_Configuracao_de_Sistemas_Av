<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/mensagens.php";
include_once "Control/lib/gestao_informacao.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
    'dados_dd_activo' =>  '',
    'dados_dd_total' =>  ''
);

if (isset($_POST["xml_config"])) {
    $xmlstr = $_POST["xml_config"];
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = "Ficheiro XML não foi recebido!...";
    echo json_encode($conteudosaida);
    return;
}

//Teste----------------------------------------
$idautenticacao = $_SESSION['IDAUTENTICACAO'];
// $idautenticacao = 1;

//Valida XML----------------------------------------
$parser = xml_parser_create();
if (!xml_parse($parser, $xmlstr, true)) {
    echo 'ERRO: Linha nº ' . xml_get_current_line_number($parser) . " Aqui: " . xml_error_string(xml_get_error_code($parser));
    xml_parser_free($parser);
    return;
}
xml_parser_free($parser);

$configuration = new SimpleXMLElement($xmlstr);

$configurationid = 0;
$temp = "";
$listaretornar;
$descresultadoarrayPHP;

$gestao_inf = null;
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

//Tabela configuration----------------------------------------
if (valida_campos_form_gen::valida_atrib_numero($configuration['id'], 'id', 'configuration', $mensagem) > 0) {
    $configurationid = intval($configuration['id']);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$archname = "";
$bare = 0;
$iddebugmonitor = 0;
$idfpu = 0;
$installrtos = false;
$posixrtems5 = false;
$rtems48i = false;
$rtems5 = false;
$idtargetboard = 0;
$idarchitecturetype = 0;

if (valida_campos_form_gen::valida_tag_texto($configuration->archname, 'archname', 'configuration', $mensagem) > 0) {
    $archname = strval($configuration->archname);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_boleano($configuration->bare, 'bare', 'configuration', $mensagem) > 0) {
    $bare = strval($configuration->bare);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$iddebugmonitordesc = "";
if (valida_campos_form_gen::valida_tag_texto($configuration->iddebugmonitor, 'iddebugmonitor', 'configuration', $mensagem) > 0) {
    $iddebugmonitordesc = strval($configuration->iddebugmonitor);
    if ($iddebugmonitordesc == "") {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não preencheu o valor para iddebugmonitor";
        echo json_encode($conteudosaida);
        return;
    } else {
        $iddebugmonitor = valida_campos_form_gen::obtem_id_from_desc_lista($desclistarrayPHP, 'DM', 'S', $iddebugmonitordesc);
        if ($iddebugmonitor == 0) {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Valor para iddebugmonitor não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
            echo json_encode($conteudosaida);
            return;
        }
    }
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$idfpudesc = "";
if (valida_campos_form_gen::valida_tag_texto($configuration->idfpu, 'idfpu', 'configuration', $mensagem) > 0) {
    $idfpudesc = strval($configuration->idfpu);
    if ($idfpudesc == "") {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não preencheu o valor para idfpu";
        echo json_encode($conteudosaida);
        return;
    } else {
        $idfpu = valida_campos_form_gen::obtem_id_from_desc_lista($desclistarrayPHP, 'STA', 'S', $idfpudesc);
        if ($idfpu == 0) {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Valor para idfpu não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
            echo json_encode($conteudosaida);
            return;
        }
    }
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_boleano($configuration->installrtos, 'installrtos', 'configuration', $mensagem) > 0) {
    $installrtos = strval($configuration->installrtos);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_boleano($configuration->posixrtems5, 'posixrtems5', 'configuration', $mensagem) > 0) {
    $posixrtems5 = strval($configuration->posixrtems5);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_boleano($configuration->rtems48i, 'rtems48i', 'configuration', $mensagem) > 0) {
    $rtems48i = strval($configuration->rtems48i);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_boleano($configuration->rtems5, 'rtems5', 'configuration', $mensagem) > 0) {
    $rtems5 = strval($configuration->rtems5);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$idtargetboarddesc = "";
if (valida_campos_form_gen::valida_tag_texto($configuration->idtargetboard, 'idtargetboard', 'configuration', $mensagem) > 0) {
    $idtargetboarddesc = strval($configuration->idtargetboard);
    if ($idtargetboarddesc == "") {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não preencheu o valor para idtargetboard";
        echo json_encode($conteudosaida);
        return;
    } else {
        $idtargetboard = valida_campos_form_gen::obtem_id_from_desc_lista($desclistarrayPHP, 'TB', 'S', $idtargetboarddesc);
        if ($idtargetboard == 0) {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Valor para idtargetboard não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
            echo json_encode($conteudosaida);
            return;
        }
    }
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$idarchitecturetypedesc = "";
if (valida_campos_form_gen::valida_tag_texto($configuration->idarchitecturetype, 'idarchitecturetype', 'configuration', $mensagem) > 0) {
    $idarchitecturetypedesc = strval($configuration->idarchitecturetype);
    if ($idarchitecturetypedesc == "") {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não preencheu o valor para idarchitecturetype";
        echo json_encode($conteudosaida);
        return;
    } else {
        $idarchitecturetype = valida_campos_form_gen::obtem_id_from_desc_lista($desclistarrayPHP, 'AN', 'S', $idarchitecturetypedesc);
        if ($idarchitecturetype == 0) {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Valor para idarchitecturetype não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
            echo json_encode($conteudosaida);
            return;
        }
    }
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
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

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$configurationidBD = 0;
$descresultado = "";

if ($configurationid > 0) {

    $array_params_sql = array($configurationid, $archname, $bare, $iddebugmonitor, $idfpu, $installrtos, $posixrtems5, $rtems48i, $rtems5, $idtargetboard, $idarchitecturetype, 'S', $idautenticacao);

    $retorno = GconexaoBD::executar_sql($objdb, "altera_configuration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno > 0) {
        //Segue para a próxima etapa
        $configurationidBD = intval($ressql);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
        return;
    }
} else {

    $array_params_sql = array($archname, $bare, $iddebugmonitor, $idfpu, $installrtos, $posixrtems5, $rtems48i, $rtems5, $idtargetboard, $idarchitecturetype, $idautenticacao);

    $retorno = GconexaoBD::executar_sql($objdb, "cria_configuration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno > 0) {
        //Segue para a próxima etapa
        $configurationidBD = intval($ressql);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
        return;
    }
}

//Tabela arinc653module----------------------------------------
$arinc653module = $configuration->arinc653module;

if (!isset($arinc653module)) {

    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = 'arinc653module não existe. Foi criado\alterado o configuration na BD!...';
    echo json_encode($conteudosaida);
    return;
};

if (valida_campos_form_gen::valida_atrib_numero($arinc653module['id'], 'id', 'arinc653moduleid', $mensagem) > 0) {
    $arinc653moduleid = intval($arinc653module['id']);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

$modulename;
$xmlnsxsi;
$idconfiguration_p;

if (valida_campos_form_gen::valida_tag_texto($arinc653module->modulename, 'modulename', 'arinc653module', $mensagem) > 0) {
    $modulename = strval($arinc653module->modulename);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_texto($arinc653module->xmlnsxsi, 'xmlnsxsi', 'arinc653module', $mensagem) > 0) {
    $xmlnsxsi = strval($arinc653module->xmlnsxsi);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_atrib_numero($arinc653module['idconfiguration'], 'idconfiguration', 'arinc653module', $mensagem) > 0) {
    $idconfiguration_p = intval($arinc653module['idconfiguration']);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}


//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$arinc653moduleidBD = 0;
$descresultado = "";

if ($arinc653moduleid > 0) {
    if ($idconfiguration_p > 0 && $idconfiguration_p == $configurationidBD) {

        $array_params_sql = array($arinc653moduleid, $modulename, $xmlnsxsi, $configurationidBD, 'S', $idautenticacao);
        $retorno = GconexaoBD::executar_sql($objdb, "altera_arinc653module", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $arinc653moduleidBD = intval($ressql);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado;
            echo json_encode($conteudosaida);
            return;
        }
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Id configuration não fornecido, quando existe um Id de arinc653module!...";
        echo json_encode($conteudosaida);
        return;
    }
} else {

    $array_params_sql = array($modulename, $xmlnsxsi, $configurationidBD, $idautenticacao);

    $retorno = GconexaoBD::executar_sql($objdb, "cria_arinc653module", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);


    if ($retorno > 0) {
        //Segue para a próxima etapa
        $arinc653moduleidBD = intval($ressql);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
        return;
    }
}

//Tabela airconfiguration----------------------------------------
$airconfiguration = $configuration->arinc653module->airconfiguration;
$requiredcores;
$tickspersecond;
$idarinc653module_p;
$paracontinuarprocesso_airconfiguration = 1;
$mensagem = "<br>Foi criado\alterado o configuration\arinc653module na BD.";
$mensagemtemp = "";

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$airconfigurationidBD = 0;
$descresultado = "";

if (!isset($airconfiguration)) {

    $paracontinuarprocesso_airconfiguration = 0;
    $mensagem = "Aviso: airconfiguration não existe." . $mensagem;
};

if ($paracontinuarprocesso_airconfiguration == 1) {

    if (valida_campos_form_gen::valida_atrib_numero($airconfiguration['id'], 'id', 'airconfiguration', $mensagemtemp) > 0) {
        $airconfigurationid = intval($airconfiguration['id']);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_numero($airconfiguration->requiredcores, 'requiredcores', 'airconfiguration', $mensagemtemp) > 0) {
        $requiredcores =  intval($airconfiguration->requiredcores);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_numero($airconfiguration->tickspersecond, 'tickspersecond', 'airconfiguration', $mensagemtemp) > 0) {
        $tickspersecond =  intval($airconfiguration->tickspersecond);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_atrib_numero($airconfiguration['idarinc653module'], 'idarinc653module', 'airconfiguration', $mensagemtemp) > 0) {
        $idarinc653module_p = intval($airconfiguration['idarinc653module']);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if ($airconfigurationid > 0) {
        if ($idarinc653module_p > 0 && $idarinc653module_p == $arinc653moduleidBD) {

            $array_params_sql = array($airconfigurationid, $requiredcores, $tickspersecond, $arinc653moduleidBD, 'S', $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "altera_airconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $airconfigurationidBD = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Id arinc653module não fornecido, quando existe um Id de airconfiguration!..." . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }
    } else {

        $array_params_sql = array($requiredcores, $tickspersecond, $arinc653moduleidBD, $idautenticacao);

        $retorno = GconexaoBD::executar_sql($objdb, "cria_airconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $airconfigurationidBD = intval($ressql);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }
    }
}

//Tabela partitions----------------------------------------

$partitions = $configuration->arinc653module->partitions;
$paracontinuarprocesso_partitions = 1;
$mensagemtemp = "";

$criticality = array();
$criticalitydesc = array();
$partitionname = array();
$partitionidentifier = array();
$systempartition = array();
$entrypoint = array();
$idarinc653module_p = array();
$partitionsidBD = array();
//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$partitionsid = array();
$numparticoes = 0;
$partitionconfiguration = array();
$partitionconfiguration_memory = array();
$descresultado = "";

if (!isset($partitions)) {

    $paracontinuarprocesso_partitions = 0;
    $mensagem .= "Aviso: partitions não existe.\n";
};

if ($paracontinuarprocesso_partitions == 1) {

    $numparticoes = count($partitions);

    if ($numparticoes < 1) {

        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não foi possível ler as partições existentes." . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    for ($i = 0; $i < $numparticoes; $i++) {
        $partitionconfiguration[$i] = $partitions[$i]->partitionconfiguration;
        $partitionconfiguration_memory[$i] = $partitions[$i]->partitionconfiguration->memory;
        $partitionsidBD[$i] = 0;
    }

    for ($i = 0; $i < $numparticoes; $i++) {

        $array_params_sql = null;
        $descresultado = "";

        if (valida_campos_form_gen::valida_atrib_numero($partitions[$i]['id'], 'id', 'partitions' . $i, $mensagemtemp) > 0) {
            $partitionsid[$i] = intval($partitions[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        $criticalitydesc[$i] = "";
        if (valida_campos_form_gen::valida_tag_texto($partitions[$i]->criticality, 'criticality', 'partitions' . $i, $mensagemtemp) > 0) {

            $criticalitydesc[$i] = strval($partitions[$i]->criticality);

            if ($criticalitydesc[$i] == "") {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Não preencheu o valor para partition(" . $i . ")->criticality";
                echo json_encode($conteudosaida);
                return;
            } else {
                $criticality[$i] = valida_campos_form_gen::obtem_id_from_desc_lista($desclistarrayPHP, 'CRY', 'S', $criticalitydesc[$i]);

                if ($criticality[$i] == 0) {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Valor para partition(" . $i . ")->criticality não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] =  $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitions[$i]->partitionname, 'partitionname', 'partitions' . $i, $mensagemtemp) > 0) {
            $partitionname[$i] =  strval($partitions[$i]->partitionname);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($partitions[$i]->partitionidentifier, 'partitionidentifier', 'partitions' . $i, $mensagemtemp) > 0) {
            $partitionidentifier[$i] =  intval($partitions[$i]->partitionidentifier);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_boleano($partitions[$i]->systempartition, 'systempartition', 'partitions' . $i, $mensagemtemp) > 0) {
            $systempartition[$i] =  strval($partitions[$i]->systempartition);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitions[$i]->entrypoint, 'entrypoint', 'partitions' . $i, $mensagemtemp) > 0) {
            $entrypoint[$i] =  strval($partitions[$i]->entrypoint);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_atrib_numero($partitions[$i]['idarinc653module'], 'idarinc653module', 'partitions' . $i, $mensagemtemp) > 0) {
            $idarinc653module_p[$i] = intval($partitions[$i]['idarinc653module']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if ($partitionsid[$i] > 0) {
            if ($idarinc653module_p[$i] > 0 && $idarinc653module_p[$i] == $arinc653moduleidBD) {

                $array_params_sql = array($partitionsid[$i], $criticality[$i], $partitionname[$i], $partitionidentifier[$i], $systempartition[$i], $entrypoint[$i], $arinc653moduleidBD, 'S', $idautenticacao);

                $retorno = GconexaoBD::executar_sql($objdb, "altera_partitions", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $partitionsidBD[$i] = intval($ressql);
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $descresultado . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Id arinc653module não fornecido, quando existe um Id de partitions" . $i . "!..." . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {

            $array_params_sql = array($criticality[$i], $partitionname[$i], $partitionidentifier[$i], $systempartition[$i], $entrypoint[$i], $arinc653moduleidBD, $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "cria_partitions", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $partitionsidBD[$i] = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//Tabela partitionconfiguration----------------------------------------
$numpartitionconfiguration = count($partitionconfiguration);
$paracontinuarprocesso_partitionconfiguration = array();
$partitionconfigurationid;
$partitionconfigurationidBD = array();
$cache;
$cores;
$libs;
$personality;
$devices;
$permissions;
$idpartition_p;

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$descresultado = "";

for ($i = 0; $i < $numpartitionconfiguration; $i++) {
    $paracontinuarprocesso_partitionconfiguration[$i] = 1;
}

for ($i = 0; $i < $numpartitionconfiguration; $i++) {
    if (!isset($partitionconfiguration[$i])) {

        $paracontinuarprocesso_partitionconfiguration[$i] = 0;
        $mensagem .= "Aviso: partitionconfiguration" . $i . "não existe.\n";
    };
}

for ($i = 0; $i < $numpartitionconfiguration; $i++) {

    if ($paracontinuarprocesso_partitionconfiguration[$i] == 1) {

        $array_params_sql = null;
        $descresultado = "";
        $partitionconfigurationidBD[$i] = 0;

        if (valida_campos_form_gen::valida_atrib_numero($partitionconfiguration[$i]['id'], 'id', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $partitionconfigurationid = intval($partitionconfiguration[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->cache, 'cache', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $cache =  strval($partitionconfiguration[$i]->cache);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($partitionconfiguration[$i]->cores, 'cores', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $cores =  intval($partitionconfiguration[$i]->cores);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        $libsdesc = "";
        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->libs, 'libs', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {

            $libsdesc = strval($partitionconfiguration[$i]->libs);

            if ($libsdesc == "") {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Não preencheu o valor para partitionconfiguration(" . $i . ")->libs";
                echo json_encode($conteudosaida);
                return;
            } else {
                $libs = valida_campos_form_gen::obtem_variosid_from_desc_lista($desclistarrayPHP, 'LIB', 'S', $libsdesc);

                if ($libs == "") {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Valor para partitionconfiguration(" . $i . ")->libs não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] =  $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        $personalitydesc = "";
        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->personality, 'personality', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {

            $personalitydesc = strval($partitionconfiguration[$i]->personality);

            if ($personalitydesc == "") {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Não preencheu o valor para partitionconfiguration(" . $i . ")->personality";
                echo json_encode($conteudosaida);
                return;
            } else {
                $personality = valida_campos_form_gen::obtem_variosid_from_desc_lista($desclistarrayPHP, 'PER', 'S', $personalitydesc);

                if ($personality == "") {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Valor para partitionconfiguration(" . $i . ")->personality não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] =  $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }


        $devicesdesc = "";
        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->devices, 'devices', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {

            $devicesdesc = strval($partitionconfiguration[$i]->devices);

            if ($devicesdesc == "") {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Não preencheu o valor para partitionconfiguration(" . $i . ")->devices";
                echo json_encode($conteudosaida);
                return;
            } else {
                $devices = valida_campos_form_gen::obtem_variosid_from_desc_lista($desclistarrayPHP, 'DEV', 'S', $devicesdesc);

                if ($devices == "") {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Valor para partitionconfiguration(" . $i . ")->devices não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] =  $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        $permissionsdesc = "";
        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->permissions, 'permissions', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {

            $permissionsdesc = strval($partitionconfiguration[$i]->permissions);

            if ($permissionsdesc == "") {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Não preencheu o valor para partitionconfiguration(" . $i . ")->permissions";
                echo json_encode($conteudosaida);
                return;
            } else {
                $permissions = valida_campos_form_gen::obtem_variosid_from_desc_lista($desclistarrayPHP, 'PMY', 'S', $permissionsdesc);

                if ($permissions == "") {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Valor para partitionconfiguration(" . $i . ")->permissions não se encontra na tabela geral. Deve atualizá-la antes do enviar na configuração!...";
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] =  $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_atrib_numero($partitionconfiguration[$i]['idpartition'], 'idpartition', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $idpartition_p = intval($partitionconfiguration[$i]['idpartition']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if ($partitionconfigurationid > 0) {
            if ($idpartition_p > 0 && $idpartition_p == $partitionsidBD[$i]) {
                //if ($idpartition_p > 0) {

                $array_params_sql = array($partitionconfigurationid, $cache, $cores, $libs, $personality, $devices, $permissions, $partitionsidBD[$i], 'S', $idautenticacao);

                $retorno = GconexaoBD::executar_sql($objdb, "altera_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $partitionconfigurationidBD[$i] = intval($ressql);
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $descresultado . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Id partitions não fornecido, quando existe um Id de partitionconfiguration" . $i . "!..." . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {

            $array_params_sql = array($cache, $cores, $libs, $personality, $devices, $permissions, $partitionsidBD[$i], $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "cria_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $partitionconfigurationidBD[$i] = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//Tabela memory----------------------------------------
$numpartitionconfiguration_memory = count($partitionconfiguration_memory);
$paracontinuarprocesso_partitionconfiguration_memory = array();
$memoryid;
$memoryidBD = array();
$size;
$idpartitionconfiguration_p;

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$descresultado = "";

for ($i = 0; $i < $numpartitionconfiguration_memory; $i++) {
    $paracontinuarprocesso_partitionconfiguration_memory[$i] = 1;
}

for ($i = 0; $i < $numpartitionconfiguration_memory; $i++) {
    if (!isset($partitionconfiguration_memory[$i])) {

        $paracontinuarprocesso_partitionconfiguration_memory[$i] = 0;
        $mensagem .= "Aviso: memory" . $i . "não existe.\n";
    };
}

for ($i = 0; $i < $numpartitionconfiguration_memory; $i++) {

    if ($paracontinuarprocesso_partitionconfiguration_memory[$i] == 1) {

        $array_params_sql = null;
        $descresultado = "";
        $memoryidBD[$i] = 0;

        if (valida_campos_form_gen::valida_atrib_numero($partitionconfiguration_memory[$i]['id'], 'id', 'memory' . $i, $mensagemtemp) > 0) {
            $memoryid = intval($partitionconfiguration_memory[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration_memory[$i]->size, 'size', 'memory' . $i, $mensagemtemp) > 0) {
            $size =  strval($partitionconfiguration_memory[$i]->size);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_atrib_numero($partitionconfiguration_memory[$i]['idpartitionconfiguration'], 'idpartition', 'memory' . $i, $mensagemtemp) > 0) {
            $idpartitionconfiguration_p = intval($partitionconfiguration_memory[$i]['idpartitionconfiguration']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if ($memoryid > 0) {
            if ($idpartitionconfiguration_p > 0 && $idpartitionconfiguration_p == $partitionconfigurationidBD[$i]) {
                //if ($idpartitionconfiguration_p > 0) {

                $array_params_sql = array($memoryid, $size, $partitionconfigurationidBD[$i], 'S', $idautenticacao);

                $retorno = GconexaoBD::executar_sql($objdb, "altera_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $memoryidBD[$i] = intval($ressql);
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $descresultado . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Id partitionconfiguration não fornecido, quando existe um Id de memory" . $i . "!..." . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {

            $array_params_sql = array($size, $partitionconfigurationidBD[$i], $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "cria_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $memoryidBD[$i] = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//Tabela moduleschedule----------------------------------------
$moduleschedule = $configuration->arinc653module->moduleschedule;

$initialmoduleschedule;
$majorframeseconds;
$scheduleidentifier;
$schedulename;
$idarinc653module_p = 0;
$paracontinuarprocesso_moduleschedule = 1;
$mensagemtemp = "";
$array_params_sql = null;
$descresultado = "";

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$modulescheduleidBD = 0;

if (!isset($moduleschedule)) {
    $paracontinuarprocesso_moduleschedule = 0;
    $mensagem = "Aviso: moduleschedule não existe." . $mensagem;
};

if ($paracontinuarprocesso_moduleschedule == 1) {

    if (valida_campos_form_gen::valida_atrib_numero($moduleschedule['id'], 'id', 'moduleschedule', $mensagemtemp) > 0) {
        $modulescheduleid = intval($moduleschedule['id']);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_boleano($moduleschedule->initialmoduleschedule, 'initialmoduleschedule', 'moduleschedule', $mensagem) > 0) {
        $initialmoduleschedule = strval($moduleschedule->initialmoduleschedule);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_numero($moduleschedule->majorframeseconds, 'majorframeseconds', 'moduleschedule', $mensagemtemp) > 0) {
        $majorframeseconds =  strval($moduleschedule->majorframeseconds);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_numero($moduleschedule->scheduleidentifier, 'scheduleidentifier', 'moduleschedule', $mensagemtemp) > 0) {
        $scheduleidentifier =  intval($moduleschedule->scheduleidentifier);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_tag_texto($moduleschedule->schedulename, 'schedulename', 'moduleschedule' . $i, $mensagemtemp) > 0) {
        $schedulename =  strval($moduleschedule->schedulename);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if (valida_campos_form_gen::valida_atrib_numero($moduleschedule['idarinc653module'], 'idarinc653module', 'moduleschedule', $mensagemtemp) > 0) {
        $idarinc653module_p = intval($moduleschedule['idarinc653module']);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    if ($modulescheduleid > 0) {
        if ($idarinc653module_p > 0 && $idarinc653module_p == $arinc653moduleidBD) {

            $array_params_sql = array($modulescheduleid, $initialmoduleschedule, $majorframeseconds, $scheduleidentifier, $schedulename, $arinc653moduleidBD, 'S', $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "altera_moduleschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $modulescheduleidBD = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = "Id arinc653module não fornecido, quando existe um Id de moduleschedule!..." . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }
    } else {

        $array_params_sql = array($initialmoduleschedule, $majorframeseconds, $scheduleidentifier, $schedulename, $arinc653moduleidBD, $idautenticacao);

        $retorno = GconexaoBD::executar_sql($objdb, "cria_moduleschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $modulescheduleidBD = intval($ressql);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $descresultado . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }
    }
}

//Tabela partitionschedule----------------------------------------

$partitionschedule = $configuration->arinc653module->moduleschedule->partitionschedule;
$paracontinuarprocesso_partitionschedule = 1;
$mensagemtemp = "";
$perioddurationseconds = array();
$periodseconds = array();
$idmoduleschedule_p = array();
$partitionscheduleidBD = array();
//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$partitionscheduleid = array();
$numpartitionschedule = 0;
$windowschedule = array();
$windowconfiguration = array();
$array_params_sql = null;
$descresultado = "";

if (!isset($partitionschedule)) {

    $paracontinuarprocesso_partitionschedule = 0;
    $mensagem .= "Aviso: partitionschedule não existe.\n";
};

if ($paracontinuarprocesso_partitionschedule == 1) {

    $numpartitionschedule = count($partitionschedule);

    if ($numpartitionschedule < 1) {

        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não foi possível ler o número de partitionschedule existentes." . $mensagem;
        echo json_encode($conteudosaida);
        return;
    }

    for ($i = 0; $i < $numpartitionschedule; $i++) {
        $windowschedulearray[$i] = $partitionschedule[$i]->windowschedule;
        $windowconfiguration[$i] = $partitionschedule[$i]->windowconfiguration;
    }

    for ($i = 0; $i < $numpartitionschedule; $i++) {

        $array_params_sql = null;
        $descresultado = "";
        $partitionscheduleidBD[$i] = 0;

        if (valida_campos_form_gen::valida_atrib_numero($partitionschedule[$i]['id'], 'id', 'partitionschedule' . $i, $mensagemtemp) > 0) {
            $partitionscheduleid[$i] = intval($partitionschedule[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($partitionschedule[$i]->perioddurationseconds, 'perioddurationseconds', 'partitionschedule' . $i, $mensagemtemp) > 0) {
            $perioddurationseconds[$i] =  strval($partitionschedule[$i]->perioddurationseconds);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($partitionschedule[$i]->periodseconds, 'periodseconds', 'partitionschedule' . $i, $mensagemtemp) > 0) {
            $periodseconds[$i] =  strval($partitionschedule[$i]->periodseconds);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_atrib_numero($partitionschedule[$i]['idmoduleschedule'], 'idmoduleschedule', 'partitionschedule' . $i, $mensagemtemp) > 0) {
            $idmoduleschedule_p[$i] = intval($partitionschedule[$i]['idmoduleschedule']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if ($partitionscheduleid[$i] > 0) {
            if ($idmoduleschedule_p[$i] > 0 && $idmoduleschedule_p[$i] == $modulescheduleidBD) {

                $array_params_sql = array($partitionscheduleid[$i], $perioddurationseconds[$i], $periodseconds[$i], $modulescheduleidBD, 'S', $idautenticacao);

                $retorno = GconexaoBD::executar_sql($objdb, "altera_partitionschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $partitionscheduleidBD[$i] = intval($ressql);
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $descresultado . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Id moduloschedule não fornecido, quando existe um Id de partitionschedule" . $i . "!..." . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {

            $array_params_sql = array($perioddurationseconds[$i], $periodseconds[$i], $modulescheduleidBD, $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "cria_partitionschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $partitionscheduleidBD[$i] = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//Tabela windowconfiguration----------------------------------------
$numwindowconfiguration = count($windowconfiguration);
$paracontinuarprocesso_windowconfiguration = array();
$windowconfigurationid;
$windowconfigurationidBD = array();
$windowidentifier;
$cores;
$idpartitionschedule_p;

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$descresultado = "";

for ($i = 0; $i < $numwindowconfiguration; $i++) {
    $paracontinuarprocesso_windowconfiguration[$i] = 1;
}

for ($i = 0; $i < $numwindowconfiguration; $i++) {
    if (!isset($windowconfiguration[$i])) {

        $paracontinuarprocesso_windowconfiguration[$i] = 0;
        $mensagem .= "Aviso: windowconfiguration" . $i . "não existe.\n";
    };
}

for ($i = 0; $i < $numwindowconfiguration; $i++) {

    if ($paracontinuarprocesso_windowconfiguration[$i] == 1) {

        $array_params_sql = null;
        $descresultado = "";
        $windowconfigurationidBD[$i] = 0;

        if (valida_campos_form_gen::valida_atrib_numero($windowconfiguration[$i]['id'], 'id', 'windowconfiguration' . $i, $mensagemtemp) > 0) {
            $windowconfigurationid = intval($windowconfiguration[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($windowconfiguration[$i]->windowidentifier, 'windowidentifier', 'windowconfiguration' . $i, $mensagemtemp) > 0) {
            $windowidentifier =  intval($windowconfiguration[$i]->windowidentifier);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }


        if (valida_campos_form_gen::valida_tag_numero($windowconfiguration[$i]->cores, 'cores', 'windowconfiguration' . $i, $mensagemtemp) > 0) {
            $cores =  intval($windowconfiguration[$i]->cores);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_atrib_numero($windowconfiguration[$i]['idpartitionschedule'], 'idpartitionschedule', 'windowconfiguration' . $i, $mensagemtemp) > 0) {
            $idpartitionschedule_p = intval($windowconfiguration[$i]['idpartitionschedule']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if ($windowconfigurationid > 0) {

            if ($idpartitionschedule_p > 0 && $idpartitionschedule_p == $partitionscheduleidBD[$i]) {
                //if ($idpartitionschedule_p > 0) {

                $array_params_sql = array($windowconfigurationid, $windowidentifier, $cores, $partitionscheduleidBD[$i], 'S', $idautenticacao);

                $retorno = GconexaoBD::executar_sql($objdb, "altera_windowconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $windowconfigurationidBD[$i] = intval($ressql);
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = $descresultado . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = "Id partitionschedule não fornecido, quando existe um Id de windowconfiguration" . $i . "!..." . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        } else {

            $array_params_sql = array($windowidentifier, $cores, $partitionscheduleidBD[$i], $idautenticacao);

            $retorno = GconexaoBD::executar_sql($objdb, "cria_windowconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $windowconfigurationidBD[$i] = intval($ressql);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//Tabela windowschedule----------------------------------------
$numwindowschedule_array_por_partitionschedule = 0;
$numwindowschedule_por_partitionschedule = array();
$paracontinuarprocesso_windowschedule = array();

$numwindowschedule_array_por_partitionschedule = count($windowschedulearray);

for ($i = 0; $i < $numwindowschedule_array_por_partitionschedule; $i++) {
    $paracontinuarprocesso_windowschedule[$i] = 1;
}

for ($i = 0; $i < $numwindowschedule_array_por_partitionschedule; $i++) {
    if (!isset($windowschedulearray[$i])) {
        $paracontinuarprocesso_windowschedule[$i] = 0;
        $mensagem .= "Aviso: windowschedule" . $i . "não existe.\n";
    } else {
        $numwindowschedule_por_partitionschedule[$i] = count($windowschedulearray[$i]);
    };
}

$mensagemtemp = "";

$partitionperiodstart;
$windowdurationseconds;
$windowidentifier;
$windowstartseconds;
$coreidentifier;
$idpartitionschedule_p;
$idpartitionconfiguration_p;
$windowschedule;
$windowscheduleidBD = array();
$windowscheduleid = 0;

//testes
//$retorno = 1;
$retorno = 0;
$ressql = "";
$array_params_sql = null;
$descresultado = "";



for ($j = 0; $j < $numwindowschedule_array_por_partitionschedule; $j++) {

    if ($paracontinuarprocesso_windowschedule[$j] == 1) {

        $windowschedule = $windowschedulearray[$j];

        for ($i = 0; $i < $numwindowschedule_por_partitionschedule[$j]; $i++) {

            $array_params_sql = null;
            $descresultado = "";
            $windowscheduleidBD[$i] = 0;

            if (valida_campos_form_gen::valida_atrib_numero($windowschedule[$i]['id'], 'id', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $windowscheduleid = intval($windowschedule[$i]['id']);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_tag_boleano($windowschedule[$i]->partitionperiodstart, 'partitionperiodstart', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $partitionperiodstart =  strval($windowschedule[$i]->partitionperiodstart);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_tag_numero($windowschedule[$i]->windowdurationseconds, 'windowdurationseconds', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $windowdurationseconds =  strval($windowschedule[$i]->windowdurationseconds);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_tag_numero($windowschedule[$i]->windowidentifier, 'windowidentifier', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $windowidentifier =  intval($windowschedule[$i]->windowidentifier);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_tag_numero($windowschedule[$i]->windowstartseconds, 'windowstartseconds', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $windowstartseconds =  strval($windowschedule[$i]->windowstartseconds);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_tag_numero($windowschedule[$i]->coreidentifier, 'coreidentifier', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $coreidentifier =  intval($windowschedule[$i]->coreidentifier);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_atrib_numero($windowschedule[$i]['idpartitionschedule'], 'idpartitionschedule', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $idpartitionschedule_p = intval($windowschedule[$i]['idpartitionschedule']);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if (valida_campos_form_gen::valida_atrib_numero($windowschedule[$i]['idpartitionconfiguration'], 'idpartitionconfiguration', 'windowschedule' . $i, $mensagemtemp) > 0) {
                $idpartitionconfiguration_p = intval($windowschedule[$i]['idpartitionconfiguration']);
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }

            if ($windowscheduleid > 0) {

                if ($idpartitionschedule_p > 0 && $idpartitionconfiguration_p > 0 && $idpartitionschedule_p == $partitionscheduleidBD[$j]) {
                    //if ($idpartitionschedule_p > 0 && $idpartitionconfiguration_p > 0) {

                    $array_params_sql = array($windowscheduleid, $partitionperiodstart, $windowdurationseconds, $windowidentifier, $windowstartseconds, $coreidentifier, $partitionscheduleidBD[$j], $idpartitionconfiguration_p, 'S', $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "altera_windowschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $windowscheduleidBD[$i] = intval($ressql);
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado . $mensagem;
                        echo json_encode($conteudosaida);
                        return;
                    }
                } else {
                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Id partitionschedule não fornecido, quando existe um Id de windowschedule" . $i . "!..." . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            } else {
                if ($idpartitionconfiguration_p > 0) {

                    if ($numpartitionconfiguration < $idpartitionconfiguration_p) {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = "O indice de idpartitionconfiguration temporário inserido no XML não pode ser inferior a 1 ou superior ao número de partições!...)";
                        echo json_encode($conteudosaida);
                        return;
                    }

                    $array_params_sql = array($partitionperiodstart, $windowdurationseconds, $windowidentifier, $windowstartseconds, $coreidentifier, $partitionscheduleidBD[$j], $partitionconfigurationidBD[$idpartitionconfiguration_p - 1], $idautenticacao);

                    $retorno = GconexaoBD::executar_sql($objdb, "cria_windowschedule", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                    if ($retorno > 0) {
                        //Segue para a próxima etapa
                        $windowscheduleidBD[$i] = intval($ressql);
                    } else {
                        $conteudosaida["resultado"] = '0';
                        $conteudosaida["descresultado"] = $descresultado . $mensagem;
                        echo json_encode($conteudosaida);
                        return;
                    }
                } else {

                    $conteudosaida["resultado"] = '0';
                    $conteudosaida["descresultado"] = "Id partitionconfiguration não fornecido, quando existe um Id de windowschedule" . $i . "!..." . $mensagem;
                    echo json_encode($conteudosaida);
                    return;
                }
            }
        }
    }
}

// $conteudosaida["resultado"] = '0';
// $conteudosaida["descresultado"] = "Sucesso: " . implode(',', $array_params_sql) . " id: " . $windowscheduleidBD[0] . " resultadodesc: " . $descresultado;
// echo json_encode($conteudosaida);
// return;

$codigo_tabela = "CONF";

if (isset($gestao_inf)) {

    $gestao_inf->inicializar_alterar_lista_gestaoair($objdb);
    $htmlopcoestotal = $gestao_inf->altera_opcoesdd_gestaoair($codigo_tabela, "N", $codigo_tabela);
    $htmlopcoes = $gestao_inf->altera_opcoesdd_gestaoair($codigo_tabela, "S", $codigo_tabela . "_A");

    $conteudosaida["dados_dd_activo"] = $htmlopcoes;
    $conteudosaida["dados_dd_total"] = $htmlopcoestotal;
    $_SESSION['GESTAO_INFORMACAO'] = serialize($gestao_inf);

    $conteudosaida["resultado"] = '1';
    $conteudosaida["descresultado"] = "Configuração inserida\alterada com sucesso!...Id de configuração: " .  $configurationidBD;
    echo json_encode($conteudosaida);
    return;
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = "Configuração inserida\alterada com sucesso!...Id de configuração: " .  $configurationidBD . " mas deu erro a atualizar a dropdown de configurações. carregue em CTRL-F5.";
    echo json_encode($conteudosaida);
    return;
}
