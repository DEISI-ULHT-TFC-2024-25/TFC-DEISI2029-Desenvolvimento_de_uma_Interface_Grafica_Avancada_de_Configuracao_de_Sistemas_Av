<?php

if (session_status() === PHP_SESSION_NONE) session_start();

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/gestao_informacao.php";

$mensagem_erro = "";
$message = "";
$objdb;

$resultado = GconexaoBD::criarconexaoBD($message, $objdb);
if ($resultado < 1) {
    $mensagem_erro = 'Erro de acesso à base de dados:' . $message;
    return -1;
}

$gestao_inf = new gestao_informacao();

$listaretornar = "";
$ihtmlretorno_manutencao_tabelas_sistema_pesquisa = "";
$gestao_inf->geradropdown_tabcoddesc_nome_tabelas_lista(
    0,
    "pesquisa_manutencao_nome_tabelas",
    "tabela_manutencao_tabelas_sistema_pesquisa",
    "tabela_id_manutencao_tabelas_sistema_pesquisa",
    "dados_elem_form_manutencao_tabelas_sistema_pesquisa",
    true,
    $objdb,
    true,
    true,
    true,
    "nome_tabela",
    "nome_tabela_sistema",
    $listaretornar,
    $ihtmlretorno_manutencao_tabelas_sistema_pesquisa
);
$gestao_inf->inicializar_alterar_lista_sistema($objdb);
$gestao_inf->inicializar_alterar_lista_gestaoair($objdb);

$_SESSION['GESTAO_INFORMACAO'] = serialize($gestao_inf);

$resultado = GconexaoBD::fechaconexaoBD($objdb, $message);
if ($resultado < 1) {
    $mensagem_erro = 'Erro na base de dados:' . $message;
    return -1;
}
