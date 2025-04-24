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
                    <h4>Configurar</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Pesquise a configuração pretendida:</b></label>
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
                        <div class="row">

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
                        <span id="form_mensagem_configura_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="configura_alteracao_b" onclick="configura_alteracao_f()">Alterar configuração</button>
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