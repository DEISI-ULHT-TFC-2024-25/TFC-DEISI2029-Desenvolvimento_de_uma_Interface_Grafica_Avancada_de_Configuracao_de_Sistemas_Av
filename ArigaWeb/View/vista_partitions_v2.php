<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";
$campo_id = "";
$campo_nome = "";
$htmlopcoes = "";
$classe_form = "dados_elem_visualiza_p_nova";

if (isset($_SESSION['GESTAO_INFORMACAO'])) {
    $gestao_inf = unserialize($_SESSION['GESTAO_INFORMACAO']);
} else {
    return "erro a obter o objeto que gere a informação guardada em memória!...";
}

$htmlretorno = "<p class=\"margem_padding_0 tamanhofonte_3px\">
                    &nbsp;
                </p>
                <div class=\"box_alt_cria_pesq\">
                    <div>
                        <h4 style=\"margin:0; padding:1px;color:white\">Add new Partition</h4>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Criticality</b></label>
                            <div class=\"\" data-dd=\"criticality_id_visualiza_p_nova\" data-activo=\"N\">";

$campo_id = "criticality_id_visualiza_p_nova";
$campo_nome = "criticality";
$htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("CRY", "N", "CRY");
$htmlretorno .= $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);

$htmlretorno .=          "</div>
                        </div>
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Entrypoint</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"entrypoint\" id=\"entrypoint_id_visualiza_p_nova\" minlength=\"1\" maxlength=\"30\" class=\"dados_elem_visualiza_p_nova\" value=\"\" required data-required='S'>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-6 col-s-6\">
                            <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Partition name</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"partitionname\" id=\"partitionname_id_visualiza_p_nova\" minlength=\"1\" maxlength=\"20\" class=\"dados_elem_visualiza_p_nova\" value=\"\" data-required='S'>
                        </div>
                        <div class=\"col-6 col-s-6\">
                            <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>Partition identifier</b></label>
                            <input type=\"number\" style=\"width: 100%;\" name=\"partitionidentifier\" id=\"partitionidentifier_id_visualiza_p_nova\" min=\"1\" max=\"20\" class=\"dados_elem_visualiza_p_nova\" value=\"\" data-required='S'>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-2 col-s-2\">
                            <div style=\"display:flex;\">
                                <label class=\"texto_na_mesma_linha\"><span class=\"aviso\">*</span><b>System partition</b></label>
                                <input type=\"checkbox\" name=\"systempartition\" id=\"systempartition_id_visualiza_p_nova\" class=\"dados_elem_visualiza_p_nova\" value=\"\" data-required=\"S\" />
                            </div>
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
                        <h4 style=\"margin:0; padding:1px;\">Partition configuration</h4>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-2 col-s-2\">
                            <label><span class=\"aviso\">*</span><b>Cores</b></label>
                            <input type=\"number\" style=\"width: 100%;\" name=\"cores\" id=\"cores_id_visualiza_p_nova\" min=\"1\" maxlength=\"60\" class=\"dados_elem_visualiza_p_nova\" value=\"\" required data-required='S'>
                        </div>
                        <div class=\"col-6 col-s-6\">
                            <label><span class=\"aviso\">*</span><b>Cache</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"cache\" id=\"cache_id_visualiza_p_nova\" minlength=\"1\" maxlength=\"600\" class=\"dados_elem_visualiza_p_nova\" value=\"\" required data-required='S'>
                        </div>
                        <div class=\"col-4 col-s-4\">
                            <div data-dd=\"libs_visualiza_p_nova\" data-multi=\"S\" data-activo=\"N\" class=\"\">";

$campo_id = "libs_visualiza_p_nova";
$campo_label = "Libs";
$htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao_sem_guardar("LIB", "N", $campo_id);
$htmlretorno .= $gestao_inf->gera_dropdown_multiselecao_sem_guardar($campo_id, true, $htmlopcoes, $campo_label);


$htmlretorno .=            "</div>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-4 col-s-4\">
                            <div data-dd=\"personality_visualiza_p_nova\" data-multi=\"S\" data-activo=\"N\" class=\"\">";

$campo_id = "personality_visualiza_p_nova";
$campo_label = "Personality";
$htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao_sem_guardar("PER", "N", $campo_id);
$htmlretorno .= $gestao_inf->gera_dropdown_multiselecao_sem_guardar($campo_id, true, $htmlopcoes, $campo_label);


$htmlretorno .=            "</div>
                        </div>
                        <div class=\"col-4 col-s-4\">
                            <div data-dd=\"devices_visualiza_p_nova\" data-multi=\"S\" data-activo=\"N\" class=\"\">";

$campo_id = "devices_visualiza_p_nova";
$campo_label = "Devices";
$htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao_sem_guardar("DEV", "N", $campo_id);
$htmlretorno .= $gestao_inf->gera_dropdown_multiselecao_sem_guardar($campo_id, true, $htmlopcoes, $campo_label);


$htmlretorno .=             "</div>
                        </div>
                        <div class=\"col-4 col-s-4\">
                            <div data-dd=\"permissions_visualiza_p_nova\" data-multi=\"S\" data-activo=\"N\" class=\"\">";

$campo_id = "permissions_visualiza_p_nova";
$campo_label = "Permissions";
$htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao_sem_guardar("PMY", "N", $campo_id);
$htmlretorno .= $gestao_inf->gera_dropdown_multiselecao_sem_guardar($campo_id, true, $htmlopcoes, $campo_label);


$htmlretorno .=             "</div>
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
                        <h4 style=\"margin:0; padding:1px;\">Partition memory</h4>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <label><span class=\"aviso\">*</span><b>Size</b></label>
                            <input type=\"text\" style=\"width: 100%;\" name=\"cores\" pattern=\"[0-9]{1}(x)(\d{6})$\" onchange=\"if(!this.checkValidity()){alert('Deve respeitar o formato é 0x000000');}\" id=\"size_id_visualiza_p_nova\" min=\"8\" maxlength=\"8\" class=\"dados_elem_visualiza_p_nova\" value=\"\" required data-required='S'>
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
