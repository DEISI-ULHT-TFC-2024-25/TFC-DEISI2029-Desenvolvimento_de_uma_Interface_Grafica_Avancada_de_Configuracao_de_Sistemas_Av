<div id="gestaoperfil" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>Gestão de Perfíl</h1>
        </div>
        <div id="gestaoperfil_pesquisa" class="box_alt_cria_pesq">
            <form id="form_gestaoperfil_pesquisa">
                <div>
                    <h4>Pesquisa</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Utilizador:</b></label>
                                <input type="text" style="width: 100%;" name="emailutilizador_per" id="emailutilizador_id_per" minlength="11" maxlength="30" class="dados_elem_form_gestaoperfil_pesquisa" value="" pattern=".+@ariga\.com" required>
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
                        <span id="form_mensagem_gestaoperfil_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="gestaoperfil_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoperfil_pesquisa_b" onclick="gestaoperfil_pesquisa_f();return false;">Pesquisar</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div id="gestaoperfil_alteracao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_gestaoperfil_alteracao">
                <?php /*$acao = "A";*/ $classe_form = "dados_elem_form_gestaoperfil_alteracao" ?>
                <div>
                    <h4>Alteração</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Perfíl:</b></label>
                                <div class="PU" data-dd="perfil_id_alt_per" data-activo="N">
                                    <?php
                                    $campo_id = "perfil_id_alt_per";
                                    $campo_nome = "perfil_alt_per";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("PU", "N", "PU");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("perfil_id_alt_per", temp);
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
                        <span id="form_mensagem_gestaoperfil_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoperfil_alteracao_b" onclick="gestaoperfil_alteracao_f()">Alterar perfíl</button>
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
                <button type="button" class="botao_geral" id="gestaoperfil_fechar_b" onclick="gestaoperfil_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>