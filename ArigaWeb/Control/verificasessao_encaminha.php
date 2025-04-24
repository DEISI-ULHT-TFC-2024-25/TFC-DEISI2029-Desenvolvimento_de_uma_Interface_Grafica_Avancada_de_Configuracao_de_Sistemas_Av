<?php
if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Generic/constants.php";
include_once "Model/lib/GconexaoBD.php";

$paginacurrente = basename($_SERVER['PHP_SELF']);

if ($paginacurrente == constants::$paginainicio) {
    if (isset($_SESSION["IDSESSIONBD"]) && $_SESSION["IDSESSIONBD"] !== "") {
        $_SESSION["IDSESSIONBD"] = "";
        $_SESSION['IDUTILIZADOR'] = "";
        $_SESSION['CODUTILIZADOR'] = "";
        $_SESSION['IDPERFILUTILIZADOR'] = "";
        $_SESSION["IDAUTENTICACAO"] = "";
    }
} else {

    if (isset($_SESSION["IDSESSIONBD"]) && $_SESSION["IDSESSIONBD"] !== "") {

        $array_params_sql = array($_SESSION["IDSESSIONBD"]);

        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
        if ($resultado < 1) {
            $_SESSION["IDSESSIONBD"] = "";
            $_SESSION['IDAUTENTICACAO'] = "";
            echo '<script>document.location.href ="' . constants::$paginainicio . '"; alert(" A sua sessão expirou. Volte a entrar!...(E1)");</script>';
        }

        $retorno = GconexaoBD::executar_sql($objdb, "verifica_sessao", $array_params_sql, $ressql, $descresultado, $concat, $descresultadoarrayPHP, $descresultadojson);

        if ($retorno == 1) {
            if ($ressql == "1") {
            } else {
                $_SESSION["IDSESSIONBD"] = "";
                $_SESSION['IDAUTENTICACAO'] = "";
                echo '<script>document.location.href = "' . constants::$paginainicio . '"; alert("Volte a entrar!...");</script>';
            }
        } else if ($retorno > 1) {
            $_SESSION["IDSESSIONBD"] = "";
            $_SESSION['IDAUTENTICACAO'] = "";
            echo '<script>document.location.href ="' . constants::$paginainicio . '"; alert("A sua sessão expirou. Volte a entrar!...(E2)");</script>';
        } else {
            $_SESSION["IDSESSIONBD"] = "";
            $_SESSION['IDAUTENTICACAO'] = "";
            echo '<script>document.location.href ="' . constants::$paginainicio . '"; alert("A sua sessão expirou. Volte a entrar!...(E3)");</script>';
        }

        GconexaoBD::fechaconexaoBD($objdb, $message);
    } else {
        $_SESSION["IDSESSIONBD"] = "";
        $_SESSION['IDAUTENTICACAO'] = "";
        echo '<script>document.location.href = "' . constants::$paginainicio . '"; alert("A sua sessão expirou. Volte a entrar!...");</script>';
    }
}
