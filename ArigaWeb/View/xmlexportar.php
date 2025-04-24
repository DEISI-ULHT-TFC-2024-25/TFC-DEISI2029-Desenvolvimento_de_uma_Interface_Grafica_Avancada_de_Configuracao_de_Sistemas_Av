<div id="xmlexportar" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>XML AIR</h1>
        </div>
        <div id="xmlexportar_pesquisa" class="box_alt_cria_pesq">
            <form id="form_xmlexportar_pesquisa">
                <?php $acao = "P";
                $classe_form = "dados_elem_form_xmlexportar_pesquisa" ?>
                <div>
                    <h4>Exportar</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>Pesquise a configuração pretendida:</b></label>
                                <div class="CONF" data-dd="xmlconf_id_xmlexportar_pesquisa" data-activo="N">
                                    <?php
                                    $campo_id = "xmlconf_id_xmlexportar_pesquisa";
                                    $campo_nome = "xmlconf_xmlexportar_pesquisa";
                                    $htmlopcoes = $gestao_inf->cria_opcoesdd_gestaoair("CONF", "N", "CONF");
                                    echo $gestao_inf->gera_dropdown_gestaoair($campo_nome, $campo_id, $classe_form, true, $htmlopcoes, $principiodd);
                                    ?>
                                    <script>
                                        temp = '<?php echo $principiodd; ?>';
                                        control_local.setdd("xmlconf_id_xmlexportar_pesquisa", temp);
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
                        <span id="form_mensagem_xmlexportar_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <label><span class="aviso">*</span><b>XML a Exportar:</b></label>
                        <textarea rows="20" name="xml_config" id="xml_config_id_xmlexportar_pesquisa" class="dados_elem_form_xmlexportar_pesquisa resize_vertical" ng-model="fileContent" value=""></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="xmlexportar_pesquisa_b" onclick="xmlexportar_pesquisa_f();return false;">Mostra XML</button>
                    </div>
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="xmlexportar_b" onclick="xmlexportar_f();return false;">Exportar</button>
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
                <button type="button" class="botao_geral" id="xmlexportar_fechar_b" onclick="xmlexportar_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>