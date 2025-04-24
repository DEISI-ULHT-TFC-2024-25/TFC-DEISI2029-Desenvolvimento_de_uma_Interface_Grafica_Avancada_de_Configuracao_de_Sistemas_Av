<?php

include_once "Generic/constants.php";
include_once "Generic/environment.php";

class GconexaoBD
{
    private static $conn = NULL;

    private static $sqltext = array(
        "verifica_autenticacao_devolv_ids" => "select * from public.verifica_autenticacao_devolv_ids('%s', '%s')",
        "verifica_sessao" => "SELECT * from verifica_sessao('%d')",
        "verifica_utilizador" => "select * from public.verifica_utilizador('%s', '%d')",
        "altera_password" => "select * from public.altera_password('%s', '%s', '%d')",
        "obtemlista_tabcoddesc" => "select * from public.obtemlista_tabcoddesc('%s', '%s', '%d')",
        "pesquisa_manutencao_nome_tabelas" => "select * from public.pesquisa_manutencao_nome_tabelas('%s', '%d')",
        "manutencao_tabelas_pesquisa" => "select * from public.manutencao_tabelas_pesquisa('%s', '%d', '%d')",
        "manutencao_tabelas_alteracao" => "SELECT * from manutencao_tabelas_alteracao('%d', '%s', '%s', '%s', '%s', '%d', '%s', '%d', '%d')",
        "manutencao_tabelas_criacao" => "SELECT * from manutencao_tabelas_criacao('%s', '%s', '%s', '%s', '%d', '%d', '%d')",
        "pesquisa_manutencao_nome_tabelas" => "SELECT * from public.pesquisa_manutencao_nome_tabelas(%d)",
        "obtemlista_sistema_total" => "SELECT * from public.obtemlista_sistema_total('%s')",
        "pesquisa_manutencao_tabelas" => "SELECT * from public.pesquisa_manutencao_tabelas('%s','%d')",
        "manutencaoalteraentrada" => "SELECT * from public.manutencaoalteraentrada('%d','%s','%s','%s','%d')",
        "manutencaoinserenovaentrada" => "SELECT * from public.manutencaoinserenovaentrada('%s','%s','%s','%s','%s','%d','%d')",
        "pesquisa_utilizador" => "select * from public.pesquisa_utilizador('%s', '%d')",
        "insereutilizador" => "select * from insereutilizador('%s','%s', '%s', '%d', '%d')",
        "alterautilizador_com_pws" => "select * from  alterautilizador_com_pws('%d', '%s', '%s', '%s', '%d', '%s', '%d', '%d')",
        "pesquisa_perfilutilizador" => "select * from public.pesquisa_perfilutilizador('%s', '%d')",
        "pesquisa_autenticacao" => "select * from public.pesquisa_autenticacao('%s',  '%d')",
        "alteraperfilutilizador" => "select * from  alteraperfilutilizador('%d', '%d', '%d')",
        "alterautenticacao" => "select * from  alterautenticacao('%d', '%d', '%s')",
        "obtemlista_gestaoair_total" => "SELECT * from obtemlista_gestaoair_total('')",
        "obtemlista_gestaoair_total" => "SELECT * from obtemlista_gestaoair_total('')",
        "geraxml" => "CREATE OR REPLACE FUNCTION public.geraxml('%s,%s')"

    );

    public static function criarconexaoBD(&$idmensagem, &$conexao)
    {

        if (environment::$producao_testes == 1) {
            $Nomeapl = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $host = "localhost";
            $user = "ariga";
            $password = "123";
            $dbname = environment::$dbname;
            $port = "5432";
            $connect_timeout = "5";
        } else {
            $Nomeapl = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $host = "localhost";
            $user = "ariga";
            $password = "123";
            $dbname = environment::$dbname;
            $port = "5432";
            $connect_timeout = "5";
        }


        $conStr = "host=$host port=$port dbname=$dbname user=$user password=$password connect_timeout=$connect_timeout options='--application_name=$Nomeapl'";
        self::$conn = pg_connect($conStr);
        if (!self::$conn) {
            $idmensagem = 8;
            return -1;
        } else {
            $idmensagem = 9;
            $conexao = self::$conn;
            return 1;
        }
    }

    // this method used to execute mysql query  
    public static function executar_sql($conBD, $sqlexe, $array_params_sql, &$ressql, &$descressql, &$concatf, &$descresarrayPHP, &$descresjson)
    {
        $concatf = "";
        $concatf = vsprintf(self::$sqltext[$sqlexe], $array_params_sql);

        if ($concatf === "") {
            $descressql = 'Rotina para executar não identificada!...';
            return -1;
        }

        $resultadosql = pg_query($conBD, $concatf);

        if ($resultadosql === FALSE) {
            $descressql =  "Error: " . pg_last_error($conBD);
            return -2;
        } else {
            $descresarrayPHP = pg_fetch_all($resultadosql);
            $numlinhas = count($descresarrayPHP);
            if ($numlinhas == 1) {
                $ressql = strval($descresarrayPHP[0]["oresultado"]);
                $descressql = $descresarrayPHP[0]["oresultadodesc"];
            } else if ($numlinhas > 1) {
                $descressql = $descresarrayPHP;
            } else {
                $descressql = 'Erro no retorno da execução!...';
            }

            $descresjson = json_encode($descresarrayPHP);
            return $numlinhas;
        }
    }


