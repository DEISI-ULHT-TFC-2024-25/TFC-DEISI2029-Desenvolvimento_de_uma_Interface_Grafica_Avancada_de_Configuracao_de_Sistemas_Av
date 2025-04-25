<?php

class gestao_informacao
{
    private $dropdowns;
    private $listas;

    function __construct()
    {
        $this->dropdowns = array();
        $this->listas = array();
    }

    public function setdd($nome, $valor)
    {
        $this->dropdowns[$nome] = $valor;
    }

    public function getdd($nome)
    {

        if (array_key_exists($nome, $this->dropdowns)) {
            return $this->dropdowns[$nome];
        } else {
            return "";
        }
    }

    public function setlistas($nome, $valor)
    {
        $this->listas[$nome] = $valor;
    }

    public function getlistas($nome)
    {

        if (array_key_exists($nome, $this->listas)) {
            return $this->listas[$nome];
        } else {
            return "";
        }
    }

    public function geradropdown_tabcoddesc_nome_tabelas_lista($tipo_tabela, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio, $objdb, $vaibd, $querolista, $querodd, $id_array_lista, $id_array_dd, &$listaretornar, &$ihtmlretorno)
    {

        $array_params_sql = "";
        $retorno = 0;
        $descresultadoarrayPHP = "";
        $descresultadojson = "";
        $descricao = "";

        if ($vaibd == false) {

            if ($querodd == true) {
                $ihtmlretorno = $this->getdd($id_array_dd);
                if ($ihtmlretorno == "") {
                    $listaretornar = $this->getlistas($id_array_lista);
                    if ($listaretornar == "") {
                        $vaibd = true;
                    } else {

                        $descresultadoarrayPHP = json_decode($listaretornar, true);

                        $retorno = count($descresultadoarrayPHP);

                        $ihtmlretorno = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

                        if ($id != "") {
                            $ihtmlretorno .= " id=\"" . $id . "\" data-id = \"\" data-tipo = \"" . $tipo_tabela . "\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
                        }

                        if ($obrigatorio == true) {
                            $ihtmlretorno .= " required data-required = \"S\">";
                        } else {
                            $ihtmlretorno .= " data-required = \"N\">";
                        }
                        $ihtmlretorno .= "<option value=\"0\">-- Selecionar --</option>";

                        for ($i = 0; $i < $retorno; $i++) {

                            if ($descresultadoarrayPHP[$i]["otipotable"] == $tipo_tabela) {

                                $id = $descresultadoarrayPHP[$i]["ocodtable"];
                                $descricao = $descresultadoarrayPHP[$i]["odesctable"];
                                $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                            }
                        }

                        $ihtmlretorno .= "</select>";

                        $this->setdd($id_array_dd, $ihtmlretorno);
                        $retorno = 1;
                    }
                } else {
                    $retorno = 1;
                }
            }

            if ($querolista == true) {
                $listaretornar = $this->getlistas($id_array_lista);
                if ($listaretornar == "") {
                    $vaibd = true;
                } else {
                    if ($vaibd == false) {
                        $retorno = 1;
                    }
                }
            }

            if ($retorno == 1) return 1;
        }

        if ($vaibd == true) {

            $array_params_sql = array($tipo_tabela);

            $retorno = GconexaoBD::executar_sql_listas($objdb, $nomefuncao, $array_params_sql, $descresultadoarrayPHP, $descresultadojson);

            if ($retorno > 0) {

                $ihtmlretorno = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

                if ($id != "") {
                    $ihtmlretorno .= " id=\"" . $id . "\" data-id = \"\" data-tipo = \"" . $tipo_tabela . "\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
                }

                if ($obrigatorio == true) {
                    $ihtmlretorno .= " required data-required = \"S\">";
                } else {
                    $ihtmlretorno .= " data-required = \"N\">";
                }
                $ihtmlretorno .= "<option value=\"0\">-- Selecionar --</option>";

                for ($i = 0; $i < $retorno; $i++) {

                    if ($descresultadoarrayPHP[$i]["otipotable"] == $tipo_tabela) {

                        $id = $descresultadoarrayPHP[$i]["ocodtable"];
                        $descricao = $descresultadoarrayPHP[$i]["odesctable"];
                        $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    }
                }

                $ihtmlretorno .= "</select>";
                $this->setdd($id_array_dd, $ihtmlretorno);
                $this->setlistas($id_array_lista, $descresultadojson);

                return 1;
            } else {
                return $retorno;
            }
        }
    }


