<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$conteudosaida = array(
    'inhtml' => '',
    'resultado'    =>  '',
    'descresultado'  =>  ''
);

if (isset($_POST["vista"])) {

    $vista = "";
    $vista = $_POST["vista"];

    $include_path = ini_get('include_path');
    $include_path_array = explode(";", $include_path);

    $numpath = count($include_path_array);

    if ($numpath < 1) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = "Não encontrou o caminho base!...";
        echo json_encode($conteudosaida);
        return;
    }

    $existe = 0;

    for ($i = 0; $i < $numpath; $i++) {
        if ($existe == 0) {
            if (file_exists($include_path_array[$i] . "/View/" . $vista)) {
                $existe = 1;
            }
        }
    }

    if ($existe == 0) {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["inhtml"] = "";
        $conteudosaida["descresultado"] = "A vista não está disponível!...";
        echo json_encode($conteudosaida);
        return;
    }

    $conteudosaida["resultado"] =  '1';
    $conteudosaida["descresultado"] =  "ok";
    $conteudosaida["inhtml"] = include "View/" . $vista;
    echo json_encode($conteudosaida);
    return;
} else {

    $conteudosaida["resultado"] = '0';
    $conteudosaida["inhtml"] = "";
    $conteudosaida["descresultado"] = "Erro a obter a dialog-box pretendida!...";
    echo json_encode($conteudosaida);
    return;
}
