<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";

$conteudosaida = array(
    'inhtml' => '',
    'dados' => '',
    'resultado'    =>  '',
    'descresultado'  =>  ''
);

if (isset($_POST["emailutilizador_aut"])) {

    $emailutilizador_aut = $_POST["emailutilizador_aut"];

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    // $idautenticacao = 1;

    $descresultado = '';
    $resultadofinalvalidacao = 0;

    include_once "Control/lib/valida_campos_form_gen.php";

    if (valida_campos_form_gen::valida_texto($emailutilizador_aut, 'utilizadoremail', "", true, 11, 30, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] = $descresultado;
    }

    if ($resultadofinalvalidacao < 1) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= ' Campos - ' . $resultadofinalvalidacao;
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

    $retorno = 0;
    $ressql = "";
    $ihtmltemp = "";

    $array_params_sql = array($emailutilizador_aut, $idautenticacao);

    $retorno = GconexaoBD::executar_sql_listas($objdb, "pesquisa_autenticacao", $array_params_sql, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno >= 1) {

        $ihtmltemp = "<table class=\"styled-table\" style=\"width:100%\">
                            <thead>
                                <tr>
                                    <th>Utilizador</th>
                                    <th>Data\hora</th>
                                    <th>activo</th>
                                </tr>
                            </thead>
                            <tbody>";

        for ($i = 0; $i < $retorno; $i++) {

            $ihtmltemp = $ihtmltemp . "<tr id=\"idtr" . $i . "\" " . " data-id = \"" . $i . "\" onclick=\"seleciona_linha_listaon_gestaoautenticacao(this)\">";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['outilizador'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['odatahora'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['oactivo'] . "</td>";
            $ihtmltemp = $ihtmltemp . "</tr>";
        }

        $ihtmltemp = $ihtmltemp . "</tbody></table>";

        $conteudosaida["resultado"] = '1';
        $conteudosaida["descresultado"] =  "Foram encontrados registos: " . $retorno;
        $conteudosaida["dados"] = json_encode($descresultadoarrayPHP);
        $conteudosaida["inhtml"] = $ihtmltemp;

        echo json_encode($conteudosaida);
    } else {
        $conteudosaida["resultado"] = '0';
        $conteudosaida["descresultado"] = "Não foram encontrados registos.";
        $conteudosaida["inhtml"] = "";
        echo json_encode($conteudosaida);
    }

    GconexaoBD::fechaconexaoBD($objdb, $message);
} else {
    $conteudosaida["resultado"] = '0';
    $conteudosaida["inhtml"] = "";
    $conteudosaida["descresultado"] = 'email utilizador não foi preenchido!...';
    echo json_encode($conteudosaida);
}