    //--------------------------------Sistema--------------------------------------------------------------------------------

    public function inicializar_alterar_lista_sistema($objdb)
    {

        $nomefuncao = "obtemlista_sistema_total";

        $retorno = GconexaoBD::executar_query_sql_devolve_tabela($objdb, $nomefuncao, $descresultadoarrayPHP, $descresultadojson, $descresult);

        if ($retorno > 0) {
            $this->setlistas("lista_sistema_total", $descresultadojson);
            return 1;
        }

        return 0;
    }

    public function cria_opcoesdd_sistema($codtabela, $activo, $id_array_opcoes_dd)
    {

        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;

        $ihtmlretorno = $this->getdd($id_array_opcoes_dd);

        if ($ihtmlretorno == "") {
            $listaretornar = $this->getlistas("lista_sistema_total");
            $descresultadoarrayPHP = json_decode($listaretornar, true);
            $retorno = count($descresultadoarrayPHP);

            for ($i = 0; $i < $retorno; $i++) {
                if ($activo == 'S') {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    }
                } else {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    }
                }
            }
            $this->setdd($id_array_opcoes_dd, $ihtmlretorno);
        }

        return $ihtmlretorno;
    }

    public function gera_dropdown_sistema($nomedropdown, $id, $classe, $obrigatorio, $opcoesdd, &$principiodd)
    {

        $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

        if ($id != "") {
            $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
        }

        if ($obrigatorio == true) {
            $html .= " required data-required = \"S\">";
        } else {
            $html .= " data-required = \"N\">";
        }
        $html .= "<option value=\"0\">-- Selecionar --</option>";
        $principiodd =  $html;
        $html .= $opcoesdd;
        $html .= "</select>";
        return $html;
    }

    public function altera_opcoesdd_sistema($codtabela, $activo, $id_array_opcoes_dd)
    {

        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;
        $ihtmlretorno = "";

        $listaretornar = $this->getlistas("lista_sistema_total");
        $descresultadoarrayPHP = json_decode($listaretornar, true);
        $retorno = count($descresultadoarrayPHP);

        for ($i = 0; $i < $retorno; $i++) {
            if ($activo == 'S') {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            } else {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            }
        }
        $this->setdd($id_array_opcoes_dd, $ihtmlretorno);

        return $ihtmlretorno;
    }

    //-----------------------------------------------------------------------------------------------------------------
    public function cria_opcoesdd_multiselecao($codtabela, $activo, $id_array_opcoes_dd, $nomelistautilizar, $name)
    {

        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;

        $ihtmlretorno = $this->getdd($id_array_opcoes_dd);

        if ($ihtmlretorno == "") {
            $listaretornar = $this->getlistas($nomelistautilizar);
            $descresultadoarrayPHP = json_decode($listaretornar, true);
            $retorno = count($descresultadoarrayPHP);

            for ($i = 0; $i < $retorno; $i++) {
                if ($activo == 'S') {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                        //adicionar data-id e data-desc

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<label><input type=\"checkbox\" name=\"" . $name . "\" value=\"" . $id . "\"> " . $descricao . "</label>";
                    }
                } else {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<label><input type=\"checkbox\" name=\"" . $name . "\" value=\"" . $id . "\"> " . $descricao . "</label>";
                    }
                }
            }
            $this->setdd($id_array_opcoes_dd, $ihtmlretorno);
        }

        return $ihtmlretorno;
    }

    public function gera_dropdown_multiselecao($nomedropdown, $id, $obrigatorio, $opcoesdd, $label, &$principiodd)
    {
        //para alterar
        $html = "<div class=\"multiselecao\">";
        $html .= "<button>" . $label . "</button>";

        if ($id != "") {
            $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
        }

        if ($obrigatorio == true) {
            $html .= " required data-required = \"S\">";
        } else {
            $html .= " data-required = \"N\">";
        }
        $html .= "<option value=\"0\">-- Selecionar --</option>";
        $principiodd =  $html;
        $html .= $opcoesdd;
        $html .= "</select>";
        return $html;
    }

    public function altera_opcoesdd_multiselecao($codtabela, $activo, $id_array_opcoes_dd)
    {
        //para alterar
        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;
        $ihtmlretorno = "";

        $listaretornar = $this->getlistas("lista_gestaoair_total");
        $descresultadoarrayPHP = json_decode($listaretornar, true);
        $retorno = count($descresultadoarrayPHP);

        for ($i = 0; $i < $retorno; $i++) {
            if ($activo == 'S') {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            } else {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            }
        }
        $this->setdd($id_array_opcoes_dd, $ihtmlretorno);

        return $ihtmlretorno;
    }

    //--------------------------------air--------------------------------------------------------------------------------

    public function inicializar_alterar_lista_gestaoair($objdb)
    {

        $nomefuncao = "obtemlista_gestaoair_total";

        $retorno = GconexaoBD::executar_query_sql_devolve_tabela($objdb, $nomefuncao, $descresultadoarrayPHP, $descresultadojson, $descresult);

        if ($retorno > 0) {
            $this->setlistas("lista_gestaoair_total", $descresultadojson);
            return 1;
        }

        return 0;
    }


    public function cria_opcoesdd_gestaoair($codtabela, $activo, $id_array_opcoes_dd)
    {

        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;

        $ihtmlretorno = $this->getdd($id_array_opcoes_dd);

        if ($ihtmlretorno == "") {
            $listaretornar = $this->getlistas("lista_gestaoair_total");
            $descresultadoarrayPHP = json_decode($listaretornar, true);
            $retorno = count($descresultadoarrayPHP);

            for ($i = 0; $i < $retorno; $i++) {
                if ($activo == 'S') {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    }
                } else {
                    if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                        $id = $descresultadoarrayPHP[$i]["id"];
                        $descricao = $descresultadoarrayPHP[$i]["desc"];
                        $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    }
                }
            }
            $this->setdd($id_array_opcoes_dd, $ihtmlretorno);
        }

        return $ihtmlretorno;
    }

    public function gera_dropdown_gestaoair($nomedropdown, $id, $classe, $obrigatorio, $opcoesdd, &$principiodd)
    {

        $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

        if ($id != "") {
            $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
        }

        if ($obrigatorio == true) {
            $html .= " required data-required = \"S\">";
        } else {
            $html .= " data-required = \"N\">";
        }
        $html .= "<option value=\"0\">-- Selecionar --</option>";
        $principiodd =  $html;
        $html .= $opcoesdd;
        $html .= "</select>";
        return $html;
    }

    public function altera_opcoesdd_gestaoair($codtabela, $activo, $id_array_opcoes_dd)
    {

        $listaretornar = "";
        $descresultadoarrayPHP = "";
        $retorno = 0;
        $ihtmlretorno = "";

        $listaretornar = $this->getlistas("lista_gestaoair_total");
        $descresultadoarrayPHP = json_decode($listaretornar, true);
        $retorno = count($descresultadoarrayPHP);

        for ($i = 0; $i < $retorno; $i++) {
            if ($activo == 'S') {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela && $descresultadoarrayPHP[$i]["activo"] == $activo) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            } else {
                if ($descresultadoarrayPHP[$i]["codtable"] == $codtabela) {

                    $id = $descresultadoarrayPHP[$i]["id"];
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $ihtmlretorno .= "<option value='" . $id . "' >" . $descricao . "</option>";
                }
            }
        }
        $this->setdd($id_array_opcoes_dd, $ihtmlretorno);

        return $ihtmlretorno;
    }
}
