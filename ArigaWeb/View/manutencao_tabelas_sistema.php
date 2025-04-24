<div id="manutencao_tabelas_Sistema" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <h1>Gestão das tabelas AIR</h1>
        <div id="manutencao_tabelas_sistema_pesquisa" class="box_alt_cria_pesq ">
            <form id="form_manutencao_tabelas_sistema_pesquisa">
                <?php $acao = "";
                $classe_form = "dados_elem_form_manutencao_tabelas_sistema_pesquisa" ?>
                <div>
                    <h4>Pesquisa</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Tabela</b></label>
                                <div id="dropdown_id_manutencao_tabelas_sistema_pesquisa">
                                    <?php
                                    echo $ihtmlretorno_manutencao_tabelas_sistema_pesquisa;
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
                        <span id="form_mensagem_manutencao_tabelas_sistema_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="manutencao_tabelas_sistema_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="manutencao_tabelas_sistema_pesquisa_novo_registo_tabela" style="display:flex; margin-top:10px; margin-bottom:10px;">
                            <span id="novo_registo_tabela_sistema_id" class="novoregisto" onclick="manutencao_tabelas_sistema_abrir_criacao_f();">Mostra - Inserir novo registo \ tabela</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button class="botao_geral" type="button" id="submit_manutencao_tabelas_sistema_pesquisa" onclick="manutencao_tabelas_sistema_pesquisa_f();return false;">Pesquisar</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>

        <div id="manutencao_tabelas_sistema_alteracao" class="box_alt_cria_pesq margem_cima30">
            <form id="form_manutencao_tabelas_sistema_alteracao">
                <?php $acao = "";
                $classe_form = "dados_elem_form_manutencao_tabelas_sistema_alteracao" ?>
                <div>
                    <h4>Alteraçao</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-3 col-s-3">
                                <label><span class="aviso">*</span><b>Código:</b></label>
                                <input type="text" name="codigo_manutencao_tabelas_sistema_alteracao" id="codigo_id_manutencao_tabelas_sistema_alteracao" minlength="2" maxlength="20" class="dados_elem_form_manutencao_tabelas_sistema_alteracao" value="" data-required="S">
                            </div>
                            <div class="col-9 col-s-9">
                                <label><span class="aviso">*</span><b>Descrição:</b></label>
                                <input type="text" name="descricao_manutencao_tabelas_sistema_alteracao" id="descricao_id_manutencao_tabelas_sistema_alteracao" minlength="1" maxlength="80" class="dados_elem_form_manutencao_tabelas_sistema_alteracao" value="" data-required="S">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3 col-s-3">
                                <label><span class="aviso">*</span><b>Código Tabela:</b></label>
                                <input type="text" disabled style="width:100%;" name="codigo_tabela_manutencao_tabelas_sistema_alteracao" id="codigo_tabela_id_manutencao_tabelas_sistema_alteracao" minlength="2" maxlength="5" class="dados_elem_form_manutencao_tabelas_sistema_alteracao" value="" data-required="S">
                            </div>
                            <div class="col-9 col-s-9">
                                <label><span class="aviso">*</span><b>Descrição tabela:</b></label>
                                <input type="text" disabled style="width:100%;" name="descricao_tabela_manutencao_tabelas_sistema_alteracao" id="descricao_tabela_id_manutencao_tabelas_sistema_alteracao" minlength="1" maxlength="30" class="dados_elem_form_manutencao_tabelas_sistema_alteracao" value="" data-required="S">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b> Atívo:</b></label>
                                <?php
                                $campo_id = "activo_id_manutencao_tabelas_sistema_alteracao";
                                $campo_nome = "activo_manutencao_tabelas_sistema_alteracao";
                                include "View/obj/dropdown_activo.php";
                                ?>
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
                        <span id="form_mensagem_manutencao_tabelas_sistema_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button class="botao_geral" type="button" id="manutencao_tabelas_sistema_alteracao_b" onclick="manutencao_tabelas_sistema_alteracao_f()">Alterar</button>
                    </div>
                </div>
                <div class="col-12 col-s-12">
                    <p class="margem_padding_0 tamanhofonte_3px">
                        &nbsp;
                    </p>
                </div>
            </form>
        </div>

        <div id="manutencao_tabelas_sistema_criacao" class="box_alt_cria_pesq margem_cima30">
            <form id="form_manutencao_tabelas_sistema_criacao">
                <?php $acao = "";
                $classe_form = "dados_elem_form_manutencao_tabelas_sistema_criacao" ?>
                <div>
                    <h4>Criaçao</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-3 col-s-3">
                                <label><span class="aviso">*</span><b>Código:</b></label>
                                <input type="text" style="width:100%;" name="codigo_manutencao_tabelas_sistema_criacao" id="codigo_id_manutencao_tabelas_sistema_criacao" minlength="2" maxlength="20" class="dados_elem_form_manutencao_tabelas_sistema_criacao" value="" data-required="S" required>
                            </div>
                            <div class="col-9 col-s-9">
                                <label><span class="aviso">*</span><b>Descrição:</b></label>
                                <input type="text" style="width:100%;" name="descricao_manutencao_tabelas_sistema_criacao" id="descricao_id_manutencao_tabelas_sistema_criacao" minlength="1" maxlength="80" class="dados_elem_form_manutencao_tabelas_sistema_criacao" value="" data-required="S" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3 col-s-3">
                                <label><span class="aviso">*</span><b>Código Tabela:</b></label>
                                <input type="text" style="width:100%; text-transform:uppercase;" name="codigo_tabela_manutencao_tabelas_sistema_criacao" id="codigo_tabela_id_manutencao_tabelas_sistema_criacao" minlength="2" maxlength="5" class="dados_elem_form_manutencao_tabelas_sistema_criacao" value="" data-required="S" required>
                            </div>
                            <div class="col-9 col-s-9">
                                <label><span class="aviso">*</span><b>Descrição tabela:</b></label>
                                <input type="text" style="width:100%;" name="descricao_tabela_manutencao_tabelas_sistema_criacao" id="descricao_tabela_id_manutencao_tabelas_sistema_criacao" minlength="1" maxlength="30" class="dados_elem_form_manutencao_tabelas_sistema_criacao" value="" data-required="S" required>
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
                        <span id="form_mensagem_manutencao_tabelas_sistema_criacao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button class="botao_geral" type="button" id="manutencao_tabelas_sistema_criacao_b" onclick="manutencao_tabelas_sistema_criacao_f()">Criar novo registo \ tabela</button>
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
                <button class="botao_geral" type="button" id="fechar_manutencao_tabelas_sistema_sigi" onclick="fechar_manutencao_tabelas_sistema_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>