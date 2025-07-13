<div id="visualiza" class="templateform_geral">

    <div id="mydivdrag">
        <div id="dialog_visualiza_geral" class="row">
            <div class="col-12 col-s-12">
                <dialog id="dialog-box_visualiza_geral" class="bgbox_visualiza" style="padding-left:5px;padding-right:5px;padding-top:2px;padding-bottom:6px;">
                    <?php $classe_form = "dados_elem_dboxvisualiza_geral" ?>

                    <div class="row">
                        <div id="conteudo_vista_visualiza_geral" class="col-12 col-s-12">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button style="margin-top:5px;" type="button" class="botao_geral" onclick="document.getElementById('dialog-box_visualiza_geral').close();">Fechar</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    </div>

    <div id="mydivmsg">
        <div id="dialog_msg" class="row">
            <div class="col-12 col-s-12">
                <dialog id="dialog-box_msg" class="bgbox_msg">
                    <div>
                        <h4 style="margin-top:3px;margin-bottom:5px;">Aviso</h4>
                    </div>

                    <div class="row">
                        <div class="col-12 col-s-12">
                            <span id="form_mensagem_msg" class="form_inf_geral"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-s-12">
                            <button style="margin-top:5px;" type="button" class="botao_geral" onclick="document.getElementById('dialog-box_msg').close();">Fechar</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    </div>

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
                        <div id="visualiza_pesquisa_ihtml" style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <span id="form_mensagem_visualiza_pesquisa" class="form_inf_geral"></span>
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
                        <div style="display:flex; margin-right:10px; margin-top:10px; overflow-x:auto;">

                            <div id="id_visualiza_graph" class="tree">
                                <ul>
                                    <li>
                                        <div class="family">
                                            <div class="person child male">
                                                <div class="name">Configuration</div>
                                            </div>
                                            <ul>
                                                <li>
                                                    <div class="family">
                                                        <div class="person child female">
                                                            <div class="name">Arinc653 Module</div>
                                                        </div>
                                                    </div>

                                                    <div class="family">
                                                        <ul>
                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div style="width:120px;" class="name">Air Configuration</div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">Module Schedule</div>
                                                                    </div>
                                                                </div>

                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">PS1</div>
                                                                                </div>
                                                                            </div>

                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Wconf</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS1</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS2</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS3</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS4</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS5</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">PS2</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WConf</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS1</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS2</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS3</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS4</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS5</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">PS3</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WConf</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS1</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS2</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS3</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS4</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">WS5</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">P1</div>
                                                                    </div>
                                                                </div>
                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">Conf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Mem</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">P2</div>
                                                                    </div>
                                                                </div>
                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">Conf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Mem</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">P3</div>
                                                                    </div>
                                                                </div>
                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">Conf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Mem</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">P4</div>
                                                                    </div>
                                                                </div>
                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">Conf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Mem</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div class="family">
                                                                    <div class="person child male">
                                                                        <div class="name">P5</div>
                                                                    </div>
                                                                </div>
                                                                <div class="family">
                                                                    <ul>
                                                                        <li>
                                                                            <div class="family">
                                                                                <div class="person child male">
                                                                                    <div class="name">Conf</div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="family">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div class="family">
                                                                                            <div class="person child male">
                                                                                                <div class="name">Mem</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>

                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
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