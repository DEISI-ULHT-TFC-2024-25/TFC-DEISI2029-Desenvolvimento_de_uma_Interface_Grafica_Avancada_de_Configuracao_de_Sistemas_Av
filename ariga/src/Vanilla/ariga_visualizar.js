//-------------------ecran Configuração de XML

//Pesquisa----------------------------------------------------------------------------------------
var xmlDoc;

function visualiza_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('visualiza_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_visualiza_pesquisa").reset();
        document.getElementById('visualiza_alteracao').style.display = "none";
        document.getElementById('form_visualiza_alteracao').reset();

        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }
}

function visualiza_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('visualiza_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_visualiza_pesquisa").reset();
        document.getElementById('visualiza_alteracao').style.display = "none";
        document.getElementById('form_visualiza_alteracao').reset();

    }
}

function visualiza_reset() {

    document.getElementById('visualiza_pesquisa_ihtml').innerHTML = "";
    document.getElementById('visualiza_alteracao').style.display = "none";
    document.getElementById('form_visualiza_alteracao').reset();

}



function verifica_alteracoes_campos_visualiza(hash_p) {

    let valor_alt = "";
    let idobj = null;

    idobj = document.getElementById("xmlconf_id_visualiza_pesquisa");
    valor_alt = idobj.getAttribute('data-id');

    if (idobj.getAttribute('data-required') == 'S') {

        if (valida_id_num_dropdown(valor_alt, 'Configuração XML', hash_p) < 1) {
            hash_p['mensagem'] = "Não selecionou nenhuma configuração";
            return 0;
        } else {
            hash_p['mensagem'] = "";
            return 1;
        }
    }
}


function funcvalidacaocampos_visualiza_pesquisa(pf_nome_form) {

    let hash = {};
    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    if (verifica_alteracoes_campos_visualiza(hash) < 1) {

        document.getElementById('form_mensagem_visualiza_pesquisa').innerHTML = hash['mensagem'];
        document.getElementById('form_mensagem_visualiza_pesquisa').style.display = "block";

        setTimeout(
            function () {
                document.getElementById('form_mensagem_visualiza_pesquisa').innerHTML = '';
                document.getElementById('form_mensagem_visualiza_pesquisa').style.display = "none";
            }, 5000
        );
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_visualiza_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

var guarda_inf_visualiza_pesquisa = "";

function functratamententodados_r1_visualiza_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;
    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
    guarda_inf_visualiza_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_visualiza_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_rneg_visualiza_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_ind_visualiza_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;
    return 1;

}

function visualiza_pesquisa_f() {
    configura_reset();
    envia_recebe_gen_universal_POST('form_visualiza_pesquisa', funcvalidacaocampos_visualiza_pesquisa, 'dados_elem_form_visualiza_pesquisa', funcrecolhecamposenviar_visualiza_pesquisa, 'visualiza_pesquisa.php', 'visualiza_pesquisa_b', 'visualiza_pesquisa_ihtml', functratamententodados_r1_visualiza_pesquisa, 'form_mensagem_visualiza_pesquisa', ".form_inf_geral", functratamententodados_r0_visualiza_pesquisa, functratamententodados_rneg_visualiza_pesquisa, functratamententodados_ind_visualiza_pesquisa);
}


function seleciona_linha_listaon_visualiza(e) {

    let idrow = 0;

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');

            document.getElementById('visualiza_alteracao').style.display = "none";
            document.getElementById('form_visualiza_alteracao').reset();
            guarda_id_obj = null;
            guarda_id_row = "";

        } else {

            e.classList.add('active-row');

            if (guarda_id_obj !== null) {
                guarda_id_obj.classList.remove('active-row');
            }
            guarda_id_obj = e;
            guarda_id_row = e.id;

            if (guarda_id_row !== "") {

                idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
                visualiza_alteracao_prenche_form(idrow);
            }

            document.getElementById('visualiza_alteracao').style.display = "block";

        }
    }
}

