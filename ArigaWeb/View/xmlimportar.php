<div id="xmlimportar" class="templateform_geral">
    <div class="box_alt_cria_pesq">
        <div>
            <h1>XML AIR</h1>
        </div>
        <div id="xmlimportar_pesquisa" class="box_alt_cria_pesq">
            <form id="form_xmlimportar_pesquisa">
                <div>
                    <h4>Importar</h4>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <div class="row">
                            <div class="col-12 col-s-12">
                                <label><b> Selecione o ficheiro pretendido:</b></label>
                                <div>
                                    <input name="file_xmlimportar_pesquisa" type="file" id="file_id_xmlimportar_pesquisa" multiple accept="text/xml" onchange="readTextxml(event);">
                                </div>
                            </div>
                            <div class="col-12 col-s-12">
                                <label><span class="aviso">*</span><b>XML a importar:</b></label>
                                <textarea rows="20" name="xml_config" id="xml_config_id_xmlimportar_pesquisa" class="dados_elem_form_xmlimportar_pesquisa resize_vertical" ng-model="fileContent" value="" required></textarea>
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
                        <span id="form_mensagem_xmlimportar_pesquisa" class="form_inf_geral"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-s-12">
                        <button type="button" class="botao_geral" id="xmlimportar_pesquisa_b" onclick="xmlimportar_pesquisa_f();return false;">Importar</button>
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
                <button type="button" class="botao_geral" id="xmlsalvar_fechar_b" onclick="xmlsalvar_fechar_f()">Salvar Ficheiro alterado</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
            <div class="col-12 col-s-12">
                <button type="button" class="botao_geral" id="xmlimportar_fechar_b" onclick="xmlimportar_fechar_f()">Fechar</button>
            </div>
            <div class="col-12 col-s-12">
                <p class="margem_padding_0 tamanhofonte_3px">
                    &nbsp;
                </p>
            </div>
        </div>
    </div>
</div>