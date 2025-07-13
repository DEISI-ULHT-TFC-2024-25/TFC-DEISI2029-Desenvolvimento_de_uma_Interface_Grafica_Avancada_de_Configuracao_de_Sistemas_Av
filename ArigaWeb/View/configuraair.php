<div id="configura" class="templateform_geral">

    <div id="mydivmsg2">
        <div id="dialog_msg2" class="row">
            <div class="col-12 col-s-12">
                <dialog id="dialog-box_msg2" class="bgbox_msg">
                    <div>
                        <h4 style="margin-top:3px;margin-bottom:5px;">Aviso</h4>
                    </div>

                    <div class="row">
                        <div class="col-12 col-s-12">
                            <span id="form_mensagem_msg2" class="form_inf_geral"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button style="margin-top:5px;" type="button" class="botao_geral" onclick="document.getElementById('dialog-box_msg2').close();">Fechar</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    </div>

    <div id="dialog_partitions" class="row">
        <div class="col-12 col-s-12">
            <dialog id="dialog-box" class="bgbox">
                <?php $classe_form = "dados_elem_dbox_partition" ?>
                <div class="box_alt_cria_pesq">
                    <div class="row">
                        <div id="conteudo_vista" class="col-12 col-s-12">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p style="margin:0; padding:1px;"><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <span id="form_dialog_partitions" class="form_inf_geral"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="inserir_partition_f();">Inserir</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="document.getElementById('dialog-box').close();">Fechar</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    </div>

    <div id="dialog_partitionschedule" class="row">
        <div class="col-12 col-s-12">
            <dialog id="dialog-box2" class="bgbox">
                <?php $classe_form = "dados_elem_dbox_partitionschedule" ?>
                <div class="box_alt_cria_pesq">
                    <div class="row">
                        <div id="conteudo_vista2" class="col-12 col-s-12">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p style="margin:0; padding:1px;"><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <span id="form_dialog_partitionschedule" class="form_inf_geral"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="inserir_partitionschedule_f();">Inserir</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="document.getElementById('dialog-box2').close();">Fechar</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    </div>

    <div id="dialog_windowschedule" class="row">
        <div class="col-12 col-s-12">
            <dialog id="dialog-box3" class="bgbox">
                <?php $classe_form = "dados_elem_dbox_windowschedule" ?>
                <div class="box_alt_cria_pesq">
                    <div class="row">
                        <div id="conteudo_vista3" class="col-12 col-s-12">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p style="margin:0; padding:1px;"><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <span id="form_dialog_windowschedule" class="form_inf_geral"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="inserir_windowschedule_f();">Inserir</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" onclick="document.getElementById('dialog-box3').close();">Fechar</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    </div>

    <div class="box_alt_cria_pesq">
        <div>
            <h1>AIR</h1>
        </div>
        <div id="configura_pesquisa" class="box_alt_cria_pesq">
            <form id="form_configura_pesquisa">
                <?php $acao = "P";
                $classe_form = "dados_elem_form_configura_pesquisa" ?>
                <div>
                    <h4>Configuration</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Pesquise configuração:</b></label>
                                <div class="CONF" data-dd="xmlconf_id_configura_pesquisa" data-activo="N" data-multi="N">
                                    <?php
                                    $campo_id = "xmlconf_id_configura_pesquisa";
                                    $campo_nome = "xmlconf_configura_pesquisa";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_gestaoair("CONF", "N", "CONF");
                                    echo $gestao_inf->gera_dropdown_gestaoair($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("xmlconf_id_configura_pesquisa", temp);
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_configura_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="configura_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div style="display:flex; margin-top:10px; margin-bottom:10px;">
                            <span id="nova_configuracao_id" class="novoregisto" onclick="configura_abrir_criacao_f();">Mostra - Inserir nova configuração</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="obtem_configura_local_b" onclick="obtem_configura_local_f();return false;">Carrega configuração guardada localmente</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="configura_pesquisa_b" onclick="configura_pesquisa_f();return false;">Pesquisar</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>

        <div id="configura_alteracao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_configura_alteracao">
                <?php /*$acao = "A";*/ $classe_form = "dados_elem_form_configura_alteracao" ?>
                <div>
                    <h4>Alteração</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_configura_alteracao" class="form_inf_geral"></span>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div id="tab0" data-tab="0" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-1 col-s-1 tab tab_left tabactiva">
                        <span class="tabfontspan">Configuration</span>
                    </div>
                    <div id="tab1" data-tab="1" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-2 col-s-2 tab tabinactiva">
                        <span class="tabfontspan texto_na_mesma_linha">Arinc653 Module</span>
                    </div>
                    <div id="tab2" data-tab="2" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-2 col-s-2 tab tabinactiva">
                        <span class="tabfontspan texto_na_mesma_linha">Air Configuration</span>
                    </div>
                    <div id="tab3" data-tab="3" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-2 col-s-2 tab tabinactiva">
                        <span class="tabfontspan texto_na_mesma_linha">Module Schedule</span>
                    </div>
                    <div id="tab4" data-tab="4" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-1 col-s-1 tab tabinactiva">
                        <span class="tabfontspan">Partitions</span>
                    </div>
                    <div id="tab5" data-tab="5" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-2 col-s-2 tab tabinactiva">
                        <span class="tabfontspan texto_na_mesma_linha">Partitions Schedules</span>
                    </div>
                </div>
                <div id="tabcontext0" class="box_alt_cria_pesq">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <label><span class="aviso">*</span class="texto_na_mesma_linha"><b>Arch name:</b></label>
                                    <input type="text" style="width: 100%;" name="archname" id="archname_id_configura_alteracao" minlength="1" maxlength="20" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Debug monitor:</b></label>
                                    <div class="DM" data-dd="debugmonitor_id_configura_alteracao" data-activo="N">
                                        <?php
                                        $campo_id = "debugmonitor_id_configura_alteracao";
                                        $campo_nome = "debugmonitor";
                                        $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("DM", "N", "DM");
                                        echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                        ?>
                                        <script>
                                            temp = '<?php echo $principiodd; ?>';
                                            control_local.setdd("debugmonitor_id_configura_alteracao", temp);
                                        </script>
                                    </div>
                                </div>
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Target board:</b></label>
                                    <div class="TB" data-dd="targetboard_id_configura_alteracao" data-activo="N">
                                        <?php
                                        $campo_id = "targetboard_id_configura_alteracao";
                                        $campo_nome = "targetboard";
                                        $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("TB", "N", "TB");
                                        echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                        ?>
                                        <script>
                                            temp = '<?php echo $principiodd; ?>';
                                            control_local.setdd("targetboard_id_configura_alteracao", temp);
                                        </script>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 col-s-6">
                                    <label><span class="aviso">*</span><b>Fpu:</b></label>
                                    <div class="STA" data-dd="fpu_id_configura_alteracao" data-activo="N">
                                        <?php
                                        $campo_id = "fpu_id_configura_alteracao";
                                        $campo_nome = "fpu";
                                        $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("STA", "N", "STA");
                                        echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                        ?>
                                        <script>
                                            temp = '<?php echo $principiodd; ?>';
                                            control_local.setdd("fpu_id_configura_alteracao", temp);
                                        </script>
                                    </div>
                                </div>
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Architecture type:</b></label>
                                    <div class="AN" data-dd="architecturetype_id_configura_alteracao" data-activo="N">
                                        <?php
                                        $campo_id = "architecturetype_id_configura_alteracao";
                                        $campo_nome = "architecturetype";
                                        $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("AN", "N", "AN");
                                        echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                        ?>
                                        <script>
                                            temp = '<?php echo $principiodd; ?>';
                                            control_local.setdd("architecturetype_id_configura_alteracao", temp);
                                        </script>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-top:15px;">
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label><span class="aviso">*</span><b>Bare</b></label>
                                        <input type="checkbox" name="bare" id="bare_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Install rtos</b></label>
                                        <input type="checkbox" name="installrtos" id="installrtos_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Posix rtems5</b></label>
                                        <input type="checkbox" name="posixrtems5" id="posixrtems5_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Rtems 48i</b></label>
                                        <input type="checkbox" name="rtems48i" id="rtems48i_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Rtems 5</b></label>
                                        <input type="checkbox" name="rtems5" id="rtems5_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="configuration_configura_alteracao_b" onclick="val_save_configuration_f();return false;">Validar e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>


                <div id="tabcontext1" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Module name</b></label>
                                    <input type="text" style="width: 100%;" name="modulename" id="modulename_id_configura_alteracao" minlength="1" maxlength="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                                <div class="col-6 col-s-6">
                                    <label><span class="aviso">*</span><b>xmlns:xsi</b></label>
                                    <input type="text" style="width: 100%;" name="xmlnsxsi" id="xmlnsxsi_id_configura_alteracao" minlength="0" maxlength="250" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="arinc653module_configura_alteracao_b" onclick="val_save_arinc653module_f();return false;">Validar e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>

                <div id="tabcontext2" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Required cores</b></label>
                                    <input type="number" style="width: 100%;" name="requiredcores" id="requiredcores_id_configura_alteracao" min="1" max="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                                <div class="col-6 col-s-6">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Ticks per second</b></label>
                                    <input type="number" style="width: 100%;" name="tickspersecond" id="tickspersecond_id_configura_alteracao" minl="0" max="2000" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="airconfiguration_configura_alteracao_b" onclick="val_save_airconfiguration_f();return false;">Validar e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>

                <div id="tabcontext3" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-4 col-s-4">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Schedule name</b></label>
                                    <input type="text" style="width: 100%;" name="schedulename" id="schedulename_id_configura_alteracao" minlength="1" maxlength="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                                <div class="col-4 col-s-4">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Schedule identifier</b></label>
                                    <input type="number" style="width: 100%;" name="scheduleidentifier" id="scheduleidentifier_id_configura_alteracao" min="1" max="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                                <div class="col-4 col-s-4">
                                    <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Major frame seconds</b></label>
                                    <input type="text" style="width: 100%;" name="majorframeseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="majorframeseconds_id_configura_alteracao" pattern="[0-9]{1}(\.)(\d{5})$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2 col-s-2">
                                    <div style="display:flex;">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Initial module schedule</b></label>
                                        <input type="checkbox" name="initialmodulesched" id="initialmodulesched_id_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="moduleschedule_configura_alteracao_b" onclick="val_save_moduleschedule_f();return false;">Validar e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>

                <div id="tabcontext4" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <div id="configura_partitions_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <div style="display:flex; margin-top:10px; margin-bottom:10px;">
                                        <span id="nova_partition_id" class="novoregisto" onclick="configura_nova_partition_f();">Inserir nova partition</span>
                                        <span id="apagar_partition_id" class="novoregisto_varios" onclick="apagar_partition_f();">Apagar partition</span>
                                        <span id="repor_partition_id" class="novoregisto_varios" onclick="repor_partition_f();">Repor partition</span>
                                        <span id="alterar_partition_id" class="novoregisto_varios" onclick="alterar_partition_f();">Alterar partition</span>
                                    </div>
                                </div>
                            </div>

                            <div id="tabcontext4_partitions_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                <div>
                                    <h4>Selected Partition</h4>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Criticality</b></label>
                                        <div class="CRY" data-dd="criticality_id_partitions_configura_alteracao" data-activo="N">
                                            <?php
                                            $campo_id = "criticality_id_partitions_configura_alteracao";
                                            $campo_nome = "fpu";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("CRY", "N", "CRY");
                                            echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd("criticality_id_partitions_configura_alteracao", temp);
                                            </script>
                                        </div>
                                    </div>
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Entrypoint</b></label>
                                        <input type="text" style="width: 100%;" name="entrypoint" id="entrypoint_id_partitions_configura_alteracao" minlength="1" maxlength="30" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-s-6">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Partition name</b></label>
                                        <input type="text" style="width: 100%;" name="partitionname" id="partitionname_id_partitions_configura_alteracao" minlength="1" maxlength="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                    </div>
                                    <div class="col-6 col-s-6">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Partition identifier</b></label>
                                        <input type="number" style="width: 100%;" name="partitionidentifier" id="partitionidentifier_id_partitions_configura_alteracao" min="1" max="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2 col-s-2">
                                        <div style="display:flex;">
                                            <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>System partition</b></label>
                                            <input type="checkbox" name="systempartition" id="systempartition_id_partitions_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <p class="margem_padding_0 tamanhofonte_3px">
                                        &nbsp;
                                    </p>
                                </div>
                            </div>
                            <div id="tabcontext4_partitionconfiguration_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                <div>
                                    <h4>Selected Partition configuration</h4>
                                </div>
                                <div class="row">
                                    <div class="col-2 col-s-2">
                                        <label><span class="aviso">*</span><b>Cores</b></label>
                                        <input type="number" style="width: 100%;" name="cores" id="cores_id_partitionconfiguration_configura_alteracao" min="1" maxlength="60" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Cache</b></label>
                                        <input type="text" style="width: 100%;" name="cache" id="cache_id_partitionconfiguration_configura_alteracao" minlength="1" maxlength="600" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                    <div class="col-4 col-s-4">
                                        <div data-dd="libs_partitionconfiguration_configura_alteracao" data-multi="S" data-activo="N" class="LIB">
                                            <?php
                                            $campo_id = "libs_partitionconfiguration_configura_alteracao";
                                            $campo_label = "Libs";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao("LIB", "N", "LIB", $campo_id);
                                            echo $gestao_inf->gera_dropdown_multiselecao($campo_id, true, $htmlopcoes, $campo_label, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd('libs_partitionconfiguration_configura_alteracao', temp);
                                            </script>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 col-s-4">
                                        <div data-dd="personality_partitionconfiguration_configura_alteracao" data-multi="S" data-activo="N" class="PER">
                                            <?php
                                            $campo_id = "personality_partitionconfiguration_configura_alteracao";
                                            $campo_label = "Personality";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao("PER", "N", "PER", $campo_id);
                                            echo $gestao_inf->gera_dropdown_multiselecao($campo_id, true, $htmlopcoes, $campo_label, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd('personality_partitionconfiguration_configura_alteracao', temp);
                                            </script>
                                        </div>
                                    </div>

                                    <div class="col-4 col-s-4">
                                        <div data-dd="devices_partitionconfiguration_configura_alteracao" data-multi="S" data-activo="N" class="DEV">
                                            <?php
                                            $campo_id = "devices_partitionconfiguration_configura_alteracao";
                                            $campo_label = "Devices";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao("DEV", "N", "DEV", $campo_id);
                                            echo $gestao_inf->gera_dropdown_multiselecao($campo_id, true, $htmlopcoes, $campo_label, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd('devices_partitionconfiguration_configura_alteracao', temp);
                                            </script>
                                        </div>
                                    </div>

                                    <div class="col-4 col-s-4">
                                        <div data-dd="permissions_partitionconfiguration_configura_alteracao" data-multi="S" data-activo="N" class="PMY">
                                            <?php
                                            $campo_id = "permissions_partitionconfiguration_configura_alteracao";
                                            $campo_label = "Permissions";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_multiselecao("PMY", "N", "PMY", $campo_id);
                                            echo $gestao_inf->gera_dropdown_multiselecao($campo_id, true, $htmlopcoes, $campo_label, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd('permissions_partitionconfiguration_configura_alteracao', temp);
                                            </script>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <p class="margem_padding_0 tamanhofonte_3px">
                                            &nbsp;
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <p class="margem_padding_0 tamanhofonte_3px">
                                        &nbsp;
                                    </p>
                                </div>
                            </div>

                            <div id="tabcontext4_partitionconfiguration_memory_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                <div>
                                    <h4>Selected Partition configuration memory</h4>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <label><span class="aviso">*</span><b>Size</b></label>
                                        <input type="text" style="width: 100%;" name="cores" pattern="[0-9]{1}(x)(\d{6})$" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é 0x000000');}" id="size_id_partitionconfiguration_memory_configura_alteracao" min="8" maxlength="8" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <p class="margem_padding_0 tamanhofonte_3px">
                                            &nbsp;
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <p class="margem_padding_0 tamanhofonte_3px">
                                        &nbsp;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="partition_configura_alteracao_b" onclick="val_save_partition_f();return false;">Validar alterações e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>

                <div id="tabcontext5" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <div id="configura_partitionschedule_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <div style="display:flex; margin-top:10px; margin-bottom:10px;">
                                        <span id="nova_partitionschedule_id" class="novoregisto" onclick="configura_nova_partitionschedule_f();">Inserir nova partitionschedule</span>
                                        <span id="apagar_partitionschedule_id" class="novoregisto_varios" onclick="apagar_partitionschedule_f();">Apagar partitionschedule</span>
                                        <span id="repor_partitionschedule_id" class="novoregisto_varios" onclick="repor_partitionschedule_f();">Repor partitionschedule</span>
                                        <span id="alterar_partitionschedule_id" class="novoregisto_varios" onclick="alterar_partitionschedule_f();">Alterar partitionschedule</span>
                                    </div>
                                </div>
                            </div>

                            <div id="tabcontext5_partitionschedule_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                <div>
                                    <h4>Selected Partition schedule</h4>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-s-6">
                                        <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Period duration seconds</b></label>
                                        <input type="text" style="width: 100%;" name="perioddurationseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="perioddurationseconds_id_partitionschedule_configura_alteracao" pattern="[0-9]{1}(\.)(\d{5})$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                    </div>
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Period seconds</b></label>
                                        <input type="text" style="width: 100%;" name="periodseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="periodseconds_id_partitionschedule_configura_alteracao" pattern="[0-9]{1}(\.)(\d{5})$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <div id="configura_windowchedule_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <div style="display:flex; margin-top:10px; margin-bottom:10px;">
                                            <span id="nova_windowschedule_id" class="novoregisto" onclick="configura_nova_windowschedule_f();">Inserir nova windowschedule</span>
                                            <span id="apagar_windowschedule_id" class="novoregisto_varios" onclick="apagar_windowschedule_f();">Apagar windowschedule</span>
                                            <span id="repor_windowschedule_id" class="novoregisto_varios" onclick="repor_windowschedule_f();">Repor windowschedule</span>
                                            <span id="alterar_windowschedule_id" class="novoregisto_varios" onclick="alterar_windowschedule_f();">Alterar windowschedule</span>
                                        </div>
                                    </div>
                                </div>

                                <div id="tabcontext5_windowchedule_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                    <div>
                                        <h4>Selected window schedule</h4>
                                    </div>

                                    <div class="row">
                                        <div class="col-3 col-s-3">
                                            <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Window identifier</b></label>
                                            <input type="number" style="width: 100%;" name="windowidentifier" id="windowidentifier_id_windowchedule_configura_alteracao" min="1" max="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                        </div>
                                        <div class="col-3 col-s-3">
                                            <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Core identifier</b></label>
                                            <input type="number" style="width: 100%;" name="coreidentifier" id="coreidentifier_id_windowchedule_configura_alteracao" min="1" max="20" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                        </div>
                                        <div class="col-6 col-s-6">
                                            <label class="texto_na_mesma_linha"><span class="aviso">*</span><b>Partition:</b></label>
                                            <div id="partition_id_reset" class="PARTI" data-dd="partition_id_windowchedule_configura_alteracao" data-dd-class="dados_elem_form_configura_alteracao" data-dd-name="partition_id_windowchedule" data-activo="N" data-obrigatorio="S">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 col-s-6">
                                            <label><span class="aviso">*</span><b>Window start seconds</b></label>
                                            <input type="text" style="width: 100%;" name="windowstartseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="windowstartseconds_id_windowchedule_configura_alteracao" pattern="[0-9]{1}(\.)(\d{5})$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                        </div>
                                        <div class="col-6 col-s-6">
                                            <label><span class="aviso">*</span><b>Window duration seconds</b></label>
                                            <input type="text" style="width: 100%;" name="windowdurationseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="windowdurationseconds_id_windowchedule_configura_alteracao" pattern="[0-9]{1}(\.)(\d{5})$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-2 col-s-2">
                                            <div style="display:flex;">
                                                <label><span class="aviso">*</span><b>Partition period start</b></label>
                                                <input type="checkbox" name="partitionperiodstart" id="partitionperiodstart_id_windowchedule_configura_alteracao" class="dados_elem_form_configura_alteracao" value="" data-required="S" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-s-12">
                                            <p class="margem_padding_0 tamanhofonte_3px">
                                                &nbsp;
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <p class="margem_padding_0 tamanhofonte_3px">
                                            &nbsp;
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <p class="margem_padding_0 tamanhofonte_3px">
                                        &nbsp;
                                    </p>
                                </div>
                            </div>

                            <div id="tabcontext5_windowconfiguration_alt" class="box_alt_cria_pesq tabcontextinactiva">
                                <div>
                                    <h4>Selected window configuration</h4>
                                </div>
                                <div class="row">
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Window identifier</b></label>
                                        <input type="number" style="width: 100%;" name="windowidentifier" id="windowidentifier_id_windowconfiguration_configura_alteracao" min="1" maxlength="60" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                    <div class="col-6 col-s-6">
                                        <label><span class="aviso">*</span><b>Cores</b></label>
                                        <input type="number" style="width: 100%;" name="cores" id="cores_id_windowconfiguration_configura_alteracao" min="1" maxlength="60" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-s-12">
                                        <p class="margem_padding_0 tamanhofonte_3px">
                                            &nbsp;
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <p class="margem_padding_0 tamanhofonte_3px">
                                        &nbsp;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button type="button" class="botao_geral" id="partitionschedule_configura_alteracao_b" onclick="val_save_partitionschedule_f();return false;">Validar alterações e guardar localmente</button>
                        </div>
                        <div class="col-12 col-s-12">
                            <p class="margem_padding_0 tamanhofonte_3px">
                                &nbsp;
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="configura_alteracao_b" onclick="configura_alteracao_f()">Alterar na BD</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>

        <div id="configura_criacao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_configura_criacao">
                <?php $acao = "C";
                $classe_form = "dados_elem_form_configura_criacao" ?>
                <div>
                    <h4>Criação</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Arch name:</b></label>
                                <input type="text" style="width: 100%;" name="archname" id="archname_id_configura_criacao" minlength="1" maxlength="30" class="dados_elem_form_configura_criacao" value="" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Debug monitor:</b></label>
                                <div class="DM" data-dd="debugmonitor_id_configura_criacao" data-activo="S">
                                    <?php
                                    $campo_id = "debugmonitor_id_configura_criacao";
                                    $campo_nome = "debugmonitor";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("DM", "S", "DM_A");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("debugmonitor_id_configura_criacao", temp);
                                    </script>
                                </div>
                            </div>
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Target board:</b></label>
                                <div class="TB" data-dd="targetboard_id_configura_criacao" data-activo="S">
                                    <?php
                                    $campo_id = "targetboard_id_configura_criacao";
                                    $campo_nome = "targetboard";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("TB", "S", "TB_A");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("targetboard_id_configura_criacao", temp);
                                    </script>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Fpu:</b></label>
                                <div class="STA" data-dd="fpu_id_configura_criacao" data-activo="S">
                                    <?php
                                    $campo_id = "fpu_id_configura_criacao";
                                    $campo_nome = "fpu";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("STA", "S", "STA_A");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("fpu_id_configura_criacao", temp);
                                    </script>
                                </div>
                            </div>
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Architecture type:</b></label>
                                <div class="AN" data-dd="architecturetype_id_configura_criacao" data-activo="S">
                                    <?php
                                    $campo_id = "architecturetype_id_configura_criacao";
                                    $campo_nome = "architecturetype";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("AN", "S", "AN_A");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("architecturetype_id_configura_criacao", temp);
                                    </script>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-top:15px;">
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Bare</b></label>
                                    <input type="checkbox" name="bare" id="bare_id_configura_criacao" class="dados_elem_form_configura_criacao" onclick="control_tabs.atribui_value(this);" value="false" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Install rtos</b></label>
                                    <input type="checkbox" name="installrtos" id="installrtos_id_configura_criacao" class="dados_elem_form_configura_criacao" onclick="control_tabs.atribui_value(this);" value="false" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Posix rtems5</b></label>
                                    <input type="checkbox" name="posixrtems5" id="posixrtems5_id_configura_criacao" class="dados_elem_form_configura_criacao" onclick="control_tabs.atribui_value(this);" value="false" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Rtems 48i</b></label>
                                    <input type="checkbox" name="rtems48i" id="rtems48i_id_configura_criacao" class="dados_elem_form_configura_criacao" onclick="control_tabs.atribui_value(this);" value="false" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Rtems 5</b></label>
                                    <input type="checkbox" name="rtems5" id="rtems5_id_configura_criacao" class="dados_elem_form_configura_criacao" onclick="control_tabs.atribui_value(this);" value="false" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_configura_criacao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="configura_criacao_b" onclick="configura_criacao_f()">Criar nova configuração</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <div class="col-12 col-s-12">
                <button type="button" class="botao_geral" id="configura_fechar_b" onclick="configura_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>