function visualiza_alteracao_prenche_form(idrow) {

    let xmlstring = "";
    let configuration;
    let configuration_count = 0;

    let arinc653module;
    let arinc653module_count = 0;

    let airconfiguration;
    let airconfiguration_count = 0;

    let moduleschedule;
    let moduleschedule_count = 0;

    let partitionschedule;
    let partitionschedule_count = 0;


    let partitions;
    let partitions_count = 0;

    let partitionconfiguration;
    let partitionconfiguration_count = 0;

    let memory;
    let memory_count = 0;

    let windowschedule;
    let windowschedule_count = 0;
    let windowschedule_count_temp = 0;

    let windowconfiguration;
    let windowconfiguration_count = 0;

    let pag_ihtml = "";
    let pag_ihtml_temp = "";

    let pag_ihtml_final = "";
    let nivel2 = 0;


    if (guarda_inf_visualiza_pesquisa !== "") {
        xmlstring = guarda_inf_visualiza_pesquisa[idrow]['oxml'];
        xmlDoc = new DOMParser().parseFromString(xmlstring, "text/xml");
        configuration = xmlDoc.getElementsByTagName("configuration");
        configuration_count = configuration.length;

        if (configuration_count > 0 && configuration_count < 2) {

            obj_configuration = null;
            obj_configuration_initial = null;

            obj_configuration = new configuration_cls();
            obj_configuration_initial = new configuration_cls();

            obj_configuration.id = configuration[0].getAttribute('id');
            obj_configuration.archname = configuration[0].getElementsByTagName('archname')[0].innerHTML;
            obj_configuration.bare = configuration[0].getElementsByTagName('bare')[0].innerHTML;
            obj_configuration.iddebugmonitordesc = configuration[0].getElementsByTagName('iddebugmonitor')[0].innerHTML;
            obj_configuration.iddebugmonitor = configuration[0].getElementsByTagName('iddebugmonitor')[0].getAttribute('idvalue');
            obj_configuration.idtargetboarddesc = configuration[0].getElementsByTagName('idtargetboard')[0].innerHTML;
            obj_configuration.idtargetboard = configuration[0].getElementsByTagName('idtargetboard')[0].getAttribute('idvalue');
            obj_configuration.idfpudesc = configuration[0].getElementsByTagName('idfpu')[0].innerHTML;
            obj_configuration.idfpu = configuration[0].getElementsByTagName('idfpu')[0].getAttribute('idvalue');
            obj_configuration.idarchitecturetypedesc = configuration[0].getElementsByTagName('idarchitecturetype')[0].innerHTML;
            obj_configuration.idarchitecturetype = configuration[0].getElementsByTagName('idarchitecturetype')[0].getAttribute('idvalue');
            obj_configuration.installrtos = configuration[0].getElementsByTagName('installrtos')[0].innerHTML;
            obj_configuration.posixrtems5 = configuration[0].getElementsByTagName('posixrtems5')[0].innerHTML;
            obj_configuration.rtems48i = configuration[0].getElementsByTagName('rtems48i')[0].innerHTML;
            obj_configuration.rtems5 = configuration[0].getElementsByTagName('rtems5')[0].innerHTML;

            pag_ihtml = '<ul>\
                            <li>\
                                <div class="family">\
                                    <div class="person child male" onclick="ver_configuration(event);">\
                                        <div class="name" >' + obj_configuration.archname + '</div>\
                                    </div>';

            pag_ihtml_final = '</div>\
                            </li>\
                        </ul>';

        }

        arinc653module = xmlDoc.getElementsByTagName("arinc653module");
        arinc653module_count = arinc653module.length;

        if (arinc653module_count > 0 && arinc653module_count < 2) {
            obj_configuration.arinc653module_obj.id = arinc653module[0].getAttribute('id');
            obj_configuration.arinc653module_obj.idconfiguration = arinc653module[0].getAttribute('idconfiguration');
            obj_configuration.arinc653module_obj.modulename = arinc653module[0].getElementsByTagName('modulename')[0].innerHTML;
            obj_configuration.arinc653module_obj.xmlnsxsi = arinc653module[0].getElementsByTagName('xmlnsxsi')[0].innerHTML;

            pag_ihtml = pag_ihtml + '<ul>\
                                <li>\
                                    <div class="family">\
                                        \<div class="person child female" onclick="ver_arinc653module();">\
                                            <div class="name" >' + obj_configuration.arinc653module_obj.modulename + '</div>\
                                        </div>\
                                    </div>';

            pag_ihtml_final = '</li>\
                                    </ul>' + pag_ihtml_final;

        }

        airconfiguration = xmlDoc.getElementsByTagName("airconfiguration");
        airconfiguration_count = airconfiguration.length;

        if (airconfiguration_count > 0 && airconfiguration_count < 2) {
            obj_configuration.airconfiguration_obj.id = airconfiguration[0].getAttribute('id');
            obj_configuration.airconfiguration_obj.idarinc653module = airconfiguration[0].getAttribute('idarinc653module');
            obj_configuration.airconfiguration_obj.requiredcores = airconfiguration[0].getElementsByTagName('requiredcores')[0].innerHTML;
            obj_configuration.airconfiguration_obj.tickspersecond = airconfiguration[0].getElementsByTagName('tickspersecond')[0].innerHTML;

            pag_ihtml = pag_ihtml + '<div class="family">\
                                                        <ul>';
            nivel2 = 1;

            pag_ihtml = pag_ihtml + '<li>\
                                            <div class="family">\
                                                <div class="person child male" onclick="ver_airconfiguration();">\
                                                    <div style="width:120px;" class="name" >' + "Air Configuration" + '</div>\
                                                </div>\
                                            </div>\
                                        </li>';

            pag_ihtml_final = '</ul>\
                                </div>' + pag_ihtml_final;

        }

        partitions = xmlDoc.getElementsByTagName("partitions");
        partitions_count = partitions.length;

        partitionconfiguration = xmlDoc.getElementsByTagName("partitionconfiguration");
        partitionconfiguration_count = partitionconfiguration.length;

        memory = xmlDoc.getElementsByTagName("memory");
        memory_count = memory.length;

        if (partitions_count > 0) {

            if (nivel2 == 0) {

                pag_ihtml = pag_ihtml + '<div class="family">\
                                            <ul>';

            }

            for (i = 0; i < partitions_count; i++) {

                obj_configuration.partitions_obj[i] = new partitions_cls();
                obj_configuration.partitions_obj[i].id = partitions[i].getAttribute('id');
                obj_configuration.partitions_obj[i].idarinc653module = partitions[i].getAttribute('idarinc653module');
                obj_configuration.partitions_obj[i].criticalitydesc = partitions[i].getElementsByTagName('criticality')[0].innerHTML;
                obj_configuration.partitions_obj[i].criticality = partitions[i].getElementsByTagName('criticality')[0].getAttribute('idvalue');
                obj_configuration.partitions_obj[i].entrypoint = partitions[i].getElementsByTagName('entrypoint')[0].innerHTML;
                obj_configuration.partitions_obj[i].partitionname = partitions[i].getElementsByTagName('partitionname')[0].innerHTML;
                obj_configuration.partitions_obj[i].partitionidentifier = partitions[i].getElementsByTagName('partitionidentifier')[0].innerHTML;
                obj_configuration.partitions_obj[i].systempartition = partitions[i].getElementsByTagName('systempartition')[0].innerHTML;

                if (partitionconfiguration_count > 0) {
                    for (j = 0; j < partitionconfiguration_count; j++) {

                        if (partitionconfiguration[j].getAttribute('idpartition') == obj_configuration.partitions_obj[i].id) {
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.id = partitionconfiguration[j].getAttribute('id');
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.idpartition = partitionconfiguration[j].getAttribute('idpartition');

                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.cores = partitionconfiguration[j].getElementsByTagName('cores')[0].innerHTML;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.cache = partitionconfiguration[j].getElementsByTagName('cache')[0].innerHTML;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.libs = partitionconfiguration[j].getElementsByTagName('libs')[0].innerHTML;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.personality = partitionconfiguration[j].getElementsByTagName('personality')[0].innerHTML;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.devices = partitionconfiguration[j].getElementsByTagName('devices')[0].innerHTML;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.permissions = partitionconfiguration[j].getElementsByTagName('permissions')[0].innerHTML;

                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.idslibs = partitionconfiguration[j].getElementsByTagName('libs')[0].getAttribute('idvalue');;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.idspersonality = partitionconfiguration[j].getElementsByTagName('personality')[0].getAttribute('idvalue');;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.idsdevices = partitionconfiguration[j].getElementsByTagName('devices')[0].getAttribute('idvalue');;
                            obj_configuration.partitions_obj[i].partitionconfiguration_obj.idspermissions = partitionconfiguration[j].getElementsByTagName('permissions')[0].getAttribute('idvalue');;

                            if (memory_count > 0) {
                                for (l = 0; l < memory_count; l++) {

                                    if (memory[l].getAttribute('idpartitionconfiguration') == obj_configuration.partitions_obj[i].partitionconfiguration_obj.id) {
                                        obj_configuration.partitions_obj[i].partitionconfiguration_obj.memory_obj.id = memory[l].getAttribute('id');
                                        obj_configuration.partitions_obj[i].partitionconfiguration_obj.memory_obj.idpartitionconfiguration = memory[l].getAttribute('idpartitionconfiguration');
                                        obj_configuration.partitions_obj[i].partitionconfiguration_obj.memory_obj.size = memory[l].getElementsByTagName('size')[0].innerHTML;

                                    }

                                }
                            }
                        }

                    }
                }

                pag_ihtml = pag_ihtml + '<li>\
                                            <div class="family">\
                                                <div class="person child male" onclick="ver_partitions(' + i + ');">\
                                                    <div class="name" >' + obj_configuration.partitions_obj[i].partitionname + '</div>\
                                                </div>\
                                            </div>\
                                            <div class="family">\
                                                <ul>\
                                                    <li>\
                                                        <div class="family">\
                                                            <div class="person child male" onclick="ver_partitions(' + i + ');">\
                                                                <div class="name" >' + 'Conf' + i + '</div>\
                                                             </div>\
                                                        </div>\
                                                        <div class="family">\
                                                            <ul>\
                                                                <li>\
                                                                    <div class="family">\
                                                                        <div class="person child male" onclick="ver_partitions(' + i + ');">\
                                                                            <div class="name" >Mem' + i + '</div>\
                                                                        </div>\
                                                                    </div>\
                                                                </li>\
                                                            </ul>\
                                                        </div>\
                                                    </li>\
                                                </ul>\
                                            </div>\
                                        </li>';

            }

            if (nivel2 == 0) {

                pag_ihtml_final = '</ul>\
                                </div>' + pag_ihtml_final;

                nivel2 = 1;
            }

        }

        moduleschedule = xmlDoc.getElementsByTagName("moduleschedule");
        moduleschedule_count = moduleschedule.length;

        if (moduleschedule_count > 0 && moduleschedule_count < 2) {

            if (nivel2 == 0) {

                pag_ihtml = pag_ihtml + '<div class="family">\
                                            <ul>';

            }


            obj_configuration.moduleschedule_obj.id = moduleschedule[0].getAttribute('id');
            obj_configuration.moduleschedule_obj.idarinc653module = moduleschedule[0].getAttribute('idarinc653module');
            obj_configuration.moduleschedule_obj.schedulename = moduleschedule[0].getElementsByTagName('schedulename')[0].innerHTML;
            obj_configuration.moduleschedule_obj.scheduleidentifier = moduleschedule[0].getElementsByTagName('scheduleidentifier')[0].innerHTML;
            obj_configuration.moduleschedule_obj.majorframeseconds = moduleschedule[0].getElementsByTagName('majorframeseconds')[0].innerHTML;
            obj_configuration.moduleschedule_obj.initialmoduleschedule = moduleschedule[0].getElementsByTagName('initialmoduleschedule')[0].innerHTML;


            pag_ihtml = pag_ihtml + '<li>\
                                        <div class="family">\
                                            <div class="person child male" onclick="ver_moduleschedule();">\
                                                <div class="name" >' + obj_configuration.moduleschedule_obj.schedulename + '</div>\
                                            </div>\
                                        </div>';


            partitionschedule = xmlDoc.getElementsByTagName("partitionschedule");
            partitionschedule_count = partitionschedule.length;

            if (partitionschedule_count > 0) {


                pag_ihtml = pag_ihtml + '<div class="family">\
                                                    <ul>';

                windowschedule = xmlDoc.getElementsByTagName("windowschedule");
                windowschedule_count = windowschedule.length;

                windowconfiguration = xmlDoc.getElementsByTagName("windowconfiguration");
                windowconfiguration_count = windowconfiguration.length;

                for (i = 0; i < partitionschedule_count; i++) {

                    windowschedule_count_temp = 0;

                    obj_configuration.partitionschedule_obj[i] = new partitionschedule_cls();
                    obj_configuration.partitionschedule_obj[i].id = partitionschedule[i].getAttribute('id');
                    obj_configuration.partitionschedule_obj[i].idmoduleschedule = partitionschedule[i].getAttribute('idmoduleschedule');
                    obj_configuration.partitionschedule_obj[i].perioddurationseconds = partitionschedule[i].getElementsByTagName('perioddurationseconds')[0].innerHTML;
                    obj_configuration.partitionschedule_obj[i].periodseconds = partitionschedule[i].getElementsByTagName('periodseconds')[0].innerHTML;

                    if (windowconfiguration_count > 0) {

                        for (m = 0; m < windowconfiguration_count; m++) {

                            if (windowconfiguration[m].getAttribute('idpartitionschedule') == obj_configuration.partitionschedule_obj[i].id) {
                                obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.idpartitionschedule = windowconfiguration[m].getAttribute('idpartitionschedule');
                                obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.id = windowconfiguration[m].getAttribute('id');
                                obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.windowidentifier = windowconfiguration[m].getElementsByTagName('windowidentifier')[0].innerHTML;
                                obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.cores = windowconfiguration[m].getElementsByTagName('cores')[0].innerHTML;

                                pag_ihtml = pag_ihtml + '<li>\
                                                            <div class="family">\
                                                                <div class="person child male" onclick="ver_partitionschedule(' + i + ');">\
                                                                    <div class="name" >PS' + i + '</div>\
                                                                </div>\
                                                            </div>\
                                                            <div class="family">\
                                                                <ul>\
                                                                    <li>\
                                                                        <div class="family">\
                                                                            <div class="person child male" onclick="ver_partitionschedule(' + i + ');">\
                                                                                <div class="name" >Wconf' + i + '</div>\
                                                                            </div>\
                                                                        </div>\
                                                                    </li>';

                            }
                        }
                    }

                    if (windowschedule_count > 0) {
                        for (j = 0; j < windowschedule_count; j++) {
                            if (windowschedule[j].getAttribute('idpartitionschedule') == obj_configuration.partitionschedule_obj[i].id) {
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp] = new windowschedule_cls();

                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].id = windowschedule[j].getAttribute('id');
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].idpartitionschedule = windowschedule[j].getAttribute('idpartitionschedule');
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].idpartitionconfiguration = windowschedule[j].getAttribute('idpartitionconfiguration');

                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].partitionperiodstart = windowschedule[j].getElementsByTagName('partitionperiodstart')[0].innerHTML;
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].windowdurationseconds = windowschedule[j].getElementsByTagName('windowdurationseconds')[0].innerHTML;
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].windowidentifier = windowschedule[j].getElementsByTagName('windowidentifier')[0].innerHTML;
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].windowstartseconds = windowschedule[j].getElementsByTagName('windowstartseconds')[0].innerHTML;
                                obj_configuration.partitionschedule_obj[i].windowschedule_obj[windowschedule_count_temp].coreidentifier = windowschedule[j].getElementsByTagName('coreidentifier')[0].innerHTML;

                                pag_ihtml = pag_ihtml + '<li>\
                                                            <div class="family">\
                                                                <div class="person child male" onclick="ver_partitionschedule(' + i + ');">\
                                                                    <div class="name" >WS' + windowschedule_count_temp + '</div>\
                                                                </div>\
                                                            </div>\
                                                        </li>';




                                windowschedule_count_temp++;
                            }
                        }

                    }

                    pag_ihtml = pag_ihtml + '</ul>\
                                        </div>\
                                    </li>';
                }

                pag_ihtml = pag_ihtml + '</ul>\
                                    </div>';

                pag_ihtml = pag_ihtml + '</li>';
            } else {

                pag_ihtml = pag_ihtml + '</li>';

            }

            if (nivel2 == 0) {

                pag_ihtml_final = '</ul>\
                                </div>' + pag_ihtml_final;

                nivel2 = 1;
            }

        }

        obj_configuration_initial = obj_configuration;
        document.getElementById('id_visualiza_graph').innerHTML = pag_ihtml + pag_ihtml_final;
    }
}

