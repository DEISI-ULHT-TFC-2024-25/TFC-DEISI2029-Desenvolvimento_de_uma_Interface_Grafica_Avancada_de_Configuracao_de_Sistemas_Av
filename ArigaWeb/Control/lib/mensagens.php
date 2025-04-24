<?php

class mensagens
{

    public static function mensagem_xml_tag_n_definida($nometag_p, $nomegrupotag_p)
    {
        return "ERRO: Tag " . $nometag_p . " do " . $nomegrupotag_p . " não existe definida no xml.";
    }

    public static function mensagem_xml_tag_valor_invalido($nometag_p, $nomegrupotag_p)
    {

        return "ERRO: Tag " . $nometag_p . " do " . $nomegrupotag_p . " não tem valor válido indicado no xml.";
    }

    public static function mensagem_xml_atributo_n_definido($nomeatrib_p, $nomegrupotag_p)
    {
        return "ERRO: Atributo " . $nomeatrib_p . " do " . $nomegrupotag_p . " não existe definido no xml.";
    }


    public static function mensagem_xml_atributo_valor_invalido($nomeatrib_p, $nomegrupotag_p)
    {

        return "ERRO: Atributo " . $nomeatrib_p . " do " . $nomegrupotag_p . " não tem valor válido indicado no xml.";
    }
}
