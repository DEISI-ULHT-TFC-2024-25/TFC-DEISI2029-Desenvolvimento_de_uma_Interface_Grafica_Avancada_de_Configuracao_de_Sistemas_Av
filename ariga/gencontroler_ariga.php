<?php

if (isset($_POST["controler"])) {

    $controler = $_POST["controler"];
    if ($controler != '') {
        include "Control/" . $controler;
    } else {
        $resultado = '-2';
        $saida = array(
            'resultado'    =>  $resultado,
            'descresultado'  =>  'Erro na receção do pedido (2)'

        );
        echo json_encode($saida);
    }
} else {
    $resultado = '-1';
    $saida = array(
        'resultado'    =>  $resultado,
        'descresultado'  =>  'Erro na receção do pedido (1)'

    );
    echo json_encode($saida);
}