function ver_configuration(e) {

    obtem_vista_f('vista_configuration.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('archname_id_visualiza_alteracao').innerText = obj_configuration.archname;

            if (obj_configuration.bare == 'true') {
                document.getElementById('bare_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

            document.getElementById('debugmonitor_id_visualiza_alteracao').innerText = obj_configuration.iddebugmonitordesc;
            document.getElementById('targetboard_id_visualiza_alteracao').innerText = obj_configuration.idtargetboarddesc;
            document.getElementById('fpu_id_visualiza_alteracao').innerText = obj_configuration.idfpudesc;
            document.getElementById('architecturetype_id_visualiza_alteracao').innerText = obj_configuration.idarchitecturetypedesc;

            if (obj_configuration.installrtos == 'true') {
                document.getElementById('installrtos_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

            if (obj_configuration.posixrtems5 == 'true') {
                document.getElementById('posixrtems5_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

            if (obj_configuration.rtems48i == 'true') {
                document.getElementById('rtems48i_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

            if (obj_configuration.rtems5 == 'true') {
                document.getElementById('rtems5_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

        }, 1000
    );
}

function ver_arinc653module() {

    obtem_vista_f('vista_arinc653module.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('modulename_id_visualiza_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.modulename);
            document.getElementById('xmlnsxsi_id_visualiza_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.xmlnsxsi);

        }, 1000
    );

}

function ver_airconfiguration() {

    obtem_vista_f('vista_airconfiguration.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('requiredcores_id_visualiza_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.requiredcores);
            document.getElementById('tickspersecond_id_visualiza_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.tickspersecond);

        }, 1000
    );

}

function ver_moduleschedule() {

    obtem_vista_f('vista_moduleschedule.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('schedulename_id_visualiza_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.schedulename);
            document.getElementById('scheduleidentifier_id_visualiza_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.scheduleidentifier);
            document.getElementById('majorframeseconds_id_visualiza_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.majorframeseconds);
            if (obj_configuration.moduleschedule_obj.initialmoduleschedule == 'true') {
                document.getElementById('initialmodulesched_id_visualiza_alteracao').setAttribute('checked', 'checked');
            }

        }, 1000
    );

}

function ver_partitions(indice) {

    obtem_vista_f('vista_partitions_v.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('criticality_id_partitions_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].criticalitydesc);
            document.getElementById('entrypoint_id_partitions_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].entrypoint);
            document.getElementById('partitionname_id_partitions_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionname);
            document.getElementById('partitionidentifier_id_partitions_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionidentifier);
            if (obj_configuration.partitions_obj[indice].systempartition == 'true') {
                document.getElementById('systempartition_id_partitions_visualiza_alteracao').setAttribute('checked', 'checked');
            }

            document.getElementById('cores_id_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.cores);
            document.getElementById('cache_id_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.cache);
            document.getElementById('libs_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.libs);
            document.getElementById('personality_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.personality);
            document.getElementById('devices_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.devices);
            document.getElementById('permissions_partitionconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.permissions);

            document.getElementById('size_id_partitionconfiguration_memory_visualiza_alteracao').setAttribute('value', obj_configuration.partitions_obj[indice].partitionconfiguration_obj.memory_obj.size);

        }, 1000
    );

}

var indice_partitionschedule_selecionada = -1;

function ver_partitionschedule(indice) {

    obtem_vista_f('vista_partition_schedule_v.php', 'conteudo_vista_visualiza_geral', 'form_mensagem_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_geral').showModal();

            document.getElementById('perioddurationseconds_id_partitionschedule_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice].perioddurationseconds);
            document.getElementById('periodseconds_id_partitionschedule_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice].periodseconds);

            document.getElementById('windowidentifier_id_windowconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice].windowconfiguration_obj.windowidentifier);
            document.getElementById('cores_id_windowconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice].windowconfiguration_obj.cores);

            cria_graf_partition_schedule("visualiza_windowchedule_ihtml", "dialog_visualiza_geral", 0, indice);
            indice_partitionschedule_selecionada = indice;

        }, 1000
    );

}

function devolve_nome_partition(idpartionconfiguration) {

    let partitions_count = 0;
    let i = 0;
    let encountrou = 0;
    partitions_count = obj_configuration.partitions_obj.length;

    if (partitions_count == 0) return -1;

    while (i < partitions_count && encountrou == 0) {

        if (obj_configuration.partitions_obj[i].partitionconfiguration_obj.id == idpartionconfiguration) {
            encountrou = 1;
        } else {
            i++;
        }
    }

    if (encountrou == 1) {
        return obj_configuration.partitions_obj[i].partitionname;
    }
    return "";
}

function verifica_se_existe_no_array_e_guarda(array, valor) {

    if (array.indexOf(valor) !== -1) {
        array[array.length] = valor;
    }
}

var grafico = null;
var contentor_obj = null;

function cria_graf_partition_schedule(html_canvas_id, contentor_id, debug, indice_p) {

    contentor_obj = null;

    contentor_obj = document.getElementById(contentor_id);

    let parametro_X_escala = 1;
    parametro_X_escala = devolve_parametro_escala_x(obj_configuration, indice_p);

    if (parametro_X_escala > 1){
        parametro_X_escala = Math.round(parametro_X_escala / 10);
        if (parametro_X_escala < 1) parametro_X_escala = 1;
    }

    let w = (contentor_obj.offsetWidth / 2) * parametro_X_escala;
    let h = 50 * obj_configuration.airconfiguration_obj.requiredcores + 50;

    grafico = null;

    let canvas_obj = document.getElementById(html_canvas_id);
    let count = 0;
    let count_obj = 0;
    let encountrou = 0;
    let i, j = 0;

    if (canvas_obj && canvas_obj.getContext) {

        grafico = new partitionscheduleGraph(canvas_obj, w, h, debug);

        grafico.windowschedules_num_cores = obj_configuration.partitionschedule_obj[indice_p].windowconfiguration_obj.cores;
        grafico.perioddurationseconds = obj_configuration.partitionschedule_obj[indice_p].perioddurationseconds;
        grafico.periodseconds = obj_configuration.partitionschedule_obj[indice_p].periodseconds;
        grafico.indice_windowschedule_partitions = indice_p;
        grafico.title = "Temporal distribution by processor core";

        count = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj.length;
        for (i = 0; i < count; i++) {
            encountrou = 0;
            count_obj = grafico.windowschedule_core.length;
            j = 0;
            if (count_obj > 0) {
                while (encountrou == 0 && j < count_obj) {

                    if (grafico.windowschedule_core[j] == obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].coreidentifier) {
                        encountrou = 1;
                    } else {
                        j++;
                    }
                }

                if (encountrou == 0) {
                    grafico.windowschedule_core[grafico.windowschedule_core.length] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].coreidentifier;
                }

            } else {
                grafico.windowschedule_core[grafico.windowschedule_core.length] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].coreidentifier;
                encountrou = 1;
            }

        }

        grafico.windowschedule_core.sort();

        for (i = 0; i < count; i++) {

            grafico.windowschedule_partitionperiodstart[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].partitionperiodstart;
            grafico.windowschedule_windowdurationseconds[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].windowdurationseconds;
    
            grafico.windowschedule_coreidentifier[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].coreidentifier;
            grafico.windowschedule_partitionidentifier[i] = devolve_nome_partition(obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].idpartitionconfiguration);
            verifica_se_existe_no_array_e_guarda(grafico.windowschedule_partitions, grafico.windowschedule_partitionidentifier[i]);
            grafico.windowschedule_windowstartseconds[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].windowstartseconds;
            grafico.windowschedule_windowidentifier[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].windowidentifier;
            grafico.windowschedule_idpartitionconfiguration[i] = obj_configuration.partitionschedule_obj[indice_p].windowschedule_obj[i].idpartitionconfiguration;
        }

        grafico.drawGraph();

        if (debug == 1) criar_ficheiro_debug(grafico.mensagem_debug);

    }
}

function criar_ficheiro_debug(mensagem_debug) {

    let text_to_save_as_blob = new Blob([mensagem_debug], {
        type: "text/plain"
    });

    let text_to_save_as_url = window.URL.createObjectURL(text_to_save_as_blob);

    let download_link = document.createElement('a');
    download_link.download = 'debug.txt';
    download_link.innerHTML = 'Download File';
    download_link.href = text_to_save_as_url;
    download_link.style.display = 'block';
    download_link.onclick = function (event) {
        document.body.removeChild(event.target);
    };

    document.body.appendChild(download_link);

    download_link.click();

    return 1
}

function mostra_mensagem_box(mensagem_p) {
    document.getElementById('dialog-box_msg').showModal();
    document.getElementById('form_mensagem_msg').innerHTML = mensagem_p;
}

//visualiza_window_schedule_alterar----------------------------------------------------------------------------------------------------------

function ver_partitionschedule_mantendo_window_alteracao() {

    document.getElementById('perioddurationseconds_id_partitionschedule_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].perioddurationseconds);
    document.getElementById('periodseconds_id_partitionschedule_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].periodseconds);

    document.getElementById('windowidentifier_id_windowconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowconfiguration_obj.windowidentifier);
    document.getElementById('cores_id_windowconfiguration_visualiza_alteracao').setAttribute('value', obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowconfiguration_obj.cores);

    cria_graf_partition_schedule("visualiza_windowchedule_ihtml", "dialog_visualiza_geral", 0, indice_partitionschedule_selecionada);

}


function obtem_windowschedule_windowstartseconds() {

    let count = 0;
    let count2 = 0;
    let i = 0;
    let alt_value;
    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let mensagem;
    let alterou = 0;

    grafico.atualiza_windowschedule_windowstartseconds();

    count = grafico.windowschedule_windowstartseconds.length;
    count2 = obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowschedule_obj.length;

    if (count != count2) {
        alert('Erro entre o gráfico e a configuaração obtida!...')
        return 0;
    }

    for (i = 0; i < count; i++) {

        alt_value = grafico.windowschedule_windowstartseconds[i];

        if (!expreg.test(alt_value)) {
            mensagem = "Window start seconds: Deve respeitar o formato x.xxxxx!...";
            mostra_mensagem_box(mensagem);
            return 0;
        }
        if (obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowschedule_obj[i].windowstartseconds != alt_value) {
            obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowschedule_obj[i].windowstartseconds = alt_value;

            obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowschedule_obj[i].stateid = ALTERAR;
            obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowschedule_obj[i].statedesc = ALTERARDESC;
            obj_configuration.alterado[5] = 1;
            alterou = 1;

        }
    }

    let novo_num_cores = 0;
    let ant_num_cores = 0;
    let require_cores_configuration_air = 0;
    let num_cores_utilizados = 0;

    novo_num_cores = Number(document.getElementById('cores_id_windowconfiguration_visualiza_alteracao').value);
    ant_num_cores = Number(obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowconfiguration_obj.cores);

    if (ant_num_cores != novo_num_cores) {

        require_cores_configuration_air = Number(obj_configuration.airconfiguration_obj.requiredcores);
        if (require_cores_configuration_air < novo_num_cores) {
            obj_configuration.airconfiguration_obj.requiredcores = novo_num_cores;
            obj_configuration.alterado[2] = 1;
        }

        num_cores_utilizados = Number(grafico.windowschedule_core.length);
        if (num_cores_utilizados > novo_num_cores) {
            mensagem = "O novo número de cores definido não pode ser inferior ao número que está a utilizar!...";
            mostra_mensagem_box(mensagem);
            return 0;
        }

        obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].windowconfiguration_obj.cores = novo_num_cores;
        obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].stateid = ALTERAR;
        obj_configuration.partitionschedule_obj[grafico.indice_windowschedule_partitions].statedesc = ALTERARDESC;
        obj_configuration.alterado[5] = 1;
        alterou = 1;

    }

    if (alterou == 0) {
        mensagem = "Não efetuou alterações!...";
        mostra_mensagem_box(mensagem);
        return 0;
    }

    return 1;

}

function funcvalidacaocampos_visualiza_alteracao(pf_nome_form) {

    return obtem_windowschedule_windowstartseconds();
}

function funcrecolhecamposenviar_visualiza_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    let guardaObjserializado = JSON.stringify(obj_configuration);

    pf_form_dados.append('objectoconfiguration', guardaObjserializado);
    pf_form_dados.append('existiu_alteracao', 1);
    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_visualiza_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    let idrow;

    guarda_inf_visualiza_pesquisa = JSON.parse(pf_resposta.dados);

    if (guarda_id_row !== "") {

        idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
        visualiza_alteracao_prenche_form(idrow);
        ver_partitionschedule_mantendo_window_alteracao();

    }
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 4000
    );

    return 1;
}

function functratamententodados_r0_visualiza_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_rneg_visualiza_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_ind_visualiza_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;
    return 1;

}

function visualiza_window_schedule_alterar() {
    envia_recebe_gen_universal_POST('não usado', funcvalidacaocampos_visualiza_alteracao, 'não usado', funcrecolhecamposenviar_visualiza_alteracao, 'configura_alteracao.php', 'visualiza_alteracao_b', 'não usado', functratamententodados_r1_visualiza_alteracao, 'form_mensagem_partitionschedule_visualiza_alteracao', ".form_inf_geral", functratamententodados_r0_visualiza_alteracao, functratamententodados_rneg_visualiza_alteracao, functratamententodados_ind_visualiza_alteracao);
}


var tipo_acao = "";

function add_new_window_schedule() {

    let novo_window_identifier;

    obtem_vista_f('vista_window_schedule_nova_v2.php', 'conteudo_vista_visualiza_ws', 'form_mensagem_partitionschedule_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_ws').showModal();
            control_tabs.atualiza_dropdown_partition_box("partition_id_ws_nova", obj_configuration.partitions_obj);
            novo_window_identifier = control_tabs.obtem_window_identifier_from_visualiza(indice_partitionschedule_selecionada);
            document.getElementById('windowidentifier_id_visualiza_ws_nova').value = novo_window_identifier;
            document.getElementById('windowidentifier_id_visualiza_ws_nova').setAttribute('min', novo_window_identifier);
            document.getElementById("coreidentifier_id_visualiza_ws_nova").setAttribute('max', obj_configuration.airconfiguration_obj.requiredcores);
             
            document.getElementById('dialog-box_visualiza_ws').style.left = 60 + '%';
            document.getElementById('dialog-box_visualiza_ws').style.top = 0 + '%';
            tipo_acao = TIPOACAO_NWS;
        }, 1000
    );
}

function alter_window_schedule(indice_window_shedule, windowdurationseconds, coreidentifier, partitionidentifier, idpartitionconfiguration, windowidentifier) {

    let objtemp;

    obtem_vista_f('vista_window_schedule_alter_v2.php', 'conteudo_vista_visualiza_ws', 'form_mensagem_partitionschedule_visualiza_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_ws').showModal();
            control_tabs.atualiza_dropdown_partition_box("partition_id_ws_alter", obj_configuration.partitions_obj);

            objtemp = document.getElementById("partition_id_visualiza_ws_alter");
            objtemp.options[objtemp.selectedIndex].text = partitionidentifier;
            objtemp.setAttribute('data-id', idpartitionconfiguration);
        
            document.getElementById("coreidentifier_id_visualiza_ws_alter").setAttribute('max', obj_configuration.airconfiguration_obj.requiredcores);

            document.getElementById("windowdurationseconds_id_visualiza_ws_alter").value = windowdurationseconds;
            document.getElementById("coreidentifier_id_visualiza_ws_alter").value = coreidentifier;
            document.getElementById('form_visualiza_ws_alter').setAttribute('data-indice_ws', indice_window_shedule);
            document.getElementById("title_id_visualiza_ws_alter").innerText = 'Alter window schedule ' +  windowidentifier;

            if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].partitionperiodstart == 'true') {
                document.getElementById('partitionperiodstart_id_visualiza_ws_alter').checked = true;
            } else {
                document.getElementById('partitionperiodstart_id_visualiza_ws_alter').checked = false;
            }

            document.getElementById('dialog-box_visualiza_ws').style.left = 55 + '%';
            document.getElementById('dialog-box_visualiza_ws').style.top = 0 + '%';
            tipo_acao = TIPOACAO_AWS;

        }, 1000
    );
}

function add_new_partition(){
    obtem_vista_f('vista_partitions_v2.php', 'conteudo_vista_visualiza_ws', 'form_mensagem_partitionschedule_visualiza_alteracao');

     let novo_partition_identifier = 0;   
     setTimeout(
        function () {
            document.getElementById('dialog-box_visualiza_ws').showModal();
            novo_partition_identifier = control_tabs.obtem_partition_identifier(obj_configuration);
            document.getElementById('partitionidentifier_id_visualiza_p_nova').value = novo_partition_identifier;
            document.getElementById('partitionidentifier_id_visualiza_p_nova').setAttribute('min',novo_partition_identifier);
            document.getElementById('partitionname_id_visualiza_p_nova').value = 'p' + novo_partition_identifier;
            document.getElementById('dialog-box_visualiza_ws').style.left = 55 + '%';
            document.getElementById('dialog-box_visualiza_ws').style.top = 0 + '%';
            tipo_acao = TIPOACAO_NP;

        }, 1000
    );
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//Executar 3 opções de alteração no canvas
//-----------------------------------------------------------------------------------------------------------------------------------------

function obtem_windowschedule_NWS(){

    let hash = {};
    let windowschedule_conta = 0;
    let new_windowschedule_indice = -1;
    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let alt_value;
    let indicepartition = 0;
    let periodseconds_p = 0;
    let windowstartseconds_p = 0;
    let perioddurationseconds_p = 0;
    let windowdurationseconds_p = 0;
    let soma_windowdurationseconds_p = 0;
    let core_p = 0;
    let partitionconfigurationid_p = 0;
    let i = 0;
    let obj = null;

    if (indice_partitionschedule_selecionada >= 0) {

        windowschedule_conta = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj.length;

        if (windowschedule_conta >= 0) new_windowschedule_indice = windowschedule_conta;

        if (new_windowschedule_indice >= 0) {

            alt_value = document.getElementById("windowidentifier_id_visualiza_ws_nova").value;
            if (valida_num_sup_zero(alt_value, 'Window identifier', hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            alt_value = document.getElementById("coreidentifier_id_visualiza_ws_nova").value;
            if (valida_num_sup_zero(alt_value, 'Core identifier', hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }
            core_p = alt_value;

            alt_value = document.getElementById("partition_id_visualiza_ws_nova").getAttribute('data-id');
            if (valida_id_num_dropdown(alt_value, 'Partition', hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }
            partitionconfigurationid_p = alt_value;

            alt_value = document.getElementById("windowstartseconds_id_visualiza_ws_nova").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window start seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }
            windowstartseconds_p = alt_value;
            periodseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].periodseconds;
            if (regra_verifica_windowstartseconds_periodseconds(windowstartseconds_p, periodseconds_p, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            alt_value = document.getElementById("windowdurationseconds_id_visualiza_ws_nova").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window duration seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }
            windowdurationseconds_p = alt_value;

            perioddurationseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].perioddurationseconds;
            if (regra_verifica_windowdurationseconds_periodseconds(windowdurationseconds_p, windowstartseconds_p, periodseconds_p, perioddurationseconds_p, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            if (valida_boolean(document.getElementById('partitionperiodstart_id_visualiza_ws_nova').checked, 'partitionperiodstart', hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            windowschedule_conta = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj.length;
            perioddurationseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].perioddurationseconds;
            for (i = 0; i < windowschedule_conta; i++) {

                if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[i].coreidentifier == core_p) {

                    soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[i].windowdurationseconds);
                }

            }
            soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * windowdurationseconds_p);


            if (regra_verifica_windowdurationseconds_total(soma_windowdurationseconds_p, perioddurationseconds_p, indice_partitionschedule_selecionada, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            if (regra_verifica_sobreposicao(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, core_p, windowdurationseconds_p, windowstartseconds_p, true, -1, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            if (regra_verifica_cores(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada], obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, core_p, true, -1, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            if (regra_verifica_cores_partition(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, obj_configuration.partitions_obj, partitionconfigurationid_p, core_p, true, -1, hash) < 1) {
                mostra_mensagem_box(hash['mensagem']);
                return 0;
            }

            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice] = new windowschedule_cls();

            obj = document.getElementById("windowidentifier_id_visualiza_ws_nova");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].windowidentifier = alt_value;

            obj = document.getElementById("coreidentifier_id_visualiza_ws_nova");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].coreidentifier = alt_value;

            obj = document.getElementById("partition_id_visualiza_ws_nova");
            alt_value = obj.getAttribute('data-id');
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].idpartitionconfiguration = alt_value;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].idpartitionschedule = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].id;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].id = 0;

            obj = document.getElementById("windowstartseconds_id_visualiza_ws_nova");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].windowstartseconds = alt_value;

            obj = document.getElementById("windowdurationseconds_id_visualiza_ws_nova");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].windowdurationseconds = alt_value;

            alt_value = document.getElementById('partitionperiodstart_id_visualiza_ws_nova').checked.toString();
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].partitionperiodstart = alt_value;

            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].stateid = CRIAR;
            obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[new_windowschedule_indice].statedesc = CRIARDESC;

            obj_configuration.alterado[5] = 1;
            return 1;

        }else{
            mostra_mensagem_box('Novo indice de windowschedule inferior a zero!...');
            return 0;           
        }
     
    } else{
        mostra_mensagem_box('Não selecionou nenhuma partitionschedule!...');
        return 0;
    }   
}

