<?php

include_once "Model/lib/GconexaoBD.php";

class dropdown2
{
    public function geradropdown($nometabela, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio)
    {
        $array_params_sql = array($nometabela);
        $html = "";

        $message = "";
        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
        if ($resultado < 1) {
            return $message;
        }
        //$html = GconexaoBD::executar_sql_teste($nomefuncao, $array_params_sql);
        $retorno = GconexaoBD::executar_sql_listas($objdb, $nomefuncao, $array_params_sql, $descresultadoarrayPHP, $descresultadojson);
        if ($retorno > 0) {

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

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["id"];
                $descricao = $descresultadoarrayPHP[$i]["desc"];
                $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
            }

            $html .= "</select>";

            GconexaoBD::fechaconexaoBD($objdb, $message);
        } else {
            return $retorno;
        }
        return $html;
    }

    public function geradropdown_devolve_tabela_dependente($nomefuncao, $nomedropdown, $id, $classe, $obrigatorio, $funcaodependente, &$listaformacaoexe)
    {
        $html = "";

        $message = "";
        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
        if ($resultado < 1) {
            return $message;
        }

        $retorno = GconexaoBD::executar_query_sql_devolve_tabela($objdb, $nomefuncao, $descresultadoarrayPHP, $descresultadojson, $descresult);
        if ($retorno > 0) {

            $listaformacaoexe =  $descresultadojson;

            $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

            if ($id != "") {
                $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id_dependente(this.id," . $funcaodependente . ");\"";
            }

            if ($obrigatorio == true) {
                $html .= " required data-required = \"S\">";
            } else {
                $html .= " data-required = \"N\">";
            }
            $html .= "<option value=\"0\">-- Selecionar --</option>";

            $anterior = 0;

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["id"];

                if ($id != $anterior) {
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    $anterior = $id;
                }
            }

            $html .= "</select>";

            GconexaoBD::fechaconexaoBD($objdb, $message);
        } else {
            $listaformacaoexe = '{}';
            $html = "<p>Nada para associar</p>";
        }
        return $html;
    }

    public function geradropdown_devolve_tabela_dependente_objdb($objdb, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio, $funcaodependente, &$listaformacaoexe)
    {
        $html = "";

        $retorno = GconexaoBD::executar_query_sql_devolve_tabela($objdb, $nomefuncao, $descresultadoarrayPHP, $descresultadojson, $descresult);
        if ($retorno > 0) {

            //$listaformacaoexe =  $descresultadojson;
            $listaformacaoexe =  $descresultadoarrayPHP;

            $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

            if ($id != "") {
                $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id_dependente(this.id," . $funcaodependente . ");\"";
            }

            if ($obrigatorio == true) {
                $html .= " required data-required = \"S\">";
            } else {
                $html .= " data-required = \"N\">";
            }
            $html .= "<option value=\"0\">-- Selecionar --</option>";

            $anterior = 0;

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["id"];

                if ($id != $anterior) {
                    $descricao = $descresultadoarrayPHP[$i]["desc"];
                    $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
                    $anterior = $id;
                }
            }

            $html .= "</select>";
        } else {
            return $retorno;
        }
        return $html;
    }


    public function geradropdown_tabcoddesc($nometabela, $nometabelainterna, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio)
    {
        $array_params_sql = array($nometabela, $nometabelainterna);
        $html = "";

        $message = "";
        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
        if ($resultado < 1) {
            return $message;
        }
        //$html = GconexaoBD::executar_sql_teste($nomefuncao, $array_params_sql);
        $retorno = GconexaoBD::executar_sql_listas($objdb, $nomefuncao, $array_params_sql, $descresultadoarrayPHP, $descresultadojson);
        if ($retorno > 0) {

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

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["id"];
                $descricao = $descresultadoarrayPHP[$i]["desc"];
                $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
            }

            $html .= "</select>";

            GconexaoBD::fechaconexaoBD($objdb, $message);
        } else {
            return $retorno;
        }
        return $html;
    }

    public function geradropdown_S_N($nomedropdown, $id, $classe, $obrigatorio)
    {

        $html = "";

        $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

        if ($id != "") {
            $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
        }

        if ($obrigatorio == true) {
            $html .= " required data-required = \"S\">";
        } else {
            $html .= " data-required = \"N\">";
        }
        $html .= "<option value=\"\">-- Selecionar --</option>";
        $html .= "<option value=\"S\">Sim</option>";
        $html .= "<option value=\"N\">Não</option>";
        $html .= "</select>";

        return $html;
    }

    public function geradropdown_S_N_funcao($nomedropdown, $id, $classe, $obrigatorio, $funcao)
    {

        $html = "";

        $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

        if ($id != "") {
            $html .= " id=\"" . $id . "\" data-id = \"\" onchange = \"atualiza_atributo_drop_data_id_funcao(this.id," . $funcao . ");\"";
        }

        if ($obrigatorio == true) {
            $html .= " required data-required = \"S\">";
        } else {
            $html .= " data-required = \"N\">";
        }
        $html .= "<option value=\"\">-- Selecionar --</option>";
        $html .= "<option value=\"S\">Sim</option>";
        $html .= "<option value=\"N\">Não</option>";
        $html .= "</select>";

        return $html;
    }

    public function geradropdown_tabcoddesc_nome_tabelas($tipo_tabela, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio)
    {
        $array_params_sql = array($tipo_tabela);
        $html = "";
        $retorno = 0;
        $message = "";
        $resultado =  GconexaoBD::criarconexaoBD($message, $objdb);
        if ($resultado < 1) {
            return $message;
        }
        //$html = GconexaoBD::executar_sql_teste($nomefuncao, $array_params_sql);
        $retorno = GconexaoBD::executar_sql_listas($objdb, $nomefuncao, $array_params_sql, $descresultadoarrayPHP, $descresultadojson);
        if ($retorno > 0) {

            $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

            if ($id != "") {
                $html .= " id=\"" . $id . "\" data-id = \"\" data-tipo = \" . $tipo_tabela . \" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
            }

            if ($obrigatorio == true) {
                $html .= " required data-required = \"S\">";
            } else {
                $html .= " data-required = \"N\">";
            }
            $html .= "<option value=\"0\">-- Selecionar --</option>";

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["ocodtabela"];
                $descricao = $descresultadoarrayPHP[$i]["odesctabela"];
                $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
            }

            $html .= "</select>";

            GconexaoBD::fechaconexaoBD($objdb, $message);
        } else {
            return $retorno;
        }
        return $html;
    }

    public function geradropdown_tabcoddesc_nome_tabelas_objBD($objdb, $tipo_tabela, $nomefuncao, $nomedropdown, $id, $classe, $obrigatorio)
    {
        $array_params_sql = array($tipo_tabela);
        $html = "";
        $retorno = 0;
        $message = "";

        $retorno = GconexaoBD::executar_sql_listas($objdb, $nomefuncao, $array_params_sql, $descresultadoarrayPHP, $descresultadojson);
        if ($retorno > 0) {

            $html = "<select name=\"" . $nomedropdown . "\" class=\"" . $classe . "\"";

            if ($id != "") {
                $html .= " id=\"" . $id . "\" data-id = \"\" data-tipo = \" . $tipo_tabela . \" onchange = \"atualiza_atributo_drop_data_id(this.id);\"";
            }

            if ($obrigatorio == true) {
                $html .= " required data-required = \"S\">";
            } else {
                $html .= " data-required = \"N\">";
            }
            $html .= "<option value=\"0\">-- Selecionar --</option>";

            for ($i = 0; $i < $retorno; $i++) {

                $id = $descresultadoarrayPHP[$i]["ocodtabela"];
                $descricao = $descresultadoarrayPHP[$i]["odesctabela"];
                $html .= "<option value='" . $id . "' >" . $descricao . "</option>";
            }

            $html .= "</select>";
        } else {
            return $retorno;
        }
        return $html;
    }

    public function geradropdown_tabcoddesc_lista($nomedropdown, $id, $classe, $obrigatorio, $opcoesdd)
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
        $html .= $opcoesdd;
        $html .= "</select>";
        return $html;
    }
}
