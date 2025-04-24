<div id="gestaoautenticacao" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>Gestão de Autenticação</h1>
        </div>
        <div id="gestaoautenticacao_pesquisa" class="box_alt_cria_pesq">
            <form id="form_gestaoautenticacao_pesquisa">
                <div>
                    <h4>Pesquisa</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Utilizador:</b></label>
                                <input type="text" style="width:100%;" name="emailutilizador_aut" id="emailutilizador_id_aut" minlength="11" maxlength="30" class="dados_elem_form_gestaoautenticacao_pesquisa" value="" pattern=".+@ariga\.com" required>
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
                        <span id="form_mensagem_gestaoautenticacao_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="gestaoautenticacao_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoautenticacao_pesquisa_b" onclick="gestaoautenticacao_pesquisa_f();return false;">Pesquisar utilizador</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div id="gestaoautenticacao_alteracao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_gestaoautenticacao_alteracao">
                <?php $acao = "A"; ?>
                <div>
                    <h4>Alteração</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Atívo:</b></label>
                                <div style="display:flex;">
                                    <?php
                                    $campo_id = "activo_id_alt_aut";
                                    $campo_nome = "activo_alt_aut";
                                    $class_form = "dados_elem_form_gestaoautenticacao_alteracao";
                                    include "View/obj/dropdown_activo.php";
                                    ?>
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
                        <span id="form_mensagem_gestaoautenticacao_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoautenticacao_alteracao_b" onclick="gestaoautenticacao_alteracao_f()">Alterar</button>
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
                <button type="button" class="botao_geral" id="gestaoautenticacao_fechar_b" onclick="gestaoautenticacao_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>