function change_delete_state(obj){
    if (obj.checked = true){
        obj.value = 1;
    }else{
        obj.value = 0;
    }
}

function obtem_windowschedule_AWS(){

    let hash = {};
    let indice_window_shedule = -1;

    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let i = 0;
    let alt_value;
    let alterou = 0;
    let periodseconds_p = 0;
    let windowstartseconds_p = 0;
    let perioddurationseconds_p = 0;
    let windowdurationseconds_p = 0;
    let windowschedule_conta = 0;
    let soma_windowdurationseconds_p = 0;
    let core_p = 0;
    let partitionconfigurationid_p = 0;


    if (indice_partitionschedule_selecionada >= 0) {

        indice_window_shedule = Number(document.getElementById('form_visualiza_ws_alter').getAttribute('data-indice_ws'));

        if (indice_window_shedule >= 0) {

            if (document.getElementById('deletews_id_visualiza_ws_alter').value == 1){

                obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].stateid = APAGAR;
                obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].statedesc = APAGARDESC;

                obj_configuration.alterado[5] = 1;
                return 1;
            }else{

                alt_value = document.getElementById("coreidentifier_id_visualiza_ws_alter").value;
                if (valida_num_sup_zero(alt_value, 'Core identifier', hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }
                core_p = alt_value;

                value = document.getElementById("partition_id_visualiza_ws_alter").getAttribute('data-id');
                if (valida_id_num_dropdown(value, 'Partition', hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }
                partitionconfigurationid_p = value;

                windowstartseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].windowstartseconds;

                periodseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].periodseconds;
                if (regra_verifica_windowstartseconds_periodseconds(windowstartseconds_p, periodseconds_p, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                alt_value = document.getElementById("windowdurationseconds_id_visualiza_ws_alter").value;
                if (!expreg.test(alt_value)) {
                    hash['mensagem'] = "Window duration seconds: Deve respeitar o formato x.xxxxx!...";
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                windowdurationseconds_p = alt_value;
                perioddurationseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].perioddurationseconds;
                if (regra_verifica_windowdurationseconds_periodseconds(windowdurationseconds_p, windowstartseconds_p, periodseconds_p, perioddurationseconds_p, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                if (valida_boolean(document.getElementById('partitionperiodstart_id_visualiza_ws_alter').checked, 'partitionperiodstart', hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                windowschedule_conta = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj.length;
                perioddurationseconds_p = obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].perioddurationseconds;

                for (i = 0; i < windowschedule_conta; i++) {

                    if (i != indice_window_shedule && obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[i].coreidentifier == core_p) {

                        soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[i].windowdurationseconds);
                    }
                }
                soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * windowdurationseconds_p);

                if (regra_verifica_windowdurationseconds_total(soma_windowdurationseconds_p, perioddurationseconds_p, indice_partitionschedule_selecionada, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                if (regra_verifica_sobreposicao(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, core_p, windowdurationseconds_p, windowstartseconds_p, false, indice_window_shedule, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                if (regra_verifica_cores(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada], obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, core_p, false, indice_window_shedule, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                if (regra_verifica_cores_partition(obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj, obj_configuration.partitions_obj, partitionconfigurationid_p, core_p, false, indice_window_shedule, hash) < 1) {
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }

                alt_value = document.getElementById('coreidentifier_id_visualiza_ws_alter').value;
                if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].coreidentifier != alt_value) {
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].coreidentifier = alt_value;
                    alterou = 1;
                }

                alt_value = document.getElementById('partition_id_visualiza_ws_alter').getAttribute('data-id');
                if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].idpartitionconfiguration != alt_value) {
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].idpartitionconfiguration = alt_value;
                    alterou = 1;
                }

                alt_value = document.getElementById('windowdurationseconds_id_visualiza_ws_alter').value;
                if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].windowdurationseconds != alt_value) {
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].windowdurationseconds = alt_value;
                    alterou = 1;
                }

                alt_value = document.getElementById('partitionperiodstart_id_visualiza_ws_alter').checked.toString();
                if (obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].partitionperiodstart != alt_value) {
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].partitionperiodstart = alt_value;
                    alterou = 1;
                }
                if (alterou == 1) {
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].stateid = ALTERAR;
                    obj_configuration.partitionschedule_obj[indice_partitionschedule_selecionada].windowschedule_obj[indice_window_shedule].statedesc = ALTERARDESC;
                    obj_configuration.alterado[5] = 1;
                    return 1;
                }else{
                    hash['mensagem'] = 'Não efetuou alterações. ';
                    mostra_mensagem_box(hash['mensagem']);
                    return 0;
                }
            }

        }else{
            hash['mensagem'] = 'Indice de windowschedule inferior a zero!...';
            mostra_mensagem_box(hash['mensagem']);
            return 0;    
        }
    }else{
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem_box(hash['mensagem']);
        return 0;
    }            

}

