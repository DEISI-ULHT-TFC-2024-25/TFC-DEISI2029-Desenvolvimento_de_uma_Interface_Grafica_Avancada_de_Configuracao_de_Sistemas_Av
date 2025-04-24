<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";

$conteudosaida = array(
    'inhtml' => '',
    'dados' => '',
    'resultado'    =>  '',
    'descresultado'  =>  ''
);

if (isset($_POST["tipo_tab_manutencao_tabelas_sistema_pesquisa"])) {

    $tipo_tab_manutencao_tabelas_gf_pesquisa = $_POST["tipo_tab_manutencao_tabelas_sistema_pesquisa"];

    //Teste----------------------------------------
    $idautenticacao = $_SESSION['IDAUTENTICACAO'];
    //$idautenticacao = 1;


    $descresultado = '';
    $resultadofinalvalidacao = 0;


    $tabela_manutencao_tabelas_sistema_pesquisa = $_POST["tabela_manutencao_tabelas_sistema_pesquisa"];

    include_once "Control/lib/valida_campos_form_gen.php";

    if (valida_campos_form_gen::valida_texto($tabela_manutencao_tabelas_sistema_pesquisa, 'nome_tabela', "", true, 2, 5, $descresultado) == 1) {
        $resultadofinalvalidacao = $resultadofinalvalidacao + 1;
    } else {
        $conteudosaida["descresultado"] .= $descresultado;
    }

    if ($resultadofinalvalidacao < 1) {
        $conteudosaida["resultado"] = '-1';
        $conteudosaida["descresultado"] .= 'Campos validados:' . $resultadofinalvalidacao;
        echo json_encode($conteudosaida);
        return;
    }

    $array_params_sql = array($tabela_manutencao_tabelas_sistema_pesquisa, $idautenticacao);

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

    $retorno = GconexaoBD::executar_sql_listas($objdb, "pesquisa_manutencao_tabelas", $array_params_sql, $descresultadoarrayPHP, $descresultadojson);

    if ($retorno >= 1) {

        $ihtmltemp = "<table id = \"table_id_pesquisa\" class=\"styled-table\" style=\"width:100%; font-size:14px;\">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Código de tabela</th>
                                    <th>Descrição de tabela</th>
                                    <th>Activo</th>
                                    <th>Data \ hora</th>
                                </tr>
                            </thead>
                            <tbody>";

        for ($i = 0; $i < $retorno; $i++) {

            $ihtmltemp = $ihtmltemp . "<tr id=\"idtr" . $i . "\" " . " data-id = \"" . $i . "\" onclick=\"seleciona_linha_listaon_manutencao_tabelas_sistema(this)\">";

            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['ocod'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['odesc'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['ocodtabela'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['odesctabela'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['oactivo'] . "</td>";
            $ihtmltemp = $ihtmltemp . "<td>" . $descresultadoarrayPHP[$i]['odatahora'] . "</td>";
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
    $conteudosaida["descresultado"] = 'Não selecionou nenhuma tabela!...';
    echo json_encode($conteudosaida);
}
