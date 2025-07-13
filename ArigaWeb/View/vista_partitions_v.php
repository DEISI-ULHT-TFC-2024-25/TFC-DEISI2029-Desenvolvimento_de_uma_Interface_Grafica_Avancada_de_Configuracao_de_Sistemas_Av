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
                                    <div class=\"col-12 col-s-12\">
                                        <p class=\"margem_padding_0 tamanhofonte_3px\">
                                            &nbsp;
                                        </p>
                                    </div>
                                </div> 

                                <div class=\"box_alt_cria_pesq\">
                                    <div>
                                        <h4 style=\"color:white;\">Selected Partition</h4>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Criticality</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"entrypoint\" id=\"criticality_id_partitions_visualiza_alteracao\" disabled>
                                        </div>
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Entrypoint</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"entrypoint\" id=\"entrypoint_id_partitions_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-6 col-s-6\">
                                            <label class=\"texto_na_mesma_linha\"><b>Partition name</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"partitionname\" id=\"partitionname_id_partitions_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                        <div class=\"col-6 col-s-6\">
                                            <label class=\"texto_na_mesma_linha\"><b>Partition identifier</b></label>
                                            <input type=\"number\" style=\"width: 100%;\" name=\"partitionidentifier\" id=\"partitionidentifier_id_partitions_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-2 col-s-2\">
                                            <div style=\"display:flex;\">
                                                <label class=\"texto_na_mesma_linha\"><b>System partition</b></label>
                                                <input type=\"checkbox\" name=\"systempartition\" id=\"systempartition_id_partitions_visualiza_alteracao\" value=\"\" disabled />
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
                                        <h4 style=\"color:white;\">Selected Partition configuration</h4>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-2 col-s-2\">
                                            <label><b>Cores</b></label>
                                            <input type=\"number\" style=\"width: 100%;\" name=\"cores\" id=\"cores_id_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                        <div class=\"col-6 col-s-6\">
                                            <label><b>Cache</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"cache\" id=\"cache_id_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                        <div class=\"col-4 col-s-4\">
                                            <label><b>Libs</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"libs\" id=\"libs_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>
                                        </div>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-4 col-s-4\">
                                            <label><b>Personality</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"personality\" id=\"personality_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>                          
                                        </div>
                                        <div class=\"col-4 col-s-4\">
                                            <label><b>Devices</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"devices\" id=\"devices_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>                                               
                                        </div>
                                        <div class=\"col-4 col-s-4\">
                                            <label><b>Permissions</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"permissions\" id=\"permissions_partitionconfiguration_visualiza_alteracao\" value=\"\" disabled>                                               
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
                                        <h4 style=\"color:white;\">Selected Partition configuration memory</h4>
                                    </div>
                                    <div class=\"row\">
                                        <div class=\"col-12 col-s-12\">
                                            <label><b>Size</b></label>
                                            <input type=\"text\" style=\"width: 100%;\" name=\"cores\" id=\"size_id_partitionconfiguration_memory_visualiza_alteracao\" value=\"\" disabled>
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
                    </div>";

return $htmlretorno;
