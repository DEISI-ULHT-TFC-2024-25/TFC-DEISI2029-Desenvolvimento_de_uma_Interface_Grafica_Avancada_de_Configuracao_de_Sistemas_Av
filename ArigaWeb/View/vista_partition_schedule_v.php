<?php

include_once "Model/lib/GconexaoBD.php";
include_once "Control/lib/valida_campos_form_gen.php";
include_once "Control/lib/gestao_informacao.php";


$htmlretorno = "";

$htmlretorno = "

                    <div id=\"visualiza_ws\">
                        <div id=\"dialog_visualiza_ws\" class=\"row\">
                            <div class=\"col-12 col-s-12\">
                                <dialog id=\"dialog-box_visualiza_ws\" class=\"bgbox_visualiza\" style=\"padding-left:5px;padding-right:5px;padding-top:2px;padding-bottom:6px;\">
                                    
                                    <div class=\"row\">
                                        <div id=\"conteudo_vista_visualiza_ws\" class=\"col-12 col-s-12\">

                                        </div>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-12 col-s-12\">
                                            <button style=\"margin-top:5px;\" type=\"button\" class=\"botao_geral_v\" onclick=\"alterar_visualiza_ws();\">Alterar</button>
                                        </div>
                                        <div class=\"col-12 col-s-12\">
                                            <button style=\"margin-top:5px;\" type=\"button\" class=\"botao_geral_v\" onclick=\"document.getElementById('dialog-box_visualiza_ws').close();tipo_acao = '';\">Fechar</button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>

                    <div class=\"box_alt_cria_pesq\">
                        <div class=\"row\">
                            <div class=\"col-12 col-s-12\">
                                <p class=\"margem_padding_0 tamanhofonte_3px\">
                                    &nbsp;
                                </p>
                            </div>
                        </div>
                        <div class=\"row\">
                            <div class=\"col-12 col-s-12\">
                                <div class=\"box_alt_cria_pesq\">
                                    <div>
                                        <h4 style=\"color:white;margin-top:3px;\">Selected Partition schedule</h4>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-6 col-s-6\">
                                            <label class=\"texto_na_mesma_linha\"><b>Period duration seconds</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"perioddurationseconds\" id=\"perioddurationseconds_id_partitionschedule_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Period seconds</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"periodseconds\" id=\"periodseconds_id_partitionschedule_visualiza_alteracao\" value=\"\" disabled>
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
                                            <h4 style=\"color:white;margin-top:3px;\">Schedule partitions</h4>
                                        </div>
                                        <div class=\"row\">
                                            <div class=\"col-2 col-s-2\">
                                                <button style=\"margin-top:5px;\" id=\"add_new_partition_b\" type=\"button\" class=\"botao_geral_v\" onclick=\"add_new_partition();\">Add new partition</button>
                                            </div>
                                            <div class=\"col-3 col-s-3\">
                                                <button style=\"margin-top:5px;\" id=\"add_new_window_schedule_b\" type=\"button\" class=\"botao_geral_v\" onclick=\"add_new_window_schedule();\">Add new window schedule</button>
                                            </div>
                                        </div>
                                        <div class=\"row\">
                                            <div class=\"col-12 col-s-12\">
                                                <div style=\"overflow-x:auto;\">
                                                    <canvas id=\"visualiza_windowchedule_ihtml\" width=\"100%\" height=\"100%\"></canvas>
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
                                        <span id=\"form_mensagem_partitionschedule_visualiza_alteracao\" class=\"form_inf_geral_v\"></span>
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
                                        <h4 style=\"color:white;margin-top:3px;\">Selected window configuration</h4>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Window identifier</b></label>
                                            <input type=\"number\" style=\"width: 100%;\" name=\"windowidentifier\" id=\"windowidentifier_id_windowconfiguration_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Cores</b></label>
                                            <input type=\"number\" style=\"width: 100%;\" name=\"cores\" id=\"cores_id_windowconfiguration_visualiza_alteracao\" value=\"\">
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
                            </div>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-12 col-s-12\">
                            <button style=\"margin-top:5px;\" id=\"visualiza_alteracao_b\" type=\"button\" class=\"botao_geral\" onclick=\"visualiza_window_schedule_alterar();\">Alterar</button>
                        </div>
                    </div>";

return $htmlretorno;
