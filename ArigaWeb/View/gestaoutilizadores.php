<div id="gestaoutilizadores" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>Gestão de utilizadores</h1>
        </div>
        <div id="gestaoutilizadores_pesquisa" class="box_alt_cria_pesq">
            <form id="form_gestaoutilizadores_pesquisa">
                <div>
                    <h4>Pesquisa</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Indique o email:</b></label>
                                <input type="text" style="width: 100%;" name="emailutilizador_gu" id="emailutilizador_id_gu" minlength="11" maxlength="30" class="dados_elem_form_gestaoutilizadores_pesquisa" value="" pattern=".+@ariga\.com" required>
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
                        <span id="form_mensagem_gestaoutilizadores_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="gestaoutilizadores_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div id="gestaoutilizadores_pesquisa_novo_registo" style="display:flex; margin-top:10px; margin-bottom:10px;">
                            <span id="novo_registo_id" class="novoregisto" onclick="gestaoutilizadores_abrir_criacao_f();">Mostra - Inserir novo utilizador</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoutilizadores_pesquisa_b" onclick="gestaoutilizadores_pesquisa_f();return false;">Pesquisar utilizador</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div id="gestaoutilizadores_alteracao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_gestaoutilizadores_alteracao" style="height:100%;">
                <?php $acao = "A";
                $classe_form = "dados_elem_form_gestaoutilizadores_alteracao" ?>
                <div>
                    <h4>Alteração</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Nome:</b></label>
                                <input type="text" style="width: 100%;" name="nome_alt_gu" id="nome_id_alt_gu" minlength="3" maxlength="80" class="dados_elem_form_gestaoutilizadores_alteracao" value="" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Perfíl:</b></label>
                                <div class="PU" data-dd="perfil_id_alt_gu" data-activo="N">
                                    <?php
                                    $campo_id = "perfil_id_alt_gu";
                                    $campo_nome = "perfil_alt_gu";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("PU", "N", "PU");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("perfil_id_alt_gu", temp);
                                    </script>
                                </div>
                            </div>
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Atívo:</b></label>
                                <div style="display:flex;">
                                    <?php
                                    $campo_id = "activo_id_alt_gu";
                                    $campo_nome = "activo_alt_gu";
                                    include "View/obj/dropdown_activo.php";
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Email:</b></label>
                                <input type="text" style="width: 100%;" name="emailutilizador_alt_gu" id="emailutilizador_id_alt_gu" minlength="11" maxlength="30" class="dados_elem_form_gestaoutilizadores_alteracao" value="" pattern=".+@ariga\.com" required>
                            </div>
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Password</b></label>
                                <div style="display:flex;">
                                    <input autocomplete="off" type="password" name="codigoacesso_alt_gu" id="codigoacesso_id_alt_gu" maxlength="16" minlength="8" class="dados_elem_form_gestaoutilizadores_alteracao" value="" required>
                                    <div style="margin-left: -27px; margin-top:10px;" onclick="mostraresconderpassword('codigoacesso_id_alt_gu');">
                                        <svg viewBox="0 0 24 24" style="
                                                fill: none;
                                                height: 24px;
                                                stroke: rgba(0, 0, 0, 0.4);
                                                stroke-linecap: round; 
                                                stroke-linejoin: round;
                                                stroke-width: 1;
                                                width: 24px;
                                            ">
                                            <path d="M23.5,12c0,0-5.148,6.5-11.5,6.5S0.5,12,0.5,12S5.648,5.5,12,5.5S23.5,12,23.5,12z M12,8c2.209,0,4,1.791,4,4 s-1.791,4-4,4s-4-1.791-4-4S9.791,8,12,8z M12,10c1.105,0,2,0.895,2,2s-0.895,2-2,2s-2-0.895-2-2" />
                                        </svg>
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
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_gestaoutilizadores_alteracao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoutilizadores_alteracao_b" onclick="gestaoutilizadores_alteracao_f()">Alterar utilizador</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <p class="margem_padding_0 tamanhofonte_3px">
                            &nbsp;
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <div id="gestaoutilizadores_criacao" class="box_alt_cria_pesq" style="margin-top:30px;">
            <form id="form_gestaoutilizadores_criacao">
                <?php $acao = "C";
                $classe_form = "dados_elem_form_gestaoutilizadores_criacao" ?>
                <div>
                    <h4>Criação</h4>
                </div>

                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-9 col-s-9">
                                <label><span class="aviso">*</span><b>Nome:</b></label>
                                <input type="text" style="width: 100%;" name="nome_criacao_gu" id="nome_id_criacao_gu" minlength="3" maxlength="80" class="dados_elem_form_gestaoutilizadores_criacao" value="" required>
                            </div>
                            <div class="col-3 col-s-3">
                                <label><span class="aviso">*</span><b>Perfíl:</b></label>
                                <div class="PU" data-dd="perfil_id_criacao_gu" data-activo="S">
                                    <?php
                                    $campo_id = "perfil_id_criacao_gu";
                                    $campo_nome = "perfil_criacao_gu";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_sistema("PU", "S", "PU_A");
                                    echo $gestao_inf->gera_dropdown_sistema($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("perfil_id_criacao_gu", temp);
                                    </script>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Email:</b></label>
                                <input type="text" style="width: 100%;" name="emailutilizador_criacao_gu" id="emailutilizador_id_criacao_gu" minlength="11" maxlength="30" class="dados_elem_form_gestaoutilizadores_criacao" value="" pattern=".+@ariga\.com" required>
                            </div>
                            <div class="col-6 col-s-6">
                                <label><span class="aviso">*</span><b>Password:</b></label>
                                <div style="display:flex;">
                                    <input autocomplete="off" type="password" name="codigoacesso_criacao_gu" id="codigoacesso_id_criacao_gu" maxlength="16" minlength="8" class="dados_elem_form_gestaoutilizadores_criacao" value="" required>
                                    <div style="margin-left: -27px; margin-top:10px;" onclick="mostraresconderpassword('codigoacesso_id_criacao_gu');">
                                        <svg viewBox="0 0 24 24" style="
                                                fill: none;
                                                height: 24px;
                                                stroke: rgba(0, 0, 0, 0.4);
                                                stroke-linecap: round; 
                                                stroke-linejoin: round;
                                                stroke-width: 1;
                                                width: 24px;
                                            ">
                                            <path d="M23.5,12c0,0-5.148,6.5-11.5,6.5S0.5,12,0.5,12S5.648,5.5,12,5.5S23.5,12,23.5,12z M12,8c2.209,0,4,1.791,4,4 s-1.791,4-4,4s-4-1.791-4-4S9.791,8,12,8z M12,10c1.105,0,2,0.895,2,2s-0.895,2-2,2s-2-0.895-2-2" />
                                        </svg>
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
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_gestaoutilizadores_criacao" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="gestaoutilizadores_criacao_b" onclick="gestaoutilizadores_criacao_f()">Criar novo utilizador</button>
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
                <button type="button" class="botao_geral" id="gestaoutilizadores_fechar_b" onclick="gestaoutilizadores_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>