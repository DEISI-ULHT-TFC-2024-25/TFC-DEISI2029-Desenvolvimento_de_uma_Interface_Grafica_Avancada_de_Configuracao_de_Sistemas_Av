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
                                    <div class=\"col-4 col-s-4\">
                                        <label class=\"texto_na_mesma_linha\"><b>Schedule name</b></label>
                                        <input type=\"text\" style=\"width: 100%;\" name=\"schedulename\" id=\"schedulename_id_visualiza_alteracao\" value=\"\" disabled>
                                    </div>
                                    <div class=\"col-4 col-s-4\">
                                        <label class=\"texto_na_mesma_linha\"><b>Schedule identifier</b></label>
                                        <input type=\"number\" style=\"width: 100%;\" name=\"scheduleidentifier\" id=\"scheduleidentifier_id_visualiza_alteracao\" value=\"\" disabled>
                                    </div>
                                    <div class=\"col-4 col-s-4\">
                                        <label class=\"texto_na_mesma_linha\"><b>Major frame seconds</b></label>
                                        <input type=\"text\" style=\"width: 100%;\" name=\"majorframeseconds\"  id=\"majorframeseconds_id_visualiza_alteracao\" value=\"\" disabled>
                                    </div>
                                </div>
                                <div class=\"row\">
                                    <div class=\"col-2 col-s-2\">
                                        <div style=\"display:flex;\">
                                            <label class=\"texto_na_mesma_linha\"><b>Initial module schedule</b></label>
                                            <input type=\"checkbox\" name=\"initialmodulesched\" id=\"initialmodulesched_id_visualiza_alteracao\" value=\"\" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";

return $htmlretorno;
