<?php

include_once "Control/lib/mensagens.php";

class valida_campos_form_gen
{

    public static function valida_numero($valorvalidar, $designacao, $validalimites, $limiteinferior, $limitesuperior, &$descres)
    {
        $convnum = 0;

        if (empty($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        } else {
            if (is_numeric($valorvalidar)) {

                if ($validalimites) {
                    $convnum = intval($valorvalidar);
                    if (!is_null($limiteinferior)) {
                        if ($convnum < $limiteinferior) {
                            $descres = $designacao . ': Valor inválido.';
                            return 0;
                        }
                    }
                    if (!is_null($limitesuperior)) {
                        if ($convnum > $limitesuperior) {
                            $descres = $designacao . ': Valor inválido.';
                            return 0;
                        }
                    }
                    return 1;
                } else {
                    return 1;
                }
            } else {
                $descres = $designacao . ': Não é um número.';
                return 0;
            }
        }
    }

    public static function valida_numero_n($valorvalidar, $designacao, $validalimites, $limiteinferior, $limitesuperior, &$descres)
    {
        $convnum = 0;

        if (is_null($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        } else {
            if ($validalimites) {

                if ($valorvalidar < $limiteinferior) {
                    $descres = $designacao . ': Valor inválido.';
                    return 0;
                }

                if ($valorvalidar > $limitesuperior) {
                    $descres = $designacao . ': Valor inválido.';
                    return 0;
                }

                return 1;
            } else {
                return 1;
            }
        }
    }

    public static function valida_texto($valorvalidar, $designacao, $formato, $validalimites, $tamanhoinf, $tamanhosup, &$descres)
    {

        $tamanhotexto = 0;

        if (empty($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        }
        if ($formato !== "") {
            if (!preg_match($formato, $valorvalidar)) {
                $descres = $designacao . ': Formato inválido.';
                return 0;
            }
        }

        if ($validalimites) {
            $tamanhotexto = strlen($valorvalidar);

            if (!is_null($tamanhoinf)) {
                if ($tamanhotexto < $tamanhoinf) {
                    $descres = $designacao . ': Tamanho inválido.';
                    return 0;
                }
            }
            if (!is_null($tamanhosup)) {
                if ($tamanhotexto > $tamanhosup) {
                    $descres = $designacao . ': Tamanho inválido.';
                    return 0;
                }
            }
        }
        return 1;
    }

    public static function valida_id_dropdown($valorvalidar, $designacao, &$descres)
    {
        $convnum = 0;

        if (empty($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        } else {
            if (is_numeric($valorvalidar)) {
                $convnum = intval($valorvalidar);
                if ($convnum < 0) {
                    $descres = $designacao . ': Valor inválido.';
                    return 0;
                }
                return 1;
            } else {
                $descres = $designacao . ': Não é um número.';
                return 0;
            }
        }
    }

    public static function valida_id_s_n_dropdown($valorvalidar, $designacao, &$descres)
    {
        $convnum = 0;

        if (empty($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        } else {
            if (strlen($valorvalidar) != 1) {

                $descres = $designacao . ': Valor inválido.';
                return 0;
            } else {
                if ($valorvalidar == 'S' || $valorvalidar == 'N') {
                    return 1;
                } else {
                    $descres = $designacao . ': Valor inválido.';
                    return 0;
                }
            }
        }
    }


    public static function valida_texto_numero($valorvalidar, $designacao, &$descres)
    {
        $convnum = 0;

        if (empty($valorvalidar)) {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        } else {
            if (is_numeric($valorvalidar)) {
                $convnum = intval($valorvalidar);
                if ($convnum < 0) {
                    $descres = $designacao . ': Valor inválido.';
                    return 0;
                }
                return 1;
            } else {
                $descres = $designacao . ': Não é um número.';
                return 0;
            }
        }
    }

    public static function valida_data($date, &$ano, &$mes, &$dia)
    {

        $result = "";

        $convert_date = strtotime($date);
        $mes = date('F', $convert_date);
        $ano = date('Y', $convert_date);
        $dia = date('j', $convert_date);

        return 1;
    }

    public static function valida_data_atualencaminhamento($data, $designacao, &$descres)
    {

        if (strlen($data) != 10) {
            $descres = $designacao . ': Data inválida.';
            return 0;
        }

        $anoatual = (int)date("Y");
        $dataano = (int)substr($data, 0, 4);

        if ($dataano >= $anoatual) {
            return 1;
        } else {
            $descres = $designacao . ': Ano inserido não pode ser inferior ao ano atual.';
            return 0;
        }
    }

    public static function cria_codigo($texto_para_gerar_codigo, &$codigo, &$codigoget)
    {

        $tamanho_texto = 0;
        $tamanho_texto = strlen($texto_para_gerar_codigo);
        $inicial = 0;
        $fim = 0;
        $inicialpit = 0;
        $fimpit = 0;

        $inicial = rand(10, 99);
        $fim = rand(10, 99);
        $inicialpit = self::numeropitagoras($inicial);
        $fimpit = self::numeropitagoras($fim);

        if ($tamanho_texto <= 0) return 0;

        $findme   = '@';
        $pos = strpos($texto_para_gerar_codigo, $findme);

        if ($pos === false) {
            return 0;
        } else {

            if ($tamanho_texto > 9) {
                $codigo = strval($inicialpit) . $texto_para_gerar_codigo[$pos - 1] . strval($tamanho_texto) . $texto_para_gerar_codigo[0] . $texto_para_gerar_codigo[$pos - 2] . strval($fimpit);
                $codigoget = strval($inicial) . $texto_para_gerar_codigo[$pos - 1] . strval($tamanho_texto) . $texto_para_gerar_codigo[0] . $texto_para_gerar_codigo[$pos - 2] . strval($fim);
            } else {
                $codigo = strval($inicialpit) . $texto_para_gerar_codigo[$pos - 1] . '0' . strval($tamanho_texto) . $texto_para_gerar_codigo[0] . $texto_para_gerar_codigo[$pos - 2] . strval($fimpit);
                $codigoget = strval($inicial) . $texto_para_gerar_codigo[$pos - 1] . '0' . strval($tamanho_texto) . $texto_para_gerar_codigo[0] . $texto_para_gerar_codigo[$pos - 2] . strval($fim);
            }

            return 1;
        }
    }

    public static function numeropitagoras($num)
    {
        $numpitagoras = $num;

        if ($numpitagoras < 10) return $numpitagoras;

        $resultadomod = 0;
        $resultadodiv = 0;

        while ($numpitagoras > 9) {

            $resultadomod = fmod($numpitagoras, 10);
            $resultadodiv = intdiv($numpitagoras, 10);
            $numpitagoras = $resultadodiv + $resultadomod;
        }
        return $numpitagoras;
    }

    public static function valida_data_nascimento($datanascimento, $designacao, &$descres)
    {

        if (strlen($datanascimento) != 10) {
            $descres = $designacao . ': Data inválida.';
            return 0;
        }

        $diaatual = (int)date("d");
        $mesatual = (int)date("m");
        $anoatual = (int)date("Y");

        $anonascimento = (int)substr($datanascimento, 0, 4);
        $mesnascimento = (int)substr($datanascimento, 5, 2);
        $dianascimento = (int)substr($datanascimento, 8, 2);

        if ($anonascimento < $anoatual) {
            return 1;
        }

        if ($anonascimento == $anoatual) {
            if ($mesnascimento < $mesatual) {
                return 1;
            }

            if ($mesnascimento == $mesatual) {

                if ($dianascimento <= $diaatual) {
                    return 1;
                } else {
                    $descres = $designacao . ': Data atual inferior há data de nascimento.';
                    return 0;
                }
            } else {
                $descres = $designacao . ': Data atual inferior há data de nascimento.';
                return 0;
            }
        } else {
            $descres = $designacao . ': Data atual inferior há data de nascimento.';
            return 0;
        }
    }

    public static function trata_data_entrada_saida($data, $designacao, &$descres)
    {

        if ($data == "") return 1;

        if ($data != "") {
            if (strlen($data) != 10) {
                $descres = $designacao . ': Data inválida.';
                return 0;
            }

            $diaatual = (int)date("d");
            $mesatual = (int)date("m");
            $anoatual = (int)date("Y");

            $dataano = (int)substr($data, 0, 4);
            $datames = (int)substr($data, 5, 2);
            $datadia = (int)substr($data, 8, 2);

            if ($dataano < $anoatual) {
                return 1;
            }

            if ($dataano == $anoatual) {
                if ($datames < $mesatual) {
                    return 1;
                }

                if ($datames == $mesatual) {

                    if ($datadia <= $diaatual) {
                        return 1;
                    } else {
                        $descres = $designacao . ': Data atual inferior há data indicada.';
                        return 0;
                    }
                } else {
                    $descres = $designacao . ': Data atual inferior há data indicada.';
                    return 0;
                }
            } else {
                $descres = $designacao . ': Data atual inferior há data indicada.';
                return 0;
            }
        }
    }

    public static function valida_ano($anovalidar, $anointervaloinf, $intervaloano, $designacao, &$descres)
    {

        if ($anovalidar < 1) {
            $descres = $designacao . ': valor não preenchido.';
            return 0;
        }

        if ($intervaloano < 'S') {
            if ($anovalidar > 2060) {
                $descres = $designacao . ': não pode ser superior a 2060.';
                return 0;
            }

            if ($anointervaloinf > $anovalidar) {
                $descres = $designacao . ': não pode ser inferior ao Ano inícial.';
                return 0;
            }
        } else {
            if ($anovalidar < 2000) {
                $descres = $designacao . ': não pode ser inferior a 2000.';
                return 0;
            }
        }
        return 1;
    }

    public static function valida_duracao_tempo($duracao, $separador, $limhoras, $limminutos, $limsegundos, $designacao, &$descres)
    {

        if (strlen($duracao) < 8) {
            $descres = $designacao . ': valor mal formatado.';
            return 0;
        }

        if (strlen($duracao) > 9) {
            $descres = $designacao . ': valor mal formatado.';
            return 0;
        }

        if ($duracao[2] != $separador || $duracao[5] != $separador) {
            $descres = $designacao . ': valor mal formatado.';
            return 0;
        }

        $valor = substr($duracao, 0, 2);
        $valornum = (int)$valor;

        if ($valornum > $limhoras) {
            $descres = $designacao . ': valor superior ao limite definido de ' . $limhoras;
            return 0;
        }
        $valor = "";
        $valornum = 0;

        $valor = substr($duracao, 3, 2);
        $valornum = (int)$valor;

        if ($valornum > $limminutos) {
            $descres = $designacao . ': valor superior ao limite definido de ' . $limminutos;
            return 0;
        }
        $valor = "";
        $valornum = 0;

        $valor = substr($duracao, 6, 2);
        $valornum = (int)$valor;

        if ($valornum > $limsegundos) {
            $descres = $designacao . ': valor superior ao limite definido de ' . $limsegundos;
            return 0;
        }

        return 1;
    }

    public static function valida_ano_execucao_formacao($anovalidar, $anointervalosup, $designacao, &$descres)
    {


        $anoatual = (int)date("Y");

        if ($anovalidar < $anoatual) {
            $descres = $designacao . ': não pode ser inferior ao ano atual.';
            return 0;
        }

        if ($anovalidar > 2060) {
            $descres = $designacao . ': não pode ser superior a 2060.';
            return 0;
        }

        return 1;
    }

    public static function trata_data_realizacao($data, $designacao, &$descres)
    {

        if ($data == "") return 1;

        if ($data != "") {
            if (strlen($data) != 10) {
                $descres = $designacao . ': Data inválida.';
                return 0;
            }

            $diaatual = (int)date("d");
            $mesatual = (int)date("m");
            $anoatual = (int)date("Y");

            $dataano = (int)substr($data, 0, 4);
            $datames = (int)substr($data, 5, 2);
            $datadia = (int)substr($data, 8, 2);

            if ($dataano > $anoatual) {
                return 1;
            }

            if ($dataano == $anoatual) {
                if ($datames > $mesatual) {
                    return 1;
                }

                if ($datames == $mesatual) {

                    if ($datadia >= $diaatual) {
                        return 1;
                    } else {
                        $descres = $designacao . ': inferior há data atual.';
                        return 0;
                    }
                } else {
                    $descres = $designacao . ': inferior há data atual..';
                    return 0;
                }
            }
        }
    }

    public static function trata_data_realizacao_formacao_concluida($data, $designacao, &$descres)
    {

        if ($data == "") return 1;

        if ($data != "") {
            if (strlen($data) != 10) {
                $descres = $designacao . ': Data inválida.';
                return 0;
            }

            $diaatual = (int)date("d");
            $mesatual = (int)date("m");
            $anoatual = (int)date("Y");

            $dataano = (int)substr($data, 0, 4);
            $datames = (int)substr($data, 5, 2);
            $datadia = (int)substr($data, 8, 2);

            if ($dataano >= $anoatual - 1) {
                return 1;
            } else {
                $descres = $designacao . ': Data do ano inferior ao ano atual - 1..';
                return 0;
            }
        }
    }

    public static function obtem_ano_da_data($data)
    {

        return (int)substr($data, 0, 4);
    }

    public static function retira_duracao_tempo($duracao, $separador, &$totalhoras, &$totalminutos, &$totalsegundos)
    {

        if (strlen($duracao) < 8) {
            return 0;
        }

        if (strlen($duracao) > 9) {
            return 0;
        }

        if ($duracao[2] != $separador || $duracao[5] != $separador) {
            return 0;
        }

        $valor = substr($duracao, 0, 2);
        $valorhoras = (int)$valor;
        $valor = "";

        $valor = substr($duracao, 3, 2);
        $valorminutos = (int)$valor;
        $valor = "";

        $valor = substr($duracao, 6, 2);
        $valorsegundos = (int)$valor;

        $totalsegundos = $totalsegundos + $valorsegundos;
        $totalminutos = $totalminutos + $valorminutos;
        $totalhoras = $totalhoras + $valorhoras;

        $valorsegundos = 0;
        $valorminutos = 0;
        $valorhoras = 0;

        if ($totalsegundos >= 60) {

            $valorsegundos = ($totalsegundos % 60);
            $valorminutos = ($totalsegundos / 60);
            $totalsegundos = $valorsegundos;
        }

        $totalminutos = $totalminutos + $valorminutos;

        if ($totalminutos >= 60) {

            $valorminutos = ($totalminutos % 60);
            $valorhoras = ($totalminutos / 60);
            $totalminutos = $valorminutos;
        }
        $totalhoras = $totalhoras + $valorhoras;

        return 1;
    }

    public static function formata_duracao_tempo($separador, $totalhoras, $totalminutos, $totalsegundos)
    {

        $item = strval($totalhoras);
        $itemreturn = "";

        if (strlen($item) == 1) {
            $item = '0' . $item;
        }
        $itemreturn = $item . $separador;
        $item = "";

        $item = strval($totalminutos);
        if (strlen($item) < 2) {
            $item = '0' . $item;
        }
        $itemreturn = $itemreturn . $item . $separador;

        $item = strval($totalsegundos);
        if (strlen($item) < 2) {
            $item = '0' . $item;
        }
        $itemreturn = $itemreturn . $item;

        return $itemreturn;
    }

    public static function retira_custos_soma($custo, &$totalcustos, &$debug)
    {

        if (strlen($custo) < 2) {
            return 0;
        }

        $charremove = array(' ', '€');
        $onlytextnumber = str_replace($charremove, "", $custo);
        $onlytextnumber = str_replace(',', ".", $custo);
        $onlytextnumber = self::tofloat($onlytextnumber);
        $debug = $debug . ' ' . $onlytextnumber;
        $number = floatval($onlytextnumber);

        $totalcustos = $totalcustos +  $number;

        return 1;
    }

    public static function tofloat($str)
    {
        return preg_replace("/([^0-9\\.])/i", "", $str);
    }

    public static function stringInsert($str, $insertstr, $pos)
    {
        $str = substr($str, 0, $pos) . $insertstr . substr($str, $pos);
        return $str;
    }

    public static function formata_custo($totalcustos)
    {

        $itemreturn = "";
        $item = strval($totalcustos);
        $item = number_format($item, 2, '.', '');

        $tamanho = strlen($item);
        $item = str_replace('.', ",", $item);

        if ($tamanho > 6) {

            $itemreturn = self::stringInsert($item, " ", (($tamanho - 6))) . ' €';
        } else {
            $itemreturn = $item . ' €';
        }

        return $itemreturn;
    }

    public static function valida_compara_captcha_gen($valorcomparar, $nomeguardadosession, $designacao, &$descres)
    {
        $captcha_code = "";

        if (!isset($_SESSION[$nomeguardadosession])) {
            $descres = $designacao . ': Valor inválido!...';
            return 0;
        }

        $captcha_code = $_SESSION[$nomeguardadosession];

        if (empty($captcha_code) || $valorcomparar == "") {
            $descres = $designacao . ': Não preenchido.';
            return 0;
        }

        if ($captcha_code == $valorcomparar) {
            return 1;
        } else {
            $descres = $designacao . ': Valor diferente!...';
            return 0;
        }
    }

    public static function valida_tag_texto($caminhotag, $nometag, $nomegrupotag, &$mensagem)
    {
        if (empty($caminhotag)) {
            $mensagem = mensagens::mensagem_xml_tag_n_definida($nometag, $nomegrupotag);
            return 0;
        }

        if (trim($caminhotag) == "") {
            $mensagem = mensagens::mensagem_xml_tag_valor_invalido($nometag, $nomegrupotag);
            return 0;
        }

        return 1;
    }

    public static function valida_tag_numero($caminhotag, $nometag, $nomegrupotag, &$mensagem)
    {
        if (empty($caminhotag)) {
            $mensagem = mensagens::mensagem_xml_tag_n_definida($nometag, $nomegrupotag);
            return 0;
        }

        if (!is_numeric(intval($caminhotag))) {
            $mensagem = mensagens::mensagem_xml_tag_valor_invalido($nometag, $nomegrupotag);
            return 0;
        }

        return 1;
    }

    public static function valida_tag_boleano($caminhotag, $nometag, $nomegrupotag, &$mensagem)
    {
        if (empty($caminhotag)) {
            $mensagem = mensagens::mensagem_xml_tag_n_definida($nometag, $nomegrupotag);
            return 0;
        }

        if (strval($caminhotag) !== 'false' && strval($caminhotag) !== 'true') {
            $mensagem = mensagens::mensagem_xml_tag_valor_invalido($nometag, $nomegrupotag) . $caminhotag;
            return 0;
        }

        return 1;
    }

    public static function valida_atrib_numero($caminhoatrib, $nomeatrib, $nomegrupotag, &$mensagem)
    {
        if (empty($caminhoatrib)) {
            $mensagem = mensagens::mensagem_xml_atributo_n_definido($nomeatrib, $nomegrupotag);
            return 0;
        }

        if (!is_numeric(intval($caminhoatrib))) {
            $mensagem = mensagens::mensagem_xml_atributo_valor_invalido($nomeatrib, $nomegrupotag);
            return 0;
        }

        return 1;
    }

    public static function obtem_id_from_desc_lista($listaarrayphp, $codtabela, $activo, $descproc)
    {
        $id = 0;
        $total = count($listaarrayphp);
        $encontrou = 0;
        $i = 0;

        while ($encontrou == 0 && $i < $total) {
            if ($listaarrayphp[$i]["codtable"] == $codtabela) {
                if ($listaarrayphp[$i]["activo"] == $activo) {
                    if ($descproc == $listaarrayphp[$i]["desc"]) {
                        $id = $listaarrayphp[$i]["id"];
                        $encontrou = 1;
                    }
                }
            }
            $i = $i + 1;
        }
        return $id;
    }

    public static function obtem_variosid_from_desc_lista($listaarrayphp, $codtabela, $activo, $descproc)
    {
        $listaid = "";
        $i = 0;
        $resultfunc = 0;

        if ($descproc == "") return "";
        $arraydesc = explode(";", $descproc);

        $total = count($arraydesc);
        if ($total == 0) return "";

        for ($i = 0; $i < $total; $i++) {
            $resultfunc = self::obtem_id_from_desc_lista($listaarrayphp, $codtabela, $activo, $arraydesc[$i]);
            if ($resultfunc > 0) {
                if ($listaid == "") {
                    $listaid = strval($resultfunc);
                } else {
                    $listaid = $listaid . ";" . strval($resultfunc);
                }
            }
        }
        return $listaid;
    }
}
