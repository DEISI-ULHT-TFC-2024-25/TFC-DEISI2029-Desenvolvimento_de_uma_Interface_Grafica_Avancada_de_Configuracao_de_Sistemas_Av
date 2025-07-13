<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";
$campo_id = "";
$campo_nome = "";
$htmlopcoes = "";
$classe_form = "dados_elem_visualiza_ws_nova";

$htmlretorno = "
                <div class=\"box_alt_cria_pesq\">
                    <div>
                        <h4 style=\"color:white\">Add new window schedule</h4>
                    </div>
                    <form id=\"form_visualiza_ws_nova\">
                        <div class=\"row\">
                            <div class=\"col-6 col-s-6\">
                                <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Window identifier</b></label>
                                <input type=\"number\" style=\"width: 100%;\" name=\"windowidentifier\" id=\"windowidentifier_id_visualiza_ws_nova\" min=\"1\" max=\"20\" class=\"dados_elem_visualiza_ws_nova\" value=\"\" onchange=\"if(!this.checkValidity()){alert('Não pode ser inferior a ' + this.getAttribute('min') + '.'); this.value = this.getAttribute('min');}\" data-required='S'>
                            </div>
                            <div class=\"col-6 col-s-6\">
                                <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Core identifier</b></label>
                                <input type=\"number\" style=\"width: 100%;\" name=\"coreidentifier\" id=\"coreidentifier_id_visualiza_ws_nova\" min=\"1\" max=\"20\" class=\"dados_elem_visualiza_ws_nova\" value=\"\" data-required='S' onchange=\"if(!this.checkValidity()){alert('Não pode ser superior a ' + this.getAttribute('max') + '.');this.value = this.getAttribute('max');}\">
                            </div>
                        </div>
                        <div class=\"row\">
                                <div class=\"col-12 col-s-12\">
                                    <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Partition:</b></label>
                                    <div id=\"partition_id_ws_nova\" class=\"\" data-dd=\"partition_id_visualiza_ws_nova\" data-dd-class=\"dados_elem_visualiza_ws_nova\" data-dd-name=\"partition_id_windowchedule\" data-activo=\"N\" data-obrigatorio=\"S\">
                                    </div>
                                </div>
                            </div>   
                        <div class=\"row\">
                            <div class=\"col-6 col-s-6\">
                                <label><span class=\"aviso\">*</span><b>Start seconds</b></label>
                                <input type=\"text\" style=\"width: 100%;\" name=\"windowstartseconds\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx'); this.value = '0.00000';}\" id=\"windowstartseconds_id_visualiza_ws_nova\" pattern=\"[0-9]{1}(\.)(\d{5})$\" class=\"dados_elem_visualiza_ws_nova\" value=\"\" data-required='S'>
                            </div>
                            <div class=\"col-6 col-s-6\">
                                <label><span class=\"aviso\">*</span><b>Duration seconds</b></label>
                                <input type=\"text\" style=\"width: 100%;\" name=\"windowdurationseconds\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx'); this.value = '0.00000';}\" id=\"windowdurationseconds_id_visualiza_ws_nova\" pattern=\"[0-9]{1}(\.)(\d{5})$\" class=\"dados_elem_visualiza_ws_nova\" value=\"\" data-required='S'>
                            </div>
                        </div>
                        <div class=\"row\">
                            <div class=\"col-12 col-s-12\">
                                <div style=\"display:flex;\">
                                    <label><span class=\"aviso\">*</span><b>Partition period start</b></label>
                                    <input type=\"checkbox\" name=\"partitionperiodstart\" id=\"partitionperiodstart_id_visualiza_ws_nova\" class=\"dados_elem_visualiza_ws_nova\" value=\"\" data-required=\"S\" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <p class=\"margem_padding_0 tamanhofonte_3px\">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>
                <div class=\"row\">
                    <div class=\"col-12 col-s-12\">
                        <p class=\"margem_padding_0 tamanhofonte_3px\">
                            &nbsp;
                        </p>
                    </div>
                </div>";
return $htmlretorno;