function obtem_windowschedule_NP(){

    let partitions_count = obj_configuration.partitions_obj.length;
    let new_partition_indice = -1;
    let hash = {};
    let expreg = new RegExp("[0-9]{1}(x)(\\d{6})$");
    let i = 0;
    let obj = null;

    if (partitions_count >= 0) new_partition_indice = partitions_count;

    if (new_partition_indice >= 0) {

        if (valida_id_num_dropdown(document.getElementById("criticality_id_visualiza_p_nova").getAttribute('data-id'), 'Criticality', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_texto(document.getElementById('entrypoint_id_visualiza_p_nova').value, 'Entrypoint', "", true, 1, 30, hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_texto(document.getElementById('partitionname_id_visualiza_p_nova').value, 'Partitionname', "", true, 1, 20, hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        alt_value = document.getElementById("partitionidentifier_id_visualiza_p_nova").value;
        if (valida_num_sup_zero(alt_value, 'Partitionidentifier', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_boolean(document.getElementById('systempartition_id_visualiza_p_nova').checked, 'systempartition', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        alt_value = document.getElementById("cores_id_visualiza_p_nova").value;
        if (valida_num_sup_zero(alt_value, 'Cores', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (regra_verifica_numero_cores(obj_configuration, alt_value, hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_texto(document.getElementById('cache_id_visualiza_p_nova').value, 'Cache', "", false, 0, 0, hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_multiselect('libs_visualiza_p_nova', 'Libs', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_multiselect('personality_visualiza_p_nova', 'Personality', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_multiselect('devices_visualiza_p_nova', 'Devices', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        if (valida_multiselect('permissions_visualiza_p_nova', 'Permissions', hash) < 1) {
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        alt_value = document.getElementById("size_id_visualiza_p_nova").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Size: Deve respeitar o formato 0x000000!...";
            mostra_mensagem_box(hash['mensagem']);
            return 0;
        }

        obj = document.getElementById("criticality_id_visualiza_p_nova");
        alt_value = obj.getAttribute('data-id');

        obj_configuration.partitions_obj[new_partition_indice] = new partitions_cls();

        obj_configuration.partitions_obj[new_partition_indice].criticality = alt_value;
        obj_configuration.partitions_obj[new_partition_indice].criticalitydesc = obj.options[obj.selectedIndex].text;

        alt_value = document.getElementById('entrypoint_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].entrypoint = alt_value;

        alt_value = document.getElementById('partitionname_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionname = alt_value;

        alt_value = document.getElementById('partitionidentifier_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionidentifier = alt_value;

        alt_value = document.getElementById('systempartition_id_visualiza_p_nova').checked.toString();
        obj_configuration.partitions_obj[new_partition_indice].systempartition = alt_value;

        alt_value = document.getElementById('cores_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.cores = alt_value;

        alt_value = document.getElementById('cache_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.cache = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('libs_visualiza_p_nova');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idslibs = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('libs_visualiza_p_nova')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.libs = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('personality_visualiza_p_nova');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idspersonality = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('personality_visualiza_p_nova')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.personality = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('devices_visualiza_p_nova');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idsdevices = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('devices_visualiza_p_nova')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.devices = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('permissions_visualiza_p_nova');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idspermissions = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('permissions_visualiza_p_nova')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.permissions = alt_value;

        alt_value = document.getElementById('size_id_visualiza_p_nova').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.memory_obj.size = alt_value;

        obj_configuration.partitions_obj[new_partition_indice].id = 0;

        obj_configuration.partitions_obj[new_partition_indice].stateid = CRIAR;
        obj_configuration.partitions_obj[new_partition_indice].statedesc = CRIARDESC;

        obj_configuration.partitions_obj[new_partition_indice].idarinc653module = obj_configuration.arinc653module_obj.id;

        obj_configuration.alterado[4] = 1;
        return 1;       

    }else{
        mostra_mensagem_box('Novo indice de partition inferior a zero!...');
        return 0;  
    }

}

function funcvalidacaocampos_visualiza_ws(pf_nome_form) {

    let result = 0;

    switch (tipo_acao) {
        case TIPOACAO_NWS:
            result =  obtem_windowschedule_NWS();
            break;
        case TIPOACAO_AWS:
            result =  obtem_windowschedule_AWS();
            break;
        case TIPOACAO_NP:
            result =  obtem_windowschedule_NP();
            break;
        default:
            mensagem = "Não escolheu nenhuma opção de alteração!...";
            mostra_mensagem_box(mensagem);
            return 0;
    }

    return result;
   
}


function funcrecolhecamposenviar_visualiza_ws(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    let guardaObjserializado = JSON.stringify(obj_configuration);

    pf_form_dados.append('objectoconfiguration', guardaObjserializado);
    pf_form_dados.append('existiu_alteracao', 1);
    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_visualiza_ws(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    let idrow;

    guarda_inf_visualiza_pesquisa = JSON.parse(pf_resposta.dados);

    if (guarda_id_row !== "") {

        idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
        visualiza_alteracao_prenche_form(idrow);
        ver_partitionschedule_mantendo_window_alteracao();

    }
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 4000
    );

    return 1;
}

function functratamententodados_r0_visualiza_ws(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_rneg_visualiza_ws(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_ind_visualiza_ws(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;
    return 1;

}


function alterar_visualiza_ws() {

    envia_recebe_gen_universal_POST('não usado', funcvalidacaocampos_visualiza_ws, 'não usado', funcrecolhecamposenviar_visualiza_ws, 'configura_alteracao.php', 'visualiza_alteracao_b', 'não usado', functratamententodados_r1_visualiza_ws, 'form_mensagem_partitionschedule_visualiza_alteracao', ".form_inf_geral", functratamententodados_r0_visualiza_ws, functratamententodados_rneg_visualiza_ws, functratamententodados_ind_visualiza_ws);
}