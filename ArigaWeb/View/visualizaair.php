<div id="visualiza" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>AIR</h1>
        </div>
        <div id="visualiza_pesquisa" class="box_alt_cria_pesq">
            <form id="form_visualiza_pesquisa">
                <?php $acao = "P";
                $classe_form = "dados_elem_form_visualiza_pesquisa" ?>
                <div>
                    <h4>Visualiza</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Pesquise a configuração pretendida:</b></label>
                                <div class="CONF" data-dd="xmlconf_id_visualiza_pesquisa" data-activo="N">
                                    <?php
                                    $campo_id = "xmlconf_id_visualiza_pesquisa";
                                    $campo_nome = "xmlconf_visualiza_pesquisa";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_gestaoair("CONF", "N", "CONF");
                                    echo $gestao_inf->gera_dropdown_gestaoair($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("xmlconf_id_visualiza_pesquisa", temp);
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
                        <span id="form_mensagem_visualiza_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="visualiza_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="visualiza_pesquisa_b" onclick="visualiza_pesquisa_f();return false;">Pesquisar</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>

        <div id="visualiza_alteracao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_visualiza_alteracao">
                <?php /*$acao = "A";*/ $classe_form = "dados_elem_form_visualiza_alteracao" ?>
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
                        <span id="form_mensagem_visualiza_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="visualiza_alteracao_b" onclick="visualiza_alteracao_f()">Alterar...</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div id="visualiza_criacao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_visualiza_criacao">
                <?php $acao = "C";
                $classe_form = "dados_elem_form_visualiza_criacao" ?>
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
                        <span id="form_mensagem_visualiza_criacao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="visualiza_criacao_b" onclick="visualiza_criacao_f()">Criar...</button>
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
                <button type="button" class="botao_geral" id="visualiza_fechar_b" onclick="visualiza_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>