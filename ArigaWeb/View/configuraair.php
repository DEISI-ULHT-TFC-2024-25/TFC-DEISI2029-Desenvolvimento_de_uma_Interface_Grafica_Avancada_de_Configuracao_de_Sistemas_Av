<div id="configura" class="templateform_geral">
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
                                <div class="CONF" data-dd="xmlconf_id_configura_pesquisa" data-activo="N">
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
                        <div id="configura_pesquisa_novo_registo" style="display:flex; margin-top:10px; margin-bottom:10px;">
                            <span id="nova_configuracao_id" class="novoregisto" onclick="configura_abrir_criacao_f();">Mostra - Inserir nova configuração</span>
                        </div>
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
                </div>
                <div class="row">
                    <div id="tab0" data-tab="0" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-1 col-s-1 tab tab_left tabactiva">
                        <span class="tabfontspan">Config</span>
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
                    <div id="tab6" data-tab="6" onclick="control_tabs.seleciona_tab_alt(this.id);" class="col-1 col-s-1 tab tabinactiva">
                        <span class="tabfontspan">Windows</span>
                    </div>
                </div>
                <div id="tabcontext0" class="box_alt_cria_pesq">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <label><span class="aviso">*</span class="texto_na_mesma_linha"><b>Arch name:</b></label>
                                    <input type="text" style="width: 100%;" name="archname" id="archname_id_configura_alteracao" minlength="11" maxlength="30" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
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
                                    <input type="text" style="width: 100%;" name="majorframeseconds" onchange="if(!this.checkValidity()){alert('Deve respeitar o formato é x.xxxxx');}" id="majorframeseconds_id_configura_alteracao" pattern="[0-9]+(.[0-9]{5})?$" class="dados_elem_form_configura_alteracao" value="" data-required='S'>
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
                                        <input type="text" style="width: 100%;" name="entrypoint" id="entrypoint_id_partitions_configura_alteracao" minlength="11" maxlength="30" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
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

                            <div id="tabcontext4_partitionconfiguration_alt" class="box_alt_cria_pesq ">
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
                                        <label><span class="aviso">*</span><b>Libs</b></label>
                                        <div class="LIB" data-dd="libs_id_partitionconfiguration_configura_alteracao" data-activo="N">
                                            <?php
                                            $campo_id = "libs_id_partitionconfiguration_configura_alteracao";
                                            $campo_nome = "libs";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("LIB", "N", "LIB");
                                            echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd("libs_id_partitionconfiguration_configura_alteracao", temp);
                                            </script>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 col-s-4">
                                        <label><span class="aviso">*</span><b>Personality</b></label>
                                        <div class="PER" data-dd="personality_id_partitionconfiguration_configura_alteracao" data-activo="N">
                                            <?php
                                            $campo_id = "personality_id_partitionconfiguration_configura_alteracao";
                                            $campo_nome = "personality";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("PER", "N", "PER");
                                            echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd("personality_id_partitionconfiguration_configura_alteracao", temp);
                                            </script>
                                        </div>
                                    </div>
                                    <div class="col-4 col-s-4">
                                        <label><span class="aviso">*</span><b>Devices</b></label>
                                        <div class="DEV" data-dd="devices_id_partitionconfiguration_configura_alteracao" data-activo="N">
                                            <?php
                                            $campo_id = "devices_id_partitionconfiguration_configura_alteracao";
                                            $campo_nome = "devices";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("DEV", "N", "DEV");
                                            echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd("devices_id_partitionconfiguration_configura_alteracao", temp);
                                            </script>
                                        </div>
                                    </div>
                                    <div class="col-4 col-s-4">
                                        <label><span class="aviso">*</span><b>Permissions</b></label>
                                        <div class="PMY" data-dd="permissions_id_partitionconfiguration_configura_alteracao" data-activo="N">
                                            <?php
                                            $campo_id = "permissions_id_partitionconfiguration_configura_alteracao";
                                            $campo_nome = "permissions";
                                            $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("PMY", "N", "PMY");
                                            echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                            ?>
                                            <script>
                                                temp = '<?php echo $principiodd; ?>';
                                                control_local.setdd("permissions_id_partitionconfiguration_configura_alteracao", temp);
                                            </script>
                                        </div>
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
                                    <label><span class="aviso">*</span><b>Teste5:</b></label>
                                    <input type="text" style="width: 100%;" name="teste5" id="teste5_id_configura_alteracao" minlength="11" maxlength="30" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                </div>

                <div id="tabcontext6" class="box_alt_cria_pesq tabcontextinactiva">
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12">
                                    <label><span class="aviso">*</span><b>Teste6:</b></label>
                                    <input type="text" style="width: 100%;" name="teste6" id="teste6_id_configura_alteracao" minlength="11" maxlength="30" class="dados_elem_form_configura_alteracao" value="" required data-required='S'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <p><span class="aviso">*&nbsp;</span>Campos obrigatórios </p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="configura_alteracao_b" onclick="configura_alteracao_f()">Alterar</button>
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
                                <input type="text" style="width: 100%;" name="archname" id="archname_id_configura_criacao" minlength="11" maxlength="30" class="dados_elem_form_configura_criacao" value="" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Debug monitor:</b></label>
                                <div class="DM" data-dd="debugmonitor_id_configura_criacao" data-activo="S">
                                    <?php
                                    $campo_id = "debugmonitor_id_configura_criacao";
                                    $campo_nome = "debugmonitor";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("DM", "N", "DM_A");
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
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("TB", "N", "TB_A");
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
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("STA", "N", "STA_A");
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
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("AN", "N", "AN_A");
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
                                    <input type="checkbox" name="bare" id="bare_id_configura_criacao" class="dados_elem_form_configura_criacao" value="" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Install rtos</b></label>
                                    <input type="checkbox" name="installrtos" id="installrtos_id_configura_criacao" class="dados_elem_form_configura_criacao" value="" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Posix rtems5</b></label>
                                    <input type="checkbox" name="posixrtems5" id="posixrtems5_id_configura_criacao" class="dados_elem_form_configura_criacao" value="" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Rtems 48i</b></label>
                                    <input type="checkbox" name="rtems48i" id="rtems48i_id_configura_criacao" class="dados_elem_form_configura_criacao" value="" />
                                </div>
                            </div>
                            <div class="col-2 col-s-2">
                                <div style="display:flex;">
                                    <label><span class="aviso">*</span><b>Rtems 5</b></label>
                                    <input type="checkbox" name="rtems5" id="rtems5_id_configura_criacao" class="dados_elem_form_configura_criacao" value="" />
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