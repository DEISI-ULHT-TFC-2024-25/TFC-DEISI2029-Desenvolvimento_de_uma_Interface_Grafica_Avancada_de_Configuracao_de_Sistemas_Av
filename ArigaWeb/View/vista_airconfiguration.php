<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";

$htmlretorno = "<div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <p class=\"margem_padding_0 tamanhofonte_3px\">
                                &nbsp;
                            </p>
                        </div>
                    </div> 
                    <div class=\"box_alt_cria_pesq\">
                    <div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <div class=\"row\">
                                <div class=\"col-6 col-s-6\">
                                    <label class=\"texto_na_mesma_linha\"><b>Required cores</b></label>
                                    <input type=\"number\" style=\"width: 100%;\" name=\"requiredcores\" id=\"requiredcores_id_visualiza_alteracao\" value=\"\" disabled>
                                </div>
                                <div class=\"col-6 col-s-6\">
                                    <label class=\"texto_na_mesma_linha\"><b>Ticks per second</b></label>
                                    <input type=\"number\" style=\"width: 100%;\" name=\"tickspersecond\" id=\"tickspersecond_id_visualiza_alteracao\"  value=\"\" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

return $htmlretorno;
