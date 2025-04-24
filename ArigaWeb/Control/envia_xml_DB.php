<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/mensagens.php";
include_once "Model/lib/GconexaoBD.php";

$conteudosaida = array(
    'resultado'    =>  '',
    'descresultado'  =>  '',
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

if (valida_campos_form_gen::valida_tag_numero($configuration->iddebugmonitor, 'iddebugmonitor', 'configuration', $mensagem) > 0) {
    $iddebugmonitor = intval($configuration->iddebugmonitor);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_numero($configuration->idfpu, 'idfpu', 'configuration', $mensagem) > 0) {
    $idfpu =  intval($configuration->idfpu);
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

if (valida_campos_form_gen::valida_tag_numero($configuration->idtargetboard, 'idtargetboard', 'configuration', $mensagem) > 0) {
    $idtargetboard =  intval($configuration->idtargetboard);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

if (valida_campos_form_gen::valida_tag_numero($configuration->idarchitecturetype, 'idarchitecturetype', 'configuration', $mensagem) > 0) {
    $idarchitecturetype =  intval($configuration->idarchitecturetype);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["descresultado"] = $mensagem;
    echo json_encode($conteudosaida);
    return;
}

// $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
// if ($resultado < 1) {
//     $conteudosaida["resultado"] = '0';
//     $conteudosaida["descresultado"] = $message;
//     echo json_encode($conteudosaida);
//     return;
// }

//testes
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;
$configurationidBD = 0;

if ($configurationid > 0) {

    $array_params_sql = array($configurationid, $archname, $bare, $iddebugmonitor, $idfpu, $installrtos, $posixrtems5, $rtems48i, $rtems5, $idtargetboard, $idarchitecturetype, $idautenticacao);
    //$retorno = GconexaoBD::executar_sql($objdb, "altera_configuration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno > 0) {
        //Segue para a próxima etapa
        $configurationidBD = $retorno;
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = $descresultado;
        echo json_encode($conteudosaida);
        return;
    }
} else {

    $array_params_sql = array($archname, $bare, $iddebugmonitor, $idfpu, $installrtos, $posixrtems5, $rtems48i, $rtems5, $idtargetboard, $idarchitecturetype, $idautenticacao);
    //$retorno = GconexaoBD::executar_sql($objdb, "cria_configuration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno > 0) {
        //Segue para a próxima etapa
        $configurationidBD = $retorno;
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
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;
$arinc653moduleidBD = 0;


if ($arinc653moduleid > 0) {
    if ($idconfiguration_p > 0 && $idconfiguration_p == $configurationidBD) {

        $array_params_sql = array($arinc653moduleid, $modulename, $xmlnsxsi, $configurationidBD, $idautenticacao);
        //$retorno = GconexaoBD::executar_sql($objdb, "altera_arinc653module", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $arinc653moduleidBD = $retorno;
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
    //$retorno = GconexaoBD::executar_sql($objdb, "cria_arinc653module", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);


    if ($retorno > 0) {
        //Segue para a próxima etapa
        $arinc653moduleidBD = $retorno;
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
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;
$airconfigurationidBD = 0;

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

            $array_params_sql = array($airconfigurationid, $requiredcores, $tickspersecond, $arinc653moduleidBD, $idautenticacao);
            //$retorno = GconexaoBD::executar_sql($objdb, "altera_airconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $airconfigurationidBD = $retorno;
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
        //$retorno = GconexaoBD::executar_sql($objdb, "cria_airconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno > 0) {
            //Segue para a próxima etapa
            $airconfigurationidBD = $retorno;
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
$partitionname = array();
$partitionidentifier = array();
$systempartition = array();
$entrypoint = array();
$idarinc653module_p = array();
$partitionsidBD = array();
//testes
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;
$partitionsid = array();
$numparticoes = 0;
$partitionconfiguration = array();
$partitionconfiguration_memory = array();

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
    }

    for ($i = 0; $i < $numparticoes; $i++) {

        if (valida_campos_form_gen::valida_atrib_numero($partitions[$i]['id'], 'id', 'partitions' . $i, $mensagemtemp) > 0) {
            $partitionsid[$i] = intval($partitions[$i]['id']);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_numero($partitions[$i]->criticality, 'criticality', 'partitions' . $i, $mensagemtemp) > 0) {
            $criticality[$i] =  intval($partitions[$i]->criticality);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
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

                $array_params_sql = array($partitionsid[$i], $criticality[$i], $partitionname[$i], $partitionidentifier[$i], $systempartition[$i], $entrypoint[$i], $arinc653moduleidBD, $idautenticacao);
                //$retorno = GconexaoBD::executar_sql($objdb, "altera_partitions", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $partitionsidBD[$i] = $retorno;
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
            //$retorno = GconexaoBD::executar_sql($objdb, "cria_partitions", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $partitionsidBD[$i] = $retorno;
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
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;

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

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->libs, 'libs', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $libs =  strval($partitionconfiguration[$i]->libs);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->personality, 'personality', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $personality =  strval($partitionconfiguration[$i]->personality);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->devices, 'devices', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $devices =  strval($partitionconfiguration[$i]->devices);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
            echo json_encode($conteudosaida);
            return;
        }

        if (valida_campos_form_gen::valida_tag_texto($partitionconfiguration[$i]->permissions, 'permissions', 'partitionconfiguration' . $i, $mensagemtemp) > 0) {
            $permissions =  strval($partitionconfiguration[$i]->permissions);
        } else {
            $conteudosaida["resultado"] = '0';
            $conteudosaida["descresultado"] = $mensagemtemp . $mensagem;
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
            //if ($idpartition_p > 0 && $idpartition_p == $partitionsidBD[$i]) {
            if ($idpartition_p > 0) {

                $array_params_sql = array($partitionconfigurationid, $cache, $cores, $libs, $personality, $devices, $permissions, $partitionsidBD[$i], $idautenticacao);
                //$retorno = GconexaoBD::executar_sql($objdb, "altera_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $partitionconfigurationidBD[$i] = $retorno;
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
            //$retorno = GconexaoBD::executar_sql($objdb, "cria_partitionconfiguration", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $partitionconfigurationidBD[$i] = $retorno;
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
$retorno = 1;
//$retorno = 0;
$ressql = "";
$array_params_sql = null;

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
            //if ($idpartitionconfiguration_p > 0 && $idpartitionconfiguration_p == $partitionconfigurationidBD[$i]) {
            if ($idpartitionconfiguration_p > 0) {

                $array_params_sql = array($memoryid, $size, $partitionconfigurationidBD[$i], $idautenticacao);
                //$retorno = GconexaoBD::executar_sql($objdb, "altera_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

                if ($retorno > 0) {
                    //Segue para a próxima etapa
                    $memoryidBD[$i] = $retorno;
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
            //$retorno = GconexaoBD::executar_sql($objdb, "cria_memory", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {
                //Segue para a próxima etapa
                $memoryidBD[$i] = $retorno;
            } else {
                $conteudosaida["resultado"] = '0';
                $conteudosaida["descresultado"] = $descresultado . $mensagem;
                echo json_encode($conteudosaida);
                return;
            }
        }
    }
}

//continua

$conteudosaida["resultado"] = '0';
$conteudosaida["descresultado"] = intval($numpartitionconfiguration_memory);
echo json_encode($conteudosaida);
return;
