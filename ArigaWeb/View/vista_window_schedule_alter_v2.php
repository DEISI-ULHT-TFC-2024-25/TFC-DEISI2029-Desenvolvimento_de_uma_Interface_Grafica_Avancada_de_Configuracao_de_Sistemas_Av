<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";
$campo_id = "";
$campo_nome = "";
$htmlopcoes = "";
$classe_form = "dados_elem_visualiza_ws_alter";

$htmlretorno = "<p class=\"margem_padding_0 tamanhofonte_3px\">
                    &nbsp;
                </p>
                <div class=\"box_alt_cria_pesq\">
                    <div>
                        <h4 id=\"title_id_visualiza_ws_alter\" style=\"color:white\">Alter window schedule</h4>
                    </div>
                    <form id=\"form_visualiza_ws_alter\" data-indice_ws=\"\">
                        <div class=\"row\">
                            <div class=\"col-8 col-s-8\">
                                <div style=\"display:flex;\">
                                    <label><span class=\"aviso\">*</span><b>Partition period start</b></label>
                                    <input type=\"checkbox\" name=\"partitionperiodstart\" id=\"partitionperiodstart_id_visualiza_ws_alter\" class=\"dados_elem_visualiza_ws_alter\" value=\"\" data-required=\"S\" />
                                </div>
                            </div>

                            <div class=\"col-4 col-s-4\">
                                <div style=\"display:flex;\">
                                    <label><span class=\"aviso\">*</span><b>Delete</b></label>
                                    <input type=\"checkbox\" name=\"deletews\" id=\"deletews_id_visualiza_ws_alter\" class=\"dados_elem_visualiza_ws_alter\" onchange=\"change_delete_state(this);\" value=\"0\" data-required=\"S\" />
                                </div>
                            </div>
                        </div>
                        <div class=\"row\">
                            <div class=\"col-6 col-s-6\">
                                <label><span class=\"aviso\">*</span><b>Duration seconds</b></label>
                                <input type=\"text\" style=\"width: 100%;\" name=\"windowdurationseconds\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx'); this.value = '0.00000';}\" id=\"windowdurationseconds_id_visualiza_ws_alter\" pattern=\"[0-9]{1}(\.)(\d{5})$\" class=\"dados_elem_visualiza_ws_alter\" value=\"\" data-required='S'>
                            </div>
                            <div class=\"col-6 col-s-6\">
                                <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Core identifier</b></label>
                                <input type=\"number\" style=\"width: 100%;\" name=\"coreidentifier\" id=\"coreidentifier_id_visualiza_ws_alter\" min=\"1\" max=\"20\" class=\"dados_elem_visualiza_ws_alter\" value=\"\" data-required='S' onchange=\"if(!this.checkValidity()){alert('Não pode ser superior a ' + this.getAttribute('max') + '.');this.value = this.getAttribute('max');}\">
                            </div>
                        </div>
                        <div class=\"row\">
                            <div class=\"col-12 col-s-12\">
                                <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Partition:</b></label>
                                <div id=\"partition_id_ws_alter\" class=\"\" data-dd=\"partition_id_visualiza_ws_alter\" data-dd-class=\"dados_elem_visualiza_ws_alter\" data-dd-name=\"partition_id_windowchedule\" data-activo=\"N\" data-obrigatorio=\"S\">
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
