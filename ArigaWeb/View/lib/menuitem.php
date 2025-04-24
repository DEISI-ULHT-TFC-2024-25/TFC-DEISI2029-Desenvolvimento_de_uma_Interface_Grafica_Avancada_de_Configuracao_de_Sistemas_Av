<?php

class menuitem
{

    public $perfil;
    public $op;
    public $nome;
    public $submenu;
    public $nacesso;
    public $pagina;

    public function __construct($tipo_op, $nomeoperacao, $nivelacesso, $paginaabrir)
    {
        $this->perfil = array();
        $this->op = $tipo_op;
        $this->nome = $nomeoperacao;
        $this->nacesso = $nivelacesso;
        $this->pagina =  $paginaabrir;
        $this->submenu = array();
    }

    public function add_perfil($perfil_inserir)
    {
        $this->perfil[] = $perfil_inserir;
    }

    public function add_sub_menu($sub_menu_inserir)
    {
        $this->submenu[] = $sub_menu_inserir;
    }

    public function __destruct() {}
}
