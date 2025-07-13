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
                                    <label><span class=\"texto_na_mesma_linha\"style=\"width: 100%;\"></span><b>Arch name:</b></label>
                                    <label class=\"inputlabel\" name=\"archname\" id=\"archname_id_visualiza_alteracao\"></label>
                                </div>
                            </div>
                            <div class=\"row\">
                                <div class=\"col-6 col-s-6\">
                                    <label class=\"texto_na_mesma_linha\" style=\"width: 100%;\"><b>Debug monitor:</b></label>
                                    <label class=\"inputlabel\" name=\"archname\" id=\"debugmonitor_id_visualiza_alteracao\"></label>
                                </div>
                                <div class=\"col-6 col-s-6\">
                                    <label class=\"texto_na_mesma_linha\" style=\"width: 100%;\"><b>Target board:</b></label>
                                    <label class=\"inputlabel\" name=\"archname\" id=\"targetboard_id_visualiza_alteracao\"></label>
                                </div>
                            </div>
                            <div class=\"row\">
                                <div class=\"col-8 col-s-8\">
                                    <label class=\"texto_na_mesma_linha\" style=\"width: 100%;\"><b>Architecture type:</b></label>
                                    <label class=\"inputlabel\" name=\"archname\" id=\"architecturetype_id_visualiza_alteracao\"></label>
                                </div>                            
                                <div class=\"col-4 col-s-4\">
                                    <label class=\"texto_na_mesma_linha\" style=\"width: 100%;\"><b>Fpu:</b></label>
                                    <label class=\"inputlabel\" name=\"archname\" id=\"fpu_id_visualiza_alteracao\"></label>
                                </div>
                            </div>
                            <div class=\"row\" style=\"margin-top:15px;\">
                                <div class=\"col-12 col-s-12\">
                                    <div style=\"display:flex;\">
                                        <label><b>Bare</b></label>
                                        <input type=\"checkbox\" name=\"bare\" id=\"bare_id_visualiza_alteracao\" value=\"\" disabled/>
                                    </div>
                                </div>
                            </div>    
                            <div class=\"row\" style=\"margin-top:15px;\">    
                                <div class=\"col-6 col-s-6\">
                                    <div style=\"display:flex;\">
                                        <label class=\"texto_na_mesma_linha\"><b>Install rtos</b></label>
                                        <input type=\"checkbox\" name=\"installrtos\" id=\"installrtos_id_visualiza_alteracao\" value=\"\" disabled/>
                                    </div>
                                </div>
                                <div class=\"col-6 col-s-6\">
                                    <div style=\"display:flex;\">
                                        <label class=\"texto_na_mesma_linha\"><b>Rtems 48i</b></label>
                                        <input type=\"checkbox\" name=\"rtems48i\" id=\"rtems48i_id_visualiza_alteracao\" value=\"\" disabled />
                                    </div>
                                </div>                            
                             
                             </div>   
                             <div class=\"row\" style=\"margin-top:15px;\">    
                                <div class=\"col-7 col-s-7\">
                                    <div style=\"display:flex;\">
                                        <label class=\"texto_na_mesma_linha\"><b>Posix rtems5</b></label>
                                        <input type=\"checkbox\" name=\"posixrtems5\" id=\"posixrtems5_id_visualiza_alteracao\" value=\"\" disabled />
                                    </div>
                                </div>
                                <div class=\"col-5 col-s-5\">
                                    <div style=\"display:flex;\">
                                        <label class=\"texto_na_mesma_linha\"><b>Rtems 5</b></label>
                                        <input type=\"checkbox\" name=\"rtems5\" id=\"rtems5_id_visualiza_alteracao\" value=\"\" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";

    return $htmlretorno;
