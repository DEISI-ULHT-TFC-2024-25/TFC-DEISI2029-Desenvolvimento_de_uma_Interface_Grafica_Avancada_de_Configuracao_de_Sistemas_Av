<?php

include_once "Generic/constants.php";
include_once "View/lib/menuitem.php";

//Nivel de acesso 0 - Pesquisa 1 - Consulta 2 - Criação 3 - Alteração


class definemenu
{
    public $menuglobal;

    public function __construct()
    {

        $this->menuglobal = array();
        $this->cria_entrada_menu_principal(0);
        $this->cria_entrada_menu_principal(1);
        $this->cria_entrada_menu_principal(2);
        $this->cria_entrada_menu_principal(3);
    }

    public function cria_entrada_menu_principal($num_menu)
    {

        if ($num_menu == 0) {

            $tipo_op_p = "N";
            $nomeoperacao_p = "AIR";
            $nivelacesso = 3;
            $pagina_p = "";
            $this->menuglobal[$num_menu] = new menuitem($tipo_op_p, $nomeoperacao_p, $nivelacesso, $pagina_p);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR1);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR2);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_ADM);

            $submenu = [
                [
                    'op' => 'S',
                    'nomeop' => 'CONFIGURA',
                    'pagina' => 'configuraid',
                    'nacesso' => 3
                ],
                [
                    'op' => 'S',
                    'nomeop' => 'VISUALIZA',
                    'pagina' => 'visualizaid',
                    'nacesso' => 3
                ]
            ];

            $this->menuglobal[$num_menu]->add_sub_menu($submenu);

            return 1;
        }

        if ($num_menu == 1) {

            $tipo_op_p = "N";
            $nomeoperacao_p = "XML AIR";
            $nivelacesso = 3;
            $pagina_p = "";
            $this->menuglobal[$num_menu] = new menuitem($tipo_op_p, $nomeoperacao_p, $nivelacesso, $pagina_p);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_ADM);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR2);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR1);

            $submenu = [
                [
                    'op' => 'S',
                    'nomeop' => 'IMPORTA',
                    'pagina' => 'xmlimportarid',
                    'nacesso' => 3
                ],
                [
                    'op' => 'S',
                    'nomeop' => 'EXPORTA',
                    'pagina' => 'xmlexportarid',
                    'nacesso' => 3
                ]
            ];

            $this->menuglobal[$num_menu]->add_sub_menu($submenu);

            return 1;
        }

        if ($num_menu == 2) {

            $tipo_op_p = "S";
            $nomeoperacao_p = "GESTÃO TABELAS AIR";
            $nivelacesso_p = 3;
            $pagina_p = "manutencao_tabelas_sistemaid";
            $this->menuglobal[$num_menu] = new menuitem($tipo_op_p, $nomeoperacao_p, $nivelacesso_p, $pagina_p);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR2);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_ADM);

            return 1;
        }

        if ($num_menu == 3) {

            $tipo_op_p = "N";
            $nomeoperacao_p = "GESTÃO DO SISTEMA";
            $nivelacesso = 3;
            $pagina_p = "";
            $this->menuglobal[$num_menu] = new menuitem($tipo_op_p, $nomeoperacao_p, $nivelacesso, $pagina_p);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_ADM);
            $this->menuglobal[$num_menu]->add_perfil(constants::$perfil_AIR2);

            $submenu = [
                [
                    'op' => 'S',
                    'nomeop' => 'PERFIL',
                    'pagina' => 'gestaoperfilid',
                    'nacesso' => 3
                ],
                [
                    'op' => 'S',
                    'nomeop' => 'UTILIZADORES',
                    'pagina' => 'gestaoutilizadoresid',
                    'nacesso' => 3
                ],
                [
                    'op' => 'S',
                    'nomeop' => 'AUTENTICAÇÃO',
                    'pagina' => 'gestaoautenticacaoid',
                    'nacesso' => 3
                ]

            ];

            $this->menuglobal[$num_menu]->add_sub_menu($submenu);

            return 1;
        }
    }

    public function __destruct() {}
}