    public static function executar_sql_audite($conBD, $sqlexe, $array_params_sql, &$ressql, &$descressql, &$concatf, &$descresarrayPHP, &$descresjson)
    {

        $concatf = "";
        $concatf = vsprintf(self::$sqltext[$sqlexe], $array_params_sql);

        if ($concatf === "") {
            $descressql = 'Rotina para executar não identificada!...';
            return -1;
        }

        $resultadosql = pg_query($conBD, $concatf);

        if ($resultadosql === FALSE) {
            $descressql =  "Error: " . pg_last_error($conBD);
            return -2;
        } else {
            $descresarrayPHP = pg_fetch_all($resultadosql);
            $numlinhas = count($descresarrayPHP);
            if ($numlinhas == 1) {
                $ressql = strval($descresarrayPHP[0]["_resultado"]);
                $descressql = "";
            } else if ($numlinhas > 1) {
                $descressql = $descresarrayPHP;
            } else {
                $descressql = 'Erro no retorno da execução!...';
            }

            $descresjson = json_encode($descresarrayPHP);
            return $numlinhas;
        }
    }


    public static function executar_sql_listas($conBD, $sqlexe, $array_params_sql, &$descresarrayPHP, &$descresjson)
    {

        $concatf = "";
        $concatf = vsprintf(self::$sqltext[$sqlexe], $array_params_sql);

        if ($concatf === "") {
            $descressql = 'Rotina para executar não identificada!...';
            return -1;
        }

        $resultadosql = pg_query($conBD, $concatf);

        if ($resultadosql === FALSE || isset($resultadosql) == false) {
            $descressql =  "Error: " . pg_last_error($conBD);
            return 0;
        } else {
            $descresarrayPHP = pg_fetch_all($resultadosql);
            $numlinhas = count($descresarrayPHP);
            $descresjson = json_encode($descresarrayPHP);
            return $numlinhas;
        }
    }

    public static function executar_query_sql_devolve_tabela($conBD, $sqlexe, &$descresarrayPHP, &$descresjson, &$descressql)
    {

        $concatf = "";

        if (isset(self::$sqltext[$sqlexe])) {

            $concatf = self::$sqltext[$sqlexe];

            $resultadosql = pg_query($conBD, $concatf);

            if ($resultadosql === FALSE || isset($resultadosql) == false) {
                $descressql =  "Error: " . pg_last_error($conBD);
                return 0;
            } else {
                $descresarrayPHP = pg_fetch_all($resultadosql);
                $numlinhas = count($descresarrayPHP);
                $descresjson = json_encode($descresarrayPHP);
                return $numlinhas;
            }
        } else {
            $descressql = 'Rotina para executar não identificada!...';
            return -1;
        }
    }

    public static function executar_sql_listas_devolve_erro($conBD, $sqlexe, $array_params_sql, &$descresarrayPHP, &$descresjson, &$descressql)
    {

        $concatf = "";
        $concatf = vsprintf(self::$sqltext[$sqlexe], $array_params_sql);

        if ($concatf === "") {
            $descressql = 'Rotina para executar não identificada!...';
            return -1;
        }

        $resultadosql = pg_query($conBD, $concatf);

        if ($resultadosql === FALSE || isset($resultadosql) == false) {
            $descressql =  "Error: " . pg_last_error($conBD);
            return 0;
        } else {
            $descresarrayPHP = pg_fetch_all($resultadosql);
            $numlinhas = count($descresarrayPHP);
            $descresjson = json_encode($descresarrayPHP);
            return $numlinhas;
        }
    }


    public static function fechaconexaoBD($conBD, &$messagem)
    {
        if (!pg_close($conBD)) {
            $messagem = "Error - Close BD connection " . pg_host($conBD) . ": " . pg_last_error($conBD) . ".";
            return -1;
        } else {
            $messagem = "Close BD connection";
            return 1;
        }
    }

    public static function executar_sql_teste($sqlexe, $array_params_sql)
    {

        $concatf = "";
        $descressql = "";
        $concatf = vsprintf(self::$sqltext[$sqlexe], $array_params_sql);
        return $concatf;
    }

    public static function descodifica_resposta_select_umaLinha($sqltexto, &$ncolunas, &$resposta_array)
    {
        $resultexto = "";
        $resposta_array = array();

        if ($sqltexto == "") return -1;
        if (strlen($sqltexto) < 1) return -2;

        $resultexto = ltrim(rtrim($sqltexto, ")"), "(");

        $resposta_array = explode(",", $resultexto);
        $ncolunas = count($resposta_array);

        if ($ncolunas < 1) return -3;

        return 1;
    }
}
