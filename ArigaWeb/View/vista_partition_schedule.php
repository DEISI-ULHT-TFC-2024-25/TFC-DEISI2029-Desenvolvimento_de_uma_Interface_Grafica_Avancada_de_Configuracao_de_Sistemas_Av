<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";
$campo_id = "";
$campo_nome = "";
$htmlopcoes = "";
$classe_form = "dados_elem_dbox_partition_schedule";

$htmlretorno = "<p class=\"margem_padding_0 tamanhofonte_3px\">
                    &nbsp;
                </p>
                <div class=\"box_alt_cria_pesq\">
                    <div>
                        <h4 style=\"margin:0; padding:1px;\">Selected Partition schedule</h4>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-6 col-s-6\">
                            <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Period duration seconds</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"perioddurationseconds\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}\" id=\"perioddurationseconds_id_partitionschedule_configura_alteracao_box\" pattern=\"[0-9]{1}(\.)(\d{5})$\" class=\"dados_elem_dbox_partition_schedule\" value=\"\" data-required='S'>
                        </div>
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Period seconds</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"periodseconds\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}\" id=\"periodseconds_id_partitionschedule_configura_alteracao_box\" pattern=\"[0-9]{1}(\.)(\d{5})$\" class=\"dados_elem_dbox_partition_schedule\" value=\"\" data-required='S'>
                        </div>
                    </div>
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
                </div>
                <div class=\"box_alt_cria_pesq\">
                    <div>
                        <h4 style=\"margin:0; padding:1px;\">Selected window configuration</h4>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Window identifier</b></label>
                            <input type=\"number\" style=\"width: 100%;\" name=\"windowidentifier\" id=\"windowidentifier_id_windowconfiguration_configura_alteracao_box\" min=\"1\" class=\"dados_elem_dbox_partition_schedule\" value=\"\" required data-required='S'>
                        </div>
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Cores</b></label>
                            <input type=\"number\" style=\"width: 100%;\" name=\"cores\" id=\"cores_id_windowconfiguration_configura_alteracao_box\" min=\"1\" class=\"dados_elem_dbox_partition_schedule\" value=\"\" required data-required='S'>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <p class=\"margem_padding_0 tamanhofonte_3px\">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>";


return $htmlretorno;
