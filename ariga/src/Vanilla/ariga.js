function mostrar_login() {
    document.getElementById('login_id').style.display = 'block';
}

function fechar_login() {
    document.getElementById('login_id').style.display = 'none';
    document.getElementById('form_login').reset();
}

function mostraresconderpassword(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
var estadomenu = 1;


function MobileMenu() {

    var objmenu = document.getElementById('templatemenu');
    var objmenuicon = document.getElementById('controla-icon-menu');

    let tamanho_vp = window.innerWidth;

    if (estadomenu == 0) {

        if (tamanho_vp > 500) {

            objmenu.style.transform = "translateX(0%)";
            objmenu.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
            objmenu.style.overflow = "hidden";
            if (objmenu.style.display == 'none') objmenu.style.display = "block";

        } else {

            objmenu.style.transform = "translateX(0%)";
            objmenu.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
            objmenu.style.overflow = "hidden";
            objmenu.style.display = "block";
        }

        // objmenuicon.style.transform = "translateX(90%)";
        // objmenuicon.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
        // objmenuicon.style.overflow = "hidden";
        estadomenu = 1;
    } else {

        if (tamanho_vp > 500) {
            objmenu.style.transform = "translateX(-110%)";
            objmenu.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
            objmenu.style.overflow = "hidden";

        } else {
            objmenu.style.transform = "translateX(-110%)";
            objmenu.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
            objmenu.style.overflow = "hidden";
            objmenu.style.display = "none";
        }

        // objmenuicon.style.transform = "translateX(0%)";
        // objmenuicon.style.transition = "all 235ms cubic-bezier(.95, .05, .795, .035)";
        // objmenuicon.style.overflow = "hidden";

        estadomenu = 0;
    }

}


var menuraiz = "ulmenu0";
var menunivel = 0;
var menuatual = "ulmenu0";
var submenu_inicio = 0;
var submenu_fim = 0;
var op_display = "";
var submenuselecionado_id = "";
var nivel_acesso = 0;
var guarda_id_obj = null;
var guarda_id_row = "";
var campos_alterados = {};
var cod_dd_para_atualizar = "";

function atualiza_atributo_drop_data_id(nomeid) {
    let objdp = document.getElementById(nomeid);
    let valor = objdp.value;
    objdp.setAttribute('data-id', valor);
    objdp.options[0].text = "-- Selecionar --";
}

function controla_selecao_menu(menuid, inicio, fim) {

    var obj;

    for (i = inicio; i <= fim; i++) {
        obj = document.getElementById("limenu" + i);
        obj.style.textDecoration = "none";
    }

    obj = document.getElementById(menuid);
    obj.style.textDecoration = "underline solid rgba(73, 72, 72, 0.87) 5px";
    submenuselecionado_id = menuid;
}

function gestaomenu(limenu, inicioli, fimli, ulmenu) {

    controla_selecao_menu(limenu, inicioli, fimli);

    let result = ulmenu.substring(0, 6);

    if ("ulmenu" == result && menunivel == 0) {
        document.getElementById('controla-icon-menubak').style.display = "block";
        document.getElementById(ulmenu).style.display = "block";
        //debug - menus
        //alert('ola1');
        document.getElementById(menuraiz).style.display = "none";

        for (i = inicioli; i <= fimli; i++) {
            obj = document.getElementById("limenu" + i);
            obj.style.textDecoration = "none";
        }
        menunivel = 1;
        menuatual = ulmenu;
    } else {
        submenu_inicio = inicioli;
        submenu_fim = fimli;
    }
    if (result != "ulmenu") {

        if (op_display != "") {
            obj = document.getElementById(op_display);
            reset_op_display(op_display);
            obj.style.display = "none";
        }
        obj = document.getElementById(ulmenu);
        obj.style.display = "block";
        prepara_op_display(ulmenu);
        //debug - display op
        //alert(ulmenu);
        op_display = ulmenu;
        obj.scrollTop = 0;
        nivel_acesso = document.getElementById(limenu).getAttribute('data-nacesso');
    } else {
        obj = document.getElementById(op_display);
        reset_op_display(op_display);
        if (obj !== null) {
            obj.style.display = "none";
        }
        op_display = "";
    }
}

function MobileMenuback() {

    if (menunivel == 1) {

        if (submenu_inicio > 0) {
            for (i = submenu_inicio; i <= submenu_fim; i++) {
                obj = document.getElementById("limenu" + i);
                obj.style.textDecoration = "none";
            }
        }

        document.getElementById(menuatual).style.display = "none";
        document.getElementById(menuraiz).style.display = "block";
        menunivel = 0;
        menuatual = "";
        submenuselecionado_id = "";
        document.getElementById('controla-icon-menubak').style.display = "none";

        submenu_inicio = 0;
        submenu_fim = 0;
    }
    if (op_display != "") {
        obj = document.getElementById(op_display);
        obj.style.display = "none";
        reset_op_display(op_display);
    }

    return 1;

}

function reset_op_display(op_display_p) {

    if (op_display_p == "manutencao_tabelas_sistemaid") {
        manutencao_tabelas_sistema_fechar_f_usar_menu();
    }

    if (op_display_p == "gestaoutilizadoresid") {
        gestaoutilizadores_fechar_f_usar_menu();
    }

    if (op_display_p == "gestaoautenticacaoid") {
        gestaoautenticacao_fechar_f_usar_menu();
    }

    if (op_display_p == "gestaoperfilid") {
        gestaoperfil_fechar_f_usar_menu();
    }

    if (op_display_p == "xmlimportarid") {
        xmlimportar_fechar_f_usar_menu();
    }

    if (op_display_p == "xmlexportarid") {
        xmlexportar_fechar_f_usar_menu();
    }

    if (op_display_p == "configuraid") {
        configura_fechar_f_usar_menu();
    }

    if (op_display_p == "visualizaid") {
        visualiza_fechar_f_usar_menu();
    }
}

function prepara_op_display(op_display_p) {

    if (op_display_p == "manutencao_tabelas_sistemaid") {

    }

    if (op_display_p == "gestaoutilizadoresid") {

    }

    if (op_display_p == "gestaoautenticacaoid") {

    }

    if (op_display_p == "gestaoperfilid") {

    }

    if (op_display_p == "xmlimportarid") {

    }

    if (op_display_p == "configuraid") {

    }

    if (op_display_p == "visualizaid") {

    }

}
//--------------------------------------------------validação de campos-----------------------------------------------
function valida_texto(valorvalidar, designacao, formato, validalimites, tamanhoinf, tamanhosup, mensagem_erro_p) {

    $tamanhotexto = 0;

    if (valorvalidar == "") {
        mensagem_erro_p['mensagem'] = designacao + ': Não preenchido.';
        return 0;
    }
    if (formato !== "") {
        let objformato = new RegExp(formato);
        if (!objformato.test(valorvalidar)) {
            mensagem_erro_p['mensagem'] = designacao + ': Formato inválido.';
            return 0;
        }
    }

    if (validalimites == 'S') {
        tamanhotexto = valorvalidar.length;

        if (tamanhoinf !== null) {
            if (tamanhotexto < tamanhoinf) {
                mensagem_erro_p['mensagem'] = designacao + ': Tamanho inválido.';
                return 0;
            }
        }
        if (tamanhosup !== null) {
            if (tamanhotexto > tamanhosup) {
                mensagem_erro_p['mensagem'] = designacao + ': Tamanho inválido.';
                return 0;
            }
        }
    }
    return 1;
}

function valida_id_s_n_dropdown(valorvalidar, designacao, mensagem_erro_p) {
    $convnum = 0;

    if (valorvalidar === null) {
        mensagem_erro_p['mensagem'] = designacao + ': Não preenchido.';
        return 0;
    } else {
        if (valorvalidar.length != 1) {

            mensagem_erro_p['mensagem'] = designacao + ': Valor inválido.';
            return 0;

        } else {
            if (valorvalidar == 'S' || valorvalidar == 'N') {
                return 1;
            } else {
                mensagem_erro_p['mensagem'] = designacao + ': Valor inválido.';
                return 0;
            }

        }
    }
}
function limpa_data_obj_id(nomeid, valor, drop) {
    let objdp = document.getElementById(nomeid);
    if (drop == 1) {
        objdp.setAttribute('data-id', valor);
        objdp.options[0].text = "-- Selecionar --";
    } else {
        objdp.value = valor;
    }
}

function valida_id_num_dropdown(valorvalidar, designacao, mensagem_erro_p) {
    $convnum = 0;

    if (valorvalidar === null) {
        mensagem_erro_p['mensagem'] = designacao + ': Não preenchido.';
        return 0;
    } else {
        if (valorvalidar < 1) {

            mensagem_erro_p['mensagem'] = designacao + ': Valor inválido.';
            return 0;

        } else {
            return 1;
        }
    }
}

function valida_num_sup_zero(valorvalidar, designacao, mensagem_erro_p) {

    if (valorvalidar === null) {
        mensagem_erro_p['mensagem'] = designacao + ': Não preenchido.';
        return 0;
    } else {
        if (valorvalidar < 1) {

            mensagem_erro_p['mensagem'] = designacao + ': Valor inválido.';
            return 0;

        } else {
            return 1;
        }
    }
}

function valida_boolean(valorvalidar, designacao, mensagem_erro_p) {

    if (valorvalidar === false || valorvalidar === true) {
        return 1;
    } else {
        mensagem_erro_p['mensagem'] = designacao + ': Valor inválido.';
        return 0;
    }
}


function valida_multiselect(nameobj, designacao, mensagem_erro_p) {

    let tem_pelo_menos_uma = 0;
    let arraycheckboxs = document.getElementsByName(nameobj + '_chk');
    let len_arraycheckboxs = arraycheckboxs.length;
    if (len_arraycheckboxs < 1) {
        mensagem_erro_p['mensagem'] = designacao + ': Sem opções para validar.';
        return 0;
    }

    if (document.getElementById(nameobj + '_label').value == '') {
        mensagem_erro_p['mensagem'] = designacao + ': Sem opções selecionadas.';
        return 0;
    }

    let i = 0;

    for (i = 0; i < len_arraycheckboxs; i++) {
        if (arraycheckboxs[i].checked == true) {
            tem_pelo_menos_uma = 1;
        }
    }

    if (tem_pelo_menos_uma == 0) {
        mensagem_erro_p['mensagem'] = designacao + ': Sem opções selecionadas.';
        return 0;
    }

    return 1;
}

function mostra_mensagem(hash_p, iddivmensagem) {

    document.getElementById(iddivmensagem).innerHTML = hash_p['mensagem'];
    document.getElementById(iddivmensagem).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(iddivmensagem).innerHTML = '';
            document.getElementById(iddivmensagem).style.display = "none";
        }, 5000
    );
}
//------------------------------------------------------login----------------------------------------------------------------------------------
function funcvalidacaocampos_login(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_login(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_login(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById(pf_botao_ele_submit).disabled = true;
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).display = "none";
        }, 4000
    );
    setTimeout(
        function () {
            window.location.href = pf_resposta.pagina_a_redirecionar;
        }, 1000
    );

    return 1;
}

function functratamententodados_r0_login(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById(pf_botao_ele_submit).disabled = false;
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 4000
    );
}

function functratamententodados_rneg_login(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById(pf_botao_ele_submit).disabled = false;
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 4000
    );
}

function functratamententodados_ind_login(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById(pf_botao_ele_submit).disabled = false;
    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 4000
    );

}

function login() {
    envia_recebe_gen_universal_POST('form_login', funcvalidacaocampos_login, 'dados_elem_form_login', funcrecolhecamposenviar_login, 'efetua_login.php', 'b_submit_id', 'Nao_usado', functratamententodados_r1_login, 'form_mensagem_login', ".form_inf_geral", functratamententodados_r0_login, functratamententodados_rneg_login, functratamententodados_ind_login);
}


//------------------------------------------------------Log out----------------------------------------------------------------------------------


function funcvalidacaocampos_fechasessao(pf_nome_form) {
    return 1;
}



function funcrecolhecamposenviar_fechasessao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}


function functratamententodados_r1_fechasessao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {
    setTimeout(
        function () {
            alert(pf_resposta.descresultado);
            window.location.href = pf_resposta.pagina_a_redirecionar;
        }, 1000
    )

    return 1;
}

function functratamententodados_r0_fechasessao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    return 1;
}

function functratamententodados_rneg_fechasessao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    return 1;
}

function functratamententodados_ind_fechasessao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    return 1;
}

function close_login() {
    envia_recebe_gen_universal_POST('sem_form', funcvalidacaocampos_fechasessao, 'sem_dados_form', funcrecolhecamposenviar_fechasessao, 'fecha_sessao.php', 'sem_botao', 'sem_ihtml', functratamententodados_r1_fechasessao, 'sem_mensagem_conteudoadicional', ".form_inf_geral", functratamententodados_r0_fechasessao, functratamententodados_rneg_fechasessao, functratamententodados_ind_fechasessao, 1);
}

/*---------------------------------Manutenção de tabelas--------------------------------------------------*/
var estado_manutencao_tabelas_sistema_criacao = 0;

function manutencao_tabelas_sistema_abrir_criacao_f() {
    if (estado_manutencao_tabelas_sistema_criacao == 0) {
        document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "block";
        document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "block";
        document.getElementById("novo_registo_tabela_sistema_id").innerText = "Esconde - Inserir novo registo \ tabela";
        estado_manutencao_tabelas_sistema_criacao = 1;

    } else {
        document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "none";
        document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "none";
        document.getElementById("novo_registo_tabela_sistema_id").innerText = "Mostra - Inserir novo registo \ tabela";
        estado_manutencao_tabelas_sistema_criacao = 0;
    }

    document.getElementById('form_manutencao_tabelas_sistema_criacao').reset();
    document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "none";
    document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "none";
    document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();

    if (guarda_id_obj !== null) {
        guarda_id_obj.classList.remove('active-row');
        guarda_id_obj = null;
        guarda_id_row = "";
    }
}

function manutencao_tabelas_sistema_fechar_f_usar_menu() {

    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";

        document.getElementById('manutencao_tabelas_sistema_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_manutencao_tabelas_sistema_pesquisa").reset();

        document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "none";
        document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();
        document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "none";
        document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "none";
        document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "none";
        document.getElementById('form_manutencao_tabelas_sistema_criacao').reset();

        document.getElementById("novo_registo_tabela_sistema_id").innerText = "Mostra - Inserir novo registo \ tabela";
        estado_manutencao_tabelas_sistema_criacao = 0;
    }

}
function fechar_manutencao_tabelas_sistema_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('manutencao_tabelas_sistema_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_manutencao_tabelas_sistema_pesquisa").reset();

        document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "none";
        document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();
        document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "none";
        document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "none";
        document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "none";
        document.getElementById('form_manutencao_tabelas_sistema_criacao').reset();
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }

    document.getElementById("novo_registo_tabela_sistema_id").innerText = "Mostra - Inserir novo registo \ tabela";
    estado_manutencao_tabelas_sistema_criacao = 0;
}


//Manutenção Pesquisa----------------------------------------------------------------------------------------
function valida_data_manutencao_tabelas_sistema_pesquisa(hash_p) {

    let idobj = document.getElementById("tabela_id_manutencao_tabelas_sistema_pesquisa");
    let valor_pesq = idobj.getAttribute('data-id');

    if (valor_pesq != "" && valor_pesq != "0") {
        if (idobj.getAttribute('data-required') == 'S') {
            if (valida_texto(valor_pesq, 'Tabela', "", 'S', 2, 5, hash_p) < 1) {
                return 0;
            } else {
                return 1;
            }
        } else return 1;
    } else {
        hash_p['mensagem'] = "Não selecionou a tabela pretendida!...";
        return 0;
    }
}

function funcvalidacaocampos_manutencao_tabelas_sistema_pesquisa(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    let hash = {};
    hash['mensagem'] = "";

    if (valida_data_manutencao_tabelas_sistema_pesquisa(hash) < 1) {

        document.getElementById("form_mensagem_manutencao_tabelas_sistema_pesquisa").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_manutencao_tabelas_sistema_pesquisa").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_manutencao_tabelas_sistema_pesquisa").innerHTML = '';
                document.getElementById("form_mensagem_manutencao_tabelas_sistema_pesquisa").style.display = "none";
            }, 5000
        );

        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_manutencao_tabelas_sistema_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    let idobj = document.getElementById("tabela_id_manutencao_tabelas_sistema_pesquisa");
    let tipo_tab = idobj.getAttribute('data-tipo');
    pf_form_dados.append('tipo_tab_manutencao_tabelas_sistema_pesquisa', tipo_tab);

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

var guarda_inf_manutencao_tabelas_sistema_pesquisa = "";

function functratamententodados_r1_manutencao_tabelas_sistema_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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
    guarda_inf_manutencao_tabelas_sistema_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_manutencao_tabelas_sistema_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
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

function functratamententodados_rneg_manutencao_tabelas_sistema_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_manutencao_tabelas_sistema_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function manutencao_tabelas_sistema_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_manutencao_tabelas_sistema_pesquisa', funcvalidacaocampos_manutencao_tabelas_sistema_pesquisa, 'dados_elem_form_manutencao_tabelas_sistema_pesquisa', funcrecolhecamposenviar_manutencao_tabelas_sistema_pesquisa, 'manutencao_tabelas_sistema_pesquisa.php', 'submit_manutencao_tabelas_sistema_pesquisa', 'manutencao_tabelas_sistema_pesquisa_ihtml', functratamententodados_r1_manutencao_tabelas_sistema_pesquisa, 'form_mensagem_manutencao_tabelas_sistema_pesquisa', ".form_inf_geral", functratamententodados_r0_manutencao_tabelas_sistema_pesquisa, functratamententodados_rneg_manutencao_tabelas_sistema_pesquisa, functratamententodados_ind_manutencao_tabelas_sistema_pesquisa);
}

function seleciona_linha_listaon_manutencao_tabelas_sistema(e) {

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');
            guarda_id_obj = null;
            guarda_id_row = "";
            document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "none";
            document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();
            document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "none";

        } else {

            e.classList.add('active-row');

            if (guarda_id_obj !== null) {
                guarda_id_obj.classList.remove('active-row');
            }

            guarda_id_obj = e;
            guarda_id_row = e.id;
            manutencao_tabelas_sistema_alteracao_prenche_form(guarda_id_row);
            document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "block";
            document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();
            document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "block";

            document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "none";
            document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "none";
            document.getElementById('form_manutencao_tabelas_sistema_criacao').reset();
            document.getElementById("novo_registo_tabela_sistema_id").innerText = "Mostra - Inserir novo registo \ tabela";
            estado_manutencao_tabelas_sistema_criacao = 0;
        }
    }
}

function manutencao_tabelas_sistema_alteracao_prenche_form(guarda_id_row_p) {

    if (guarda_id_row_p !== "") {

        let idrow = document.getElementById(guarda_id_row_p).getAttribute("data-id");

        if (guarda_inf_manutencao_tabelas_sistema_pesquisa !== "") {

            document.getElementById("codigo_id_manutencao_tabelas_sistema_alteracao").setAttribute('value', guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['ocod']);
            document.getElementById("descricao_id_manutencao_tabelas_sistema_alteracao").setAttribute('value', guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['odesc']);

            dropd = document.getElementById("activo_id_manutencao_tabelas_sistema_alteracao");
            if (guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['oactivo'] == 'S')
                dropd.options[dropd.selectedIndex].text = "-- Sim --";

            else {
                dropd.options[dropd.selectedIndex].text = "-- Não --";
            }
            dropd.setAttribute('data-id', guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['oactivo']);

            document.getElementById("codigo_tabela_id_manutencao_tabelas_sistema_alteracao").setAttribute('value', guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['ocodtabela']);
            document.getElementById("descricao_tabela_id_manutencao_tabelas_sistema_alteracao").setAttribute('value', guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['odesctabela']);
        }
    };
}

campos_alterados = {};

function verifica_alteracoes_campos_man_tab_sistema_alt(hash_p) {

    let valor_pesq = "";
    let valor_alt = "";
    let existiu_alteracao = 0;
    let indice = 0;
    let idobj = null;
    campos_alterados = {};

    if (guarda_id_row !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");

        if (guarda_inf_manutencao_tabelas_sistema_pesquisa !== "") {

            valor_pesq = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['ocod'];
            idobj = document.getElementById("codigo_id_manutencao_tabelas_sistema_alteracao");
            valor_alt = idobj.value;
            if (valor_alt != valor_pesq) {

                if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

                    if (valida_texto(idobj.value, 'Código', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['codigo_manutencao_tabelas_sistema_alteracao'] = valor_alt;

                    }
                }
            }

            valor_pesq = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['odesc'];
            idobj = document.getElementById("descricao_id_manutencao_tabelas_sistema_alteracao");
            valor_alt = idobj.value;
            if (valor_alt != valor_pesq) {

                if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

                    if (valida_texto(idobj.value, 'Descrição', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['descricao_manutencao_tabelas_sistema_alteracao'] = valor_alt;
                    }
                }
            }

            valor_pesq = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['oactivo'];
            idobj = document.getElementById("activo_id_manutencao_tabelas_sistema_alteracao");
            valor_alt = idobj.getAttribute('data-id');
            if (valor_alt != valor_pesq) {
                if (idobj.getAttribute('data-required') == 'S') {

                    if (valida_id_s_n_dropdown(valor_alt, 'Activo', hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['activo_manutencao_tabelas_sistema_alteracao'] = valor_alt;
                    }
                }
            }
        }

        if (existiu_alteracao > 0) {
            campos_alterados['existiu_alteracao_manutencao_tabelas_sistema_alteracao'] = existiu_alteracao;

            if (idrow >= 0) {
                campos_alterados['idtabela_manutencao_tabelas_sistema_alteracao'] = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['oidtabela'];
                campos_alterados['codtabela_manutencao_tabelas_sistema_alteracao'] = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['ocodtabela'];
                cod_dd_para_atualizar = guarda_inf_manutencao_tabelas_sistema_pesquisa[idrow]['ocodtabela'];
            }
            return 1;
        } else {
            hash_p['mensagem'] = "Não efetuou nenhuma alteração";
            return 0;
        }
    } else {
        hash_p['mensagem'] = "Não selecionou nenhuma linha válida";
    }
    return 1;
}

function funcvalidacaocampos_man_tab_sistema_alt(pf_nome_form) {

    let hash = {};
    hash['mensagem'] = "";

    if (verifica_alteracoes_campos_man_tab_sistema_alt(hash) < 1) {

        document.getElementById("form_mensagem_manutencao_tabelas_sistema_alteracao").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_manutencao_tabelas_sistema_alteracao").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_manutencao_tabelas_sistema_alteracao").innerHTML = '';
                document.getElementById("form_mensagem_manutencao_tabelas_sistema_alteracao").style.display = "none";
            }, 5000
        );

        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_manutencao_tabelas_sistema_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {
    for (var key in campos_alterados) {
        pf_form_dados.append(key, campos_alterados[key]);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_manutencao_tabelas_sistema_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";


    limpa_data_obj_id("activo_id_manutencao_tabelas_sistema_alteracao", 0, 1);
    document.getElementById('form_manutencao_tabelas_sistema_alteracao').reset();
    limpa_data_obj_id("codigo_id_manutencao_tabelas_sistema_alteracao", "", 0);
    limpa_data_obj_id("descricao_id_manutencao_tabelas_sistema_alteracao", "", 0);
    limpa_data_obj_id("codigo_tabela_id_manutencao_tabelas_sistema_alteracao", "", 0);
    limpa_data_obj_id("descricao_tabela_id_manutencao_tabelas_sistema_alteracao", "", 0);

    //novo
    control_local.atualiza_manutencao_tabelas_tabcoddesc(cod_dd_para_atualizar, pf_resposta.dados_dd_activo, pf_resposta.dados_dd_total);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('manutencao_tabelas_sistema_pesquisa_ihtml').innerHTML = '';
            document.getElementById("manutencao_tabelas_sistema_alteracao_b").style.display = "none";
            document.getElementById('manutencao_tabelas_sistema_alteracao').style.display = "none";
            window.location.href = "#" + "manutencao_tabelas_sistema_pesquisa";

        }, 2000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_manutencao_tabelas_sistema_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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


function functratamententodados_rneg_manutencao_tabelas_sistema_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_manutencao_tabelas_sistema_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function manutencao_tabelas_sistema_alteracao_f() {

    envia_recebe_gen_universal_POST('form_manutencao_tabelas_sistema_alteracao', funcvalidacaocampos_man_tab_sistema_alt, 'dados_elem_form_manutencao_tabelas_sistema_alteracao', funcrecolhecamposenviar_manutencao_tabelas_sistema_alteracao, 'manutencao_tabelas_sistema_alteracao.php', 'manutencao_tabelas_sistema_alteracao_b', 'dropdown_id_manutencao_tabelas_sistema_pesquisa', functratamententodados_r1_manutencao_tabelas_sistema_alteracao, 'form_mensagem_manutencao_tabelas_sistema_alteracao', ".form_inf_geral", functratamententodados_r0_manutencao_tabelas_sistema_alteracao, functratamententodados_rneg_manutencao_tabelas_sistema_alteracao, functratamententodados_ind_manutencao_tabelas_sistema_alteracao);
}

function funcvalidacaocampos_manutencao_tabelas_sistema_criacao(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_manutencao_tabelas_sistema_criacao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    cod_dd_para_atualizar = document.getElementById("codigo_tabela_id_manutencao_tabelas_sistema_criacao").value;
    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_manutencao_tabelas_sistema_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    document.getElementById('form_manutencao_tabelas_sistema_criacao').reset();

    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.ihtml;

    //novo
    control_local.atualiza_manutencao_tabelas_tabcoddesc(cod_dd_para_atualizar, pf_resposta.dados_dd_activo, pf_resposta.dados_dd_total);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('manutencao_tabelas_sistema_pesquisa_ihtml').innerHTML = '';
            document.getElementById("manutencao_tabelas_sistema_criacao_b").style.display = "none";
            document.getElementById('manutencao_tabelas_sistema_criacao').style.display = "none";
            document.getElementById("novo_registo_tabela_sistema_id").innerText = "Mostra - Inserir novo registo \ tabela";
            estado_manutencao_tabelas_sistema_criacao = 0;
            window.location.href = "#" + "manutencao_tabelas_sistema_pesquisa";

        }, 2000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_manutencao_tabelas_sistema_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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


function functratamententodados_rneg_manutencao_tabelas_sistema_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_manutencao_tabelas_sistema_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function manutencao_tabelas_sistema_criacao_f() {
    envia_recebe_gen_universal_POST('form_manutencao_tabelas_sistema_criacao', funcvalidacaocampos_manutencao_tabelas_sistema_criacao, 'dados_elem_form_manutencao_tabelas_sistema_criacao', funcrecolhecamposenviar_manutencao_tabelas_sistema_criacao, 'manutencao_tabelas_sistema_criacao.php', 'manutencao_tabelas_sistema_criacao_b', 'dropdown_id_manutencao_tabelas_sistema_pesquisa', functratamententodados_r1_manutencao_tabelas_sistema_criacao, 'form_mensagem_manutencao_tabelas_sistema_criacao', ".form_inf_geral", functratamententodados_r0_manutencao_tabelas_sistema_criacao, functratamententodados_rneg_manutencao_tabelas_sistema_criacao, functratamententodados_ind_manutencao_tabelas_sistema_criacao);
}

//-------------------ecran de gestão de utilizador

//Pesquisa----------------------------------------------------------------------------------------
var estado_gestao_utilizadores_criacao = 0;

function gestaoutilizadores_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoutilizadores_pesquisa").reset();
        document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
        document.getElementById('form_gestaoutilizadores_alteracao').reset();
        document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
        document.getElementById('gestaoutilizadores_criacao').style.display = "none";
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
        document.getElementById('form_gestaoutilizadores_criacao').reset();
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
        document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 0;
    }
}

function gestaoutilizadores_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoutilizadores_pesquisa").reset();
        document.getElementById("emailutilizador_id_gu").value = "";
        document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
        document.getElementById('form_gestaoutilizadores_alteracao').reset();
        document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
        document.getElementById('gestaoutilizadores_criacao').style.display = "none";
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
        document.getElementById('form_gestaoutilizadores_criacao').reset();

        document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 0;
    }
}

function gestaoutilizadores_abrir_criacao_f() {
    if (estado_gestao_utilizadores_criacao == 0) {
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "block";
        document.getElementById('gestaoutilizadores_criacao').style.display = "block";
        document.getElementById("novo_registo_id").innerText = "Esconde - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 1;
    } else {
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
        document.getElementById('gestaoutilizadores_criacao').style.display = "none";
        document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 0;
    }

    document.getElementById('form_gestaoutilizadores_criacao').reset();
    document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
    document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
    document.getElementById('form_gestaoutilizadores_alteracao').reset();

    if (guarda_id_obj !== null) {
        guarda_id_obj.classList.remove('active-row');
        guarda_id_obj = null;
        guarda_id_row = "";
    }
}

function funcvalidacaocampos_gestaoutilizadores_pesquisa(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_gestaoutilizadores_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

var guarda_inf_gestaoutilizadores_pesquisa = "";

function functratamententodados_r1_gestaoutilizadores_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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
    guarda_inf_gestaoutilizadores_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_gestaoutilizadores_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
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

function functratamententodados_rneg_gestaoutilizadores_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_gestaoutilizadores_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    var elembackcolor = codigocores.retiramensagemalerta;

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

function gestaoutilizadores_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_gestaoutilizadores_pesquisa', funcvalidacaocampos_gestaoutilizadores_pesquisa, 'dados_elem_form_gestaoutilizadores_pesquisa', funcrecolhecamposenviar_gestaoutilizadores_pesquisa, 'gestaoutilizadores_pesquisa.php', 'gestaoutilizadores_pesquisa_b', 'gestaoutilizadores_pesquisa_ihtml', functratamententodados_r1_gestaoutilizadores_pesquisa, 'form_mensagem_gestaoutilizadores_pesquisa', ".form_inf_geral", functratamententodados_r0_gestaoutilizadores_pesquisa, functratamententodados_rneg_gestaoutilizadores_pesquisa, functratamententodados_ind_gestaoutilizadores_pesquisa);
}



function seleciona_linha_listaon_gestaoutilizadores(e) {

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');

            document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
            document.getElementById('form_gestaoutilizadores_alteracao').reset();
            document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
            guarda_id_obj = null;
            guarda_id_row = "";

        } else {

            e.classList.add('active-row');

            if (guarda_id_obj !== null) {
                guarda_id_obj.classList.remove('active-row');
            }
            guarda_id_obj = e;
            guarda_id_row = e.id;
            gestaoutilizadores_alteracao_prenche_form(guarda_id_row);
            document.getElementById('gestaoutilizadores_alteracao').style.display = "block";
            document.getElementById('form_gestaoutilizadores_alteracao').reset();
            document.getElementById("gestaoutilizadores_alteracao_b").style.display = "block";

            document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
            document.getElementById('gestaoutilizadores_criacao').style.display = "none";
            document.getElementById('form_gestaoutilizadores_criacao').reset();

            document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
            estado_gestao_utilizadores_criacao = 0;
        }
    }
}

function gestaoutilizadores_alteracao_prenche_form(guarda_id_row_p) {
    if (guarda_id_row_p !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
        if (guarda_inf_gestaoutilizadores_pesquisa !== "") {
            document.getElementById("nome_id_alt_gu").setAttribute('value', guarda_inf_gestaoutilizadores_pesquisa[idrow]['onome']);

            let dropd = document.getElementById("activo_id_alt_gu");
            if (guarda_inf_gestaoutilizadores_pesquisa[idrow]['oactivo'] == 'S')
                dropd.options[dropd.selectedIndex].text = "-- Sim --";
            else {
                dropd.options[dropd.selectedIndex].text = "-- Não --";
            }
            dropd.setAttribute('data-id', guarda_inf_gestaoutilizadores_pesquisa[idrow]['oactivo']);

            dropd = document.getElementById("perfil_id_alt_gu");
            dropd.options[dropd.selectedIndex].text = "-- " + guarda_inf_gestaoutilizadores_pesquisa[idrow]['operfilutilizador'] + " --";
            dropd.setAttribute('data-id', guarda_inf_gestaoutilizadores_pesquisa[idrow]['oidperfilutilizador']);

            document.getElementById("emailutilizador_id_alt_gu").setAttribute('value', guarda_inf_gestaoutilizadores_pesquisa[idrow]['ocodutilizador']);
        }
    };
}

//Criação utilizador

function gestaoutilizadores_abrir_criacao_f() {
    if (estado_gestao_utilizadores_criacao == 0) {
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "block";
        document.getElementById('gestaoutilizadores_criacao').style.display = "block";
        document.getElementById("novo_registo_id").innerText = "Esconde - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 1;
    } else {
        document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
        document.getElementById('gestaoutilizadores_criacao').style.display = "none";
        document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
        estado_gestao_utilizadores_criacao = 0;
    }

    document.getElementById('form_gestaoutilizadores_criacao').reset();
    document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
    document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
    document.getElementById('form_gestaoutilizadores_alteracao').reset();

    if (guarda_id_obj !== null) {
        guarda_id_obj.classList.remove('active-row');
        guarda_id_obj = null;
        guarda_id_row = "";
    }
}

function funcvalidacaocampos_gestaoutilizadores_criacao(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_gestaoutilizadores_criacao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById("emailutilizador_id_gu").setAttribute('value', pf_resposta.codutilizador_pesq);
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    document.getElementById('form_gestaoutilizadores_criacao').reset();

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = '';
            document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
            document.getElementById('gestaoutilizadores_criacao').style.display = "none";
            document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
            estado_gestao_utilizadores_criacao = 0;
            window.location.href = "#" + "gestaoutilizadores_pesquisa";



        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoutilizadores_criacao_f() {
    envia_recebe_gen_universal_POST('form_gestaoutilizadores_criacao', funcvalidacaocampos_gestaoutilizadores_criacao, 'dados_elem_form_gestaoutilizadores_criacao', funcrecolhecamposenviar_gestaoutilizadores_criacao, 'gestaoutilizadores_criacao.php', 'gestaoutilizadores_criacao_b', 'nao_usado', functratamententodados_r1_gestaoutilizadores_criacao, 'form_mensagem_gestaoutilizadores_criacao', ".form_inf_geral", functratamententodados_r0_gestaoutilizadores_criacao, functratamententodados_rneg_gestaoutilizadores_criacao, functratamententodados_ind_gestaoutilizadores_criacao);
}

//Alteração utilizador

campos_alterados = {};

function verifica_alteracoes_campos_gestaoutilizadores(hash_p) {

    let valor_pesq = "";
    let valor_alt = "";
    let existiu_alteracao = 0;
    let indice = 0;
    let idobj = null;
    let idrow;

    if (guarda_id_row !== "") {

        idrow = document.getElementById(guarda_id_row).getAttribute("data-id");

        if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

            valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['onome'];
            idobj = document.getElementById("nome_id_alt_gu");
            valor_alt = idobj.value;
            if (valor_alt != valor_pesq) {

                if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

                    if (valida_texto(idobj.value, 'Nome', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;

                        campos_alterados['nome_alt_gu'] = valor_alt;
                    }
                }
            }

            valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oactivo'];
            idobj = document.getElementById("activo_id_alt_gu");
            valor_alt = idobj.getAttribute('data-id');
            if (valor_alt != valor_pesq) {
                if (idobj.getAttribute('data-required') == 'S') {

                    if (valida_id_s_n_dropdown(valor_alt, 'Activo', hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['activo_alt_gu'] = valor_alt;
                    }
                }
            }

            valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oidperfilutilizador'];
            idobj = document.getElementById("perfil_id_alt_gu");
            valor_alt = idobj.getAttribute('data-id');
            if (valor_alt != valor_pesq) {
                if (idobj.getAttribute('data-required') == 'S') {

                    if (valida_id_num_dropdown(valor_alt, 'Perfil', hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['perfil_alt_gu'] = valor_alt;
                    }
                }
            }

            if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

                valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['ocodutilizador'];
                idobj = document.getElementById("emailutilizador_id_alt_gu");
                valor_alt = idobj.value;
                if (valor_alt != valor_pesq) {

                    if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

                        if (valida_texto(idobj.value, 'email', ".+@ariga\.com", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
                            campos_alterados = {};
                            return 0;
                        } else {
                            existiu_alteracao++;

                            campos_alterados['emailutilizador_alt_gu'] = valor_alt;
                        }
                    }
                }
            }

            if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

                idobj = document.getElementById("codigoacesso_id_alt_gu");
                valor_alt = idobj.value;
                campos_alterados['so_pws_alt_gu'] = 0;

                if (valor_alt != "") {

                    if (idobj.getAttribute('minlength') > 0) {

                        if (valida_texto(idobj.value, 'Password', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
                            campos_alterados = {};
                            return 0;
                        } else {
                            existiu_alteracao++;
                            if (existiu_alteracao == 1) {
                                campos_alterados['so_pws_alt_gu'] = 1;
                            }
                            campos_alterados['codigoacesso_alt_gu'] = valor_alt;
                        }
                    }
                }
            }

        }

        if (existiu_alteracao > 0) {
            campos_alterados['existiu_alteracao_alt_gu'] = existiu_alteracao;
            if (idrow >= 0) {
                campos_alterados['idutilizador_alt_gu'] = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oidutilizador'];
                campos_alterados['emailutilizador_pesq_gu'] = guarda_inf_gestaoutilizadores_pesquisa[idrow]['ocodutilizador'];
            }
            return 1
        } else {
            hash_p['mensagem'] = "Não efetuou nenhuma alteração";
            return 0;
        }
    } else {
        hash_p['mensagem'] = "Não selecionou nenhuma linha válida";
    }
    return 1;
}

function funcvalidacaocampos_gestaoutilizadores_alteracao(pf_nome_form) {

    let hash = {};
    hash['mensagem'] = "";




    if (verifica_alteracoes_campos_gestaoutilizadores(hash) < 1) {

        document.getElementById("form_mensagem_gestaoutilizadores_alteracao").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_gestaoutilizadores_alteracao").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_gestaoutilizadores_alteracao").innerHTML = '';
                document.getElementById("form_mensagem_gestaoutilizadores_alteracao").style.display = "none";
            }, 5000
        );

        return 0;
    }
    return 1;
}

function funcrecolhecamposenviar_gestaoutilizadores_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    for (var key in campos_alterados) {
        pf_form_dados.append(key, campos_alterados[key]);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    limpa_data_obj_id("activo_id_alt_gu", 0, 1);
    limpa_data_obj_id("perfil_id_alt_gu", 0, 1);
    document.getElementById('form_gestaoutilizadores_alteracao').reset();
    limpa_data_obj_id("nome_id_alt_gu", "", 0);
    limpa_data_obj_id("emailutilizador_id_alt_gu", "", 0);
    limpa_data_obj_id("codigoacesso_id_alt_gu", "", 0);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = '';
            document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
            document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
            window.location.href = "#" + "gestaoutilizadores_pesquisa";

        }, 2000
    );
    document.getElementById("emailutilizador_id_gu").value = pf_resposta.codutilizador_pesq;
    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoutilizadores_alteracao_f() {
    envia_recebe_gen_universal_POST('form_gestaoutilizadores_alteracao', funcvalidacaocampos_gestaoutilizadores_alteracao, 'dados_elem_form_gestaoutilizadores_alteracao', funcrecolhecamposenviar_gestaoutilizadores_alteracao, 'gestaoutilizadores_alteracao.php', 'gestaoutilizadores_alteracao_b', 'nao_usado', functratamententodados_r1_gestaoutilizadores_alteracao, 'form_mensagem_gestaoutilizadores_alteracao', ".form_inf_geral", functratamententodados_r0_gestaoutilizadores_alteracao, functratamententodados_rneg_gestaoutilizadores_alteracao, functratamententodados_ind_gestaoutilizadores_alteracao);
}

//Gestao autenticacao----------------------------------------------------------------------------------------CE

function gestaoautenticacao_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoautenticacao_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoautenticacao_pesquisa").reset();

        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }
}


function gestaoautenticacao_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoautenticacao_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoautenticacao_pesquisa").reset();

    }
}

//pesquisa autenticacao--------------------------------------------------------------------------------------CE

var guarda_inf_gestaoautenticacao_pesquisa = "";

function funcvalidacaocampos_gestaoautenticacao_pesquisa(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_gestaoautenticacao_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }


    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoautenticacao_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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
    guarda_inf_gestaoautenticacao_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_gestaoautenticacao_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
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

function functratamententodados_rneg_gestaoautenticacao_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoautenticacao_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoautenticacao_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_gestaoautenticacao_pesquisa', funcvalidacaocampos_gestaoautenticacao_pesquisa, 'dados_elem_form_gestaoautenticacao_pesquisa', funcrecolhecamposenviar_gestaoautenticacao_pesquisa, 'gestaoautenticacao_pesquisa.php', 'gestaoautenticacao_pesquisa_b', 'gestaoautenticacao_pesquisa_ihtml', functratamententodados_r1_gestaoautenticacao_pesquisa, 'form_mensagem_gestaoautenticacao_pesquisa', ".form_inf_geral", functratamententodados_r0_gestaoautenticacao_pesquisa, functratamententodados_rneg_gestaoautenticacao_pesquisa, functratamententodados_ind_gestaoautenticacao_pesquisa);
}

function seleciona_linha_listaon_gestaoautenticacao(e) {

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');
            guarda_id_obj = null;
            guarda_id_row = "";
            document.getElementById('gestaoautenticacao_alteracao').style.display = "none";
            document.getElementById('form_gestaoautenticacao_alteracao').reset();
            document.getElementById("gestaoautenticacao_alteracao_b").style.display = "none";

        } else {

            e.classList.add('active-row');

            if (guarda_id_obj !== null) {
                guarda_id_obj.classList.remove('active-row');
            }

            guarda_id_obj = e;
            guarda_id_row = e.id;
            gestaoautenticacao_alteracao_prenche_form(guarda_id_row);
            document.getElementById('gestaoautenticacao_alteracao').style.display = "block";
            document.getElementById('form_gestaoautenticacao_alteracao').reset();
            document.getElementById("gestaoautenticacao_alteracao_b").style.display = "block";


        }
    }
}

function gestaoautenticacao_alteracao_prenche_form(guarda_id_row_p) {
    if (guarda_id_row_p !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
        if (guarda_inf_gestaoautenticacao_pesquisa !== "") {

            dropd = document.getElementById("activo_id_alt_aut");
            if (guarda_inf_gestaoautenticacao_pesquisa[idrow]['oactivo'] == 'S')
                dropd.options[dropd.selectedIndex].text = "-- Sim --";

            else {
                dropd.options[dropd.selectedIndex].text = "-- Não --";
            }
            dropd.setAttribute('data-id', guarda_inf_gestaoautenticacao_pesquisa[idrow]['oactivo']);

        }
    };
}

//-----------------------------------------------------------------------------------------------------------------------------

function verifica_alteracoes_campos_gestaoautenticacao(hash_p) {

    let valor_pesq = "";
    let valor_alt = "";
    let existiu_alteracao = 0;
    let indice = 0;
    let idobj = null;
    campos_alterados = {};

    if (guarda_id_row !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");

        if (guarda_inf_gestaoautenticacao_pesquisa !== "") {

            valor_pesq = guarda_inf_gestaoautenticacao_pesquisa[idrow]['oactivo'];
            idobj = document.getElementById("activo_id_alt_aut");
            valor_alt = idobj.getAttribute('data-id');
            if (valor_alt != valor_pesq) {
                if (idobj.getAttribute('data-required') == 'S') {

                    if (valida_id_s_n_dropdown(valor_alt, 'Activo', hash_p) < 1) {
                        campos_alterados = {};
                        return 0;
                    } else {
                        existiu_alteracao++;
                        campos_alterados['activo_alt_aut'] = valor_alt;
                    }
                }
            }

        }

        if (existiu_alteracao > 0) {
            campos_alterados['existiu_alteracao_alt_aut'] = existiu_alteracao;
            if (idrow >= 0) {
                campos_alterados['idautenticacao_alt_aut'] = guarda_inf_gestaoautenticacao_pesquisa[idrow]['oidautenticacao'];
                campos_alterados['emailutilizador_pesq_aut'] = guarda_inf_gestaoautenticacao_pesquisa[idrow]['outilizador'];
            }
            return 1
        } else {
            hash_p['mensagem'] = "Não efetuou nenhuma alteração";
            return 0;
        }
    } else {
        hash_p['mensagem'] = "Não selecionou nenhuma linha válida";
    }
    return 1;
}

function funcvalidacaocampos_gestaoautenticacao_alteracao(pf_nome_form) {

    let hash = {};
    hash['mensagem'] = "";

    if (verifica_alteracoes_campos_gestaoautenticacao(hash) < 1) {

        document.getElementById("form_mensagem_gestaoautenticacao_alteracao").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_gestaoautenticacao_alteracao").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_gestaoautenticacao_alteracao").innerHTML = '';
                document.getElementById("form_mensagem_gestaoautenticacao_alteracao").style.display = "none";
            }, 5000
        );

        return 0;
    }
    return 1;
}

function funcrecolhecamposenviar_gestaoautenticacao_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    for (var key in campos_alterados) {
        pf_form_dados.append(key, campos_alterados[key]);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoautenticacao_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById("emailutilizador_id_aut").value = pf_resposta.codutilizador_pesq;
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById('form_gestaoautenticacao_alteracao').reset();

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('gestaoautenticacao_pesquisa_ihtml').innerHTML = '';
            document.getElementById("gestaoautenticacao_alteracao_b").style.display = "none";
            document.getElementById('gestaoautenticacao_alteracao').style.display = "none";
            window.location.href = "#" + "gestaoautenticacao_pesquisa";

        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;
    return 1;
}

function functratamententodados_r0_gestaoautenticacao_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_gestaoautenticacao_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoautenticacao_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoautenticacao_alteracao_f() {
    envia_recebe_gen_universal_POST('form_gestaoautenticacao_alteracao', funcvalidacaocampos_gestaoautenticacao_alteracao, 'dados_elem_form_gestaoautenticacao_alteracao', funcrecolhecamposenviar_gestaoautenticacao_alteracao, 'gestaoautenticacao_alteracao.php', 'gestaoautenticacao_alteracao_b', 'nao_usado', functratamententodados_r1_gestaoautenticacao_alteracao, 'form_mensagem_gestaoautenticacao_alteracao', ".form_inf_geral", functratamententodados_r0_gestaoautenticacao_alteracao, functratamententodados_rneg_gestaoautenticacao_alteracao, functratamententodados_ind_gestaoautenticacao_alteracao);
}

//Gestao perfil----------------------------------------------------------------------------------------CE

function gestaoperfil_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoperfil_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoperfil_pesquisa").reset();
        document.getElementById('gestaoperfil_alteracao').style.display = "none";
        document.getElementById('form_gestaoperfil_alteracao').reset();
        document.getElementById("gestaoperfil_alteracao_b").style.display = "none";
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }
}

function gestaoperfil_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('gestaoperfil_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_gestaoperfil_pesquisa").reset();
        document.getElementById('gestaoperfil_alteracao').style.display = "none";
        document.getElementById('form_gestaoperfil_alteracao').reset();
        document.getElementById("gestaoperfil_alteracao_b").style.display = "none";

    }
}

//pesquisa Perfil--------------------------------------------------------------------------------------CE

var guarda_inf_gestaoperfil_pesquisa = "";

function funcvalidacaocampos_gestaoperfil_pesquisa(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_gestaoperfil_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoperfil_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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
    guarda_inf_gestaoperfil_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_gestaoperfil_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
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

function functratamententodados_rneg_gestaoperfil_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoperfil_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoperfil_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_gestaoperfil_pesquisa', funcvalidacaocampos_gestaoperfil_pesquisa, 'dados_elem_form_gestaoperfil_pesquisa', funcrecolhecamposenviar_gestaoperfil_pesquisa, 'gestaoperfil_pesquisa.php', 'gestaoperfil_pesquisa_b', 'gestaoperfil_pesquisa_ihtml', functratamententodados_r1_gestaoperfil_pesquisa, 'form_mensagem_gestaoperfil_pesquisa', ".form_inf_geral", functratamententodados_r0_gestaoperfil_pesquisa, functratamententodados_rneg_gestaoperfil_pesquisa, functratamententodados_ind_gestaoperfil_pesquisa);
}

//-----------------------------------------------------------------------------------------------------------------------------

function seleciona_linha_listaon_gestaoperfil(e) {

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');
            guarda_id_obj = null;
            guarda_id_row = "";
            document.getElementById('gestaoperfil_alteracao').style.display = "none";
            document.getElementById('form_gestaoperfil_alteracao').reset();
            document.getElementById("gestaoperfil_alteracao_b").style.display = "none";

        } else {

            e.classList.add('active-row');

            if (guarda_id_obj !== null) {
                guarda_id_obj.classList.remove('active-row');
            }

            guarda_id_obj = e;
            guarda_id_row = e.id;

            gestaoperfil_alteracao_prenche_form(guarda_id_row);
            document.getElementById('gestaoperfil_alteracao').style.display = "block";
            document.getElementById('form_gestaoperfil_alteracao').reset();
            document.getElementById("gestaoperfil_alteracao_b").style.display = "block";

        }
    }
}

function gestaoperfil_alteracao_prenche_form(guarda_id_row_p) {
    if (guarda_id_row_p !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");
        if (guarda_inf_gestaoperfil_pesquisa !== "") {

            dropd = document.getElementById("perfil_id_alt_per");
            dropd.options[dropd.selectedIndex].text = "-- " + guarda_inf_gestaoperfil_pesquisa[idrow]['operfilutilizador'] + " --";
            dropd.setAttribute('data-id', guarda_inf_gestaoperfil_pesquisa[idrow]['oidperfilutilizador']);
        }
    };
}

function verifica_alteracoes_campos_gestaoperfil(hash_p) {

    let valor_pesq = "";
    let valor_alt = "";
    let existiu_alteracao = 0;
    let indice = 0;
    let idobj = null;
    campos_alterados = {};

    if (guarda_id_row !== "") {
        let idrow = document.getElementById(guarda_id_row).getAttribute("data-id");

        valor_pesq = guarda_inf_gestaoperfil_pesquisa[idrow]['oidperfilutilizador'];
        idobj = document.getElementById("perfil_id_alt_per");
        valor_alt = idobj.getAttribute('data-id');
        if (valor_alt != valor_pesq) {
            if (idobj.getAttribute('data-required') == 'S') {

                if (valida_id_num_dropdown(valor_alt, 'Perfil', hash_p) < 1) {
                    campos_alterados = {};
                    return 0;
                } else {
                    existiu_alteracao++;
                    campos_alterados['perfil_alt_per'] = valor_alt;
                }
            }
        }

        if (existiu_alteracao > 0) {
            campos_alterados['existiu_alteracao_alt_per'] = existiu_alteracao;
            if (idrow >= 0) {
                campos_alterados['idutilizador_alt_per'] = guarda_inf_gestaoperfil_pesquisa[idrow]['oidutilizador'];
                campos_alterados['emailutilizador_pesq_per'] = guarda_inf_gestaoperfil_pesquisa[idrow]['ocodutilizador'];
            }
            return 1
        } else {
            hash_p['mensagem'] = "Não efetuou nenhuma alteração";
            return 0;
        }
    } else {
        hash_p['mensagem'] = "Não selecionou nenhuma linha válida";
    }
    return 1;
}

function funcvalidacaocampos_gestaoperfil_alteracao(pf_nome_form) {

    let hash = {};
    hash['mensagem'] = "";

    if (verifica_alteracoes_campos_gestaoperfil(hash) < 1) {

        document.getElementById("form_mensagem_gestaoperfil_alteracao").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_gestaoperfil_alteracao").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_gestaoperfil_alteracao").innerHTML = '';
                document.getElementById("form_mensagem_gestaoperfil_alteracao").style.display = "none";
            }, 5000
        );

        return 0;
    }
    return 1;
}

function funcrecolhecamposenviar_gestaoperfil_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    for (var key in campos_alterados) {
        pf_form_dados.append(key, campos_alterados[key]);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_gestaoperfil_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById("emailutilizador_id_per").setAttribute('value', pf_resposta.codutilizador_pesq);
    document.getElementById(pf_id_mensagem_form).style.display = "block";
    document.getElementById('form_gestaoperfil_alteracao').reset();

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('gestaoperfil_pesquisa_ihtml').innerHTML = '';
            document.getElementById("gestaoperfil_alteracao_b").style.display = "none";
            document.getElementById('gestaoperfil_alteracao').style.display = "none";
            window.location.href = "#" + "gestaoperfil_pesquisa";

        }, 5000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_gestaoperfil_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_gestaoperfil_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_gestaoperfil_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function gestaoperfil_alteracao_f() {
    envia_recebe_gen_universal_POST('form_gestaoperfl_alteracao', funcvalidacaocampos_gestaoperfil_alteracao, 'dados_elem_form_gestaoperfil_alteracao', funcrecolhecamposenviar_gestaoperfil_alteracao, 'gestaoperfil_alteracao.php', 'gestaoperfil_alteracao_b', 'nao_usado', functratamententodados_r1_gestaoperfil_alteracao, 'form_mensagem_gestaoperfil_alteracao', ".form_inf_geral", functratamententodados_r0_gestaoperfil_alteracao, functratamententodados_rneg_gestaoperfil_alteracao, functratamententodados_ind_gestaoperfil_alteracao);
}

//---------------------------------------------------------------------XML---------------------------------------------------------------------

async function readTextxml(event) {
    const file = event.target.files.item(0)
    const text = await file.text();

    document.getElementById("xml_config_id_xmlimportar_pesquisa").value = text;
}

function xmlsalvar_fechar_f() {
    let textcontent = document.getElementById("xml_config_id_xmlimportar_pesquisa").value;

    if (textcontent == "") {
        alert("Não existem dados preenchidos para criar um ficheiro XML!...");
    }

    let downloadableLink = document.createElement('a');
    downloadableLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textcontent));
    downloadableLink.download = "myFile" + ".xml";
    document.body.appendChild(downloadableLink);
    downloadableLink.click();
    document.body.removeChild(downloadableLink);
}

function xmlimportar_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById("form_xmlimportar_pesquisa").reset();
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }
}

function xmlimportar_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";

        document.getElementById("form_xmlimportar_pesquisa").reset();

    }
}

function mostra_mensagem_form(id_mensagem_form, mensagem, tempo){

        document.getElementById(id_mensagem_form).innerHTML = mensagem;
        document.getElementById(id_mensagem_form).style.display = "block";

        setTimeout(
            function () {
                document.getElementById(id_mensagem_form).innerHTML = '';
                document.getElementById(id_mensagem_form).style.display = "none";
            }, tempo
        );
    }

function valida_xmlimportar(){

    let configuration_t;
    let configuration_count_t = 0;
    let xmlDocimport;
    let obj_configuration_t = null;

    let arinc653module_t;
    let arinc653module_count_t = 0;

    let airconfiguration_t;
    let airconfiguration_count_t = 0;

    let moduleschedule_t;
    let moduleschedule_count_t = 0;

    let partitions_t;
    let partitions_count_t = 0;

    let partitionconfiguration_t;
    let partitionconfiguration_count_t = 0;

    let memory_t;
    let memory_count_t = 0;

    let i,j,l = 0;

    let partitionschedule_t;
    let partitionschedule_count_t = 0;

    let windowschedule_t;
    let windowschedule_count_t = 0;

    let windowconfiguration_t;
    let windowconfiguration_count_t = 0;

    //-----------------------------------------------------------------------------
    let xmlstring_importar = document.getElementById('xml_config_id_xmlimportar_pesquisa').value;
    xmlDocimport = new DOMParser().parseFromString(xmlstring_importar, "text/xml");
    configuration_t = xmlDocimport.getElementsByTagName("configuration");
    configuration_count_t = configuration_t.length;
    //-----------------------------------------------------------------------------

    if (configuration_count_t > 0 && configuration_count_t < 2) {
        obj_configuration_t = null;
        obj_configuration_t = new configuration_cls();
        obj_configuration_t.id = configuration_t[0].getAttribute('id');
        obj_configuration_t.archname = configuration_t[0].getElementsByTagName('archname')[0].innerHTML;
        obj_configuration_t.bare = configuration_t[0].getElementsByTagName('bare')[0].innerHTML;
        obj_configuration_t.iddebugmonitordesc = configuration_t[0].getElementsByTagName('iddebugmonitor')[0].innerHTML;
        obj_configuration_t.idtargetboarddesc = configuration_t[0].getElementsByTagName('idtargetboard')[0].innerHTML;
        obj_configuration_t.idfpudesc = configuration_t[0].getElementsByTagName('idfpu')[0].innerHTML;
        obj_configuration_t.idarchitecturetypedesc = configuration_t[0].getElementsByTagName('idarchitecturetype')[0].innerHTML;
        obj_configuration_t.installrtos = configuration_t[0].getElementsByTagName('installrtos')[0].innerHTML;
        obj_configuration_t.posixrtems5 = configuration_t[0].getElementsByTagName('posixrtems5')[0].innerHTML;
        obj_configuration_t.rtems48i = configuration_t[0].getElementsByTagName('rtems48i')[0].innerHTML;
        obj_configuration_t.rtems5 = configuration_t[0].getElementsByTagName('rtems5')[0].innerHTML;
    }

    arinc653module_t = xmlDocimport.getElementsByTagName("arinc653module");
    arinc653module_count_t = arinc653module_t.length;

    if (arinc653module_count_t > 0 && arinc653module_count_t < 2) {
        obj_configuration_t.arinc653module_obj.id = arinc653module_t[0].getAttribute('id');
        obj_configuration_t.arinc653module_obj.idconfiguration = arinc653module_t[0].getAttribute('idconfiguration');
        obj_configuration_t.arinc653module_obj.modulename = arinc653module_t[0].getElementsByTagName('modulename')[0].innerHTML;
        obj_configuration_t.arinc653module_obj.xmlnsxsi = arinc653module_t[0].getElementsByTagName('xmlnsxsi')[0].innerHTML;
    }

    airconfiguration_t = xmlDocimport.getElementsByTagName("airconfiguration");
    airconfiguration_count_t = airconfiguration_t.length;

    if (airconfiguration_count_t > 0 && airconfiguration_count_t < 2) {
        obj_configuration_t.airconfiguration_obj.id = airconfiguration_t[0].getAttribute('id');
        obj_configuration_t.airconfiguration_obj.idarinc653module = airconfiguration_t[0].getAttribute('idarinc653module');
        obj_configuration_t.airconfiguration_obj.requiredcores = airconfiguration_t[0].getElementsByTagName('requiredcores')[0].innerHTML;
        obj_configuration_t.airconfiguration_obj.tickspersecond = airconfiguration_t[0].getElementsByTagName('tickspersecond')[0].innerHTML;
    }

    moduleschedule_t = xmlDocimport.getElementsByTagName("moduleschedule");
    moduleschedule_count_t = moduleschedule_t.length;

    if (moduleschedule_count_t > 0 && moduleschedule_count_t < 2) {
        obj_configuration_t.moduleschedule_obj.id = moduleschedule_t[0].getAttribute('id');
        obj_configuration_t.moduleschedule_obj.idarinc653module = moduleschedule_t[0].getAttribute('idarinc653module');
        obj_configuration_t.moduleschedule_obj.schedulename = moduleschedule_t[0].getElementsByTagName('schedulename')[0].innerHTML;
        obj_configuration_t.moduleschedule_obj.scheduleidentifier = moduleschedule_t[0].getElementsByTagName('scheduleidentifier')[0].innerHTML;
        obj_configuration_t.moduleschedule_obj.majorframeseconds = moduleschedule_t[0].getElementsByTagName('majorframeseconds')[0].innerHTML;
        obj_configuration_t.moduleschedule_obj.initialmoduleschedule = moduleschedule_t[0].getElementsByTagName('initialmoduleschedule')[0].innerHTML;
    }

    partitions_t = xmlDocimport.getElementsByTagName("partitions");
    partitions_count_t = partitions_t.length;

    partitionconfiguration_t = xmlDocimport.getElementsByTagName("partitionconfiguration");
    partitionconfiguration_count_t = partitionconfiguration_t.length;

    memory_t = xmlDocimport.getElementsByTagName("memory");
    memory_count_t = memory_t.length;


    if (partitions_count_t > 0  ) {

        if(partitionconfiguration_count_t == partitions_count_t){

            if(memory_count_t == partitionconfiguration_count_t){

                for (i = 0; i < partitions_count_t; i++) {

                    obj_configuration_t.partitions_obj[i] = new partitions_cls();
                    obj_configuration_t.partitions_obj[i].id = partitions_t[i].getAttribute('id');
                    obj_configuration_t.partitions_obj[i].idarinc653module = partitions_t[i].getAttribute('idarinc653module');
                    obj_configuration_t.partitions_obj[i].criticalitydesc = partitions_t[i].getElementsByTagName('criticality')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].criticality = partitions_t[i].getElementsByTagName('criticality')[0].getAttribute('idvalue');
                    obj_configuration_t.partitions_obj[i].entrypoint = partitions_t[i].getElementsByTagName('entrypoint')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionname = partitions_t[i].getElementsByTagName('partitionname')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionidentifier = partitions_t[i].getElementsByTagName('partitionidentifier')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].systempartition = partitions_t[i].getElementsByTagName('systempartition')[0].innerHTML;

                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.id = partitionconfiguration_t[i].getAttribute('id');
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.idpartition = partitionconfiguration_t[i].getAttribute('idpartition');

                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.cores = partitionconfiguration_t[i].getElementsByTagName('cores')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.cache = partitionconfiguration_t[i].getElementsByTagName('cache')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.libs = partitionconfiguration_t[i].getElementsByTagName('libs')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.personality = partitionconfiguration_t[i].getElementsByTagName('personality')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.devices = partitionconfiguration_t[i].getElementsByTagName('devices')[0].innerHTML;
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.permissions = partitionconfiguration_t[i].getElementsByTagName('permissions')[0].innerHTML;

                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.memory_obj.id = memory_t[i].getAttribute('id');
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.memory_obj.idpartitionconfiguration = memory_t[i].getAttribute('idpartitionconfiguration');
                    obj_configuration_t.partitions_obj[i].partitionconfiguration_obj.memory_obj.size = memory_t[i].getElementsByTagName('size')[0].innerHTML;
                }

            }else{
                mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', 'A uma partitionconfiguration tem de corresponder obrigatóriamente uma memory!...', 2000)
                return 0;
            }
        }else{
            mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', 'A uma partition tem de corresponder obrigatóriamente uma partitionconfiguration!...', 2000)
            return 0;
        }
    }

    partitionschedule_t = xmlDocimport.getElementsByTagName("partitionschedule");
    partitionschedule_count_t = partitionschedule_t.length;

    windowconfiguration_t = xmlDocimport.getElementsByTagName("windowconfiguration");
    windowconfiguration_count_t = windowconfiguration_t.length;

    if (partitionschedule_count_t > 0) {

        if (partitionschedule_count_t == windowconfiguration_count_t){

            for (i = 0; i < partitionschedule_count_t; i++) {

                obj_configuration_t.partitionschedule_obj[i] = new partitionschedule_cls();
                obj_configuration_t.partitionschedule_obj[i].id = partitionschedule_t[i].getAttribute('id');
                obj_configuration_t.partitionschedule_obj[i].idmoduleschedule = partitionschedule_t[i].getAttribute('idmoduleschedule');
                obj_configuration_t.partitionschedule_obj[i].perioddurationseconds = partitionschedule_t[i].getElementsByTagName('perioddurationseconds')[0].innerHTML;
                obj_configuration_t.partitionschedule_obj[i].periodseconds = partitionschedule_t[i].getElementsByTagName('periodseconds')[0].innerHTML;

                obj_configuration_t.partitionschedule_obj[i].windowconfiguration_obj.idpartitionschedule = windowconfiguration_t[i].getAttribute('idpartitionschedule');
                obj_configuration_t.partitionschedule_obj[i].windowconfiguration_obj.id = windowconfiguration_t[i].getAttribute('id');
                obj_configuration_t.partitionschedule_obj[i].windowconfiguration_obj.windowidentifier = windowconfiguration_t[i].getElementsByTagName('windowidentifier')[0].innerHTML;
                obj_configuration_t.partitionschedule_obj[i].windowconfiguration_obj.cores = windowconfiguration_t[i].getElementsByTagName('cores')[0].innerHTML;

                windowschedule_t = partitionschedule_t[i].getElementsByTagName("windowschedule");
                windowschedule_count_t = windowschedule_t.length;

                if (windowschedule_count_t > 0) {
    
                    for (j = 0; j < windowschedule_count_t; j++) {

                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j] = new windowschedule_cls();

                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].id = windowschedule_t[j].getAttribute('id');
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].idpartitionschedule = windowschedule_t[j].getAttribute('idpartitionschedule');
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].idpartitionconfiguration = windowschedule_t[j].getAttribute('idpartitionconfiguration');

                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].partitionperiodstart = windowschedule_t[j].getElementsByTagName('partitionperiodstart')[0].innerHTML;
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].windowdurationseconds = windowschedule_t[j].getElementsByTagName('windowdurationseconds')[0].innerHTML;
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].windowidentifier = windowschedule_t[j].getElementsByTagName('windowidentifier')[0].innerHTML;
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].windowstartseconds = windowschedule_t[j].getElementsByTagName('windowstartseconds')[0].innerHTML;
                        obj_configuration_t.partitionschedule_obj[i].windowschedule_obj[j].coreidentifier = windowschedule_t[j].getElementsByTagName('coreidentifier')[0].innerHTML;

                    }
                }
            }

        } else{
            mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', 'A uma partitionschedule tem de corresponder obrigatóriamente uma windowconfiguration!...', 2000)
            return 0;
        }
    }

    let mensagem_erro = {};

    if (regra_verifica_numero_cores_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_perioddurationseconds_periodseconds_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_perioddurationseconds_periodseconds_escala_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_windowstartseconds_periodseconds_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if(regra_verifica_windowdurationseconds_periodseconds_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_windowdurationseconds_total_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_numero_cores_ps_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_sobreposicao_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_cores_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    if (regra_verifica_cores_partition_n(obj_configuration_t, mensagem_erro) < 1){
        mostra_mensagem_form('form_mensagem_xmlimportar_pesquisa', mensagem_erro['mensagem'], 4000);
        return 0;
    }

    return 1;
}

function funcvalidacaocampos_xmlimportar(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    if (valida_xmlimportar() < 1) return 0;

    return 1;
}

function funcrecolhecamposenviar_xmlimportar(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_xmlimportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    document.getElementById('form_xmlimportar_pesquisa').reset();

    cod_dd_para_atualizar = "CONF";
    control_local.atualiza_manutencao_tabelas_tabcoddesc(cod_dd_para_atualizar, pf_resposta.dados_dd_activo, pf_resposta.dados_dd_total);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            window.location.href = "#" + "xmlimportar_pesquisa";

        }, 2000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_xmlimportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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


function functratamententodados_rneg_xmlimportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_xmlimportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function xmlimportar_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_xmlimportar_pesquisa', funcvalidacaocampos_xmlimportar, 'dados_elem_form_xmlimportar_pesquisa', funcrecolhecamposenviar_xmlimportar, 'envia_xml_DB.php', 'xmlimportar_pesquisa_b', '', functratamententodados_r1_xmlimportar, 'form_mensagem_xmlimportar_pesquisa', ".form_inf_geral", functratamententodados_r0_xmlimportar, functratamententodados_rneg_xmlimportar, functratamententodados_ind_xmlimportar);
}

//XML EXPORT--------------------------------------------------------------------------------------------------------------------------------------------------

function xmlexportar_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById("form_xmlexportar_pesquisa").reset();
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
    }
}

function xmlexportar_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";

        document.getElementById("form_xmlexportar_pesquisa").reset();

    }
}

function verifica_alteracoes_campos_xmlexportar(hash_p) {

    let valor_alt = "";
    let idobj = null;

    idobj = document.getElementById("xmlconf_id_xmlexportar_pesquisa");
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

function funcvalidacaocampos_xmlexportar(pf_nome_form) {

    let hash = {};

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    if (verifica_alteracoes_campos_xmlexportar(hash) < 1) {

        document.getElementById('form_mensagem_xmlexportar_pesquisa').innerHTML = hash['mensagem'];
        document.getElementById('form_mensagem_xmlexportar_pesquisa').style.display = "block";

        setTimeout(
            function () {
                document.getElementById('form_mensagem_xmlexportar_pesquisa').innerHTML = '';
                document.getElementById('form_mensagem_xmlexportar_pesquisa').style.display = "none";
            }, 5000
        );
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_xmlexportar(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_xmlexportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById('xml_config_id_xmlexportar_pesquisa').value = pf_resposta.dados;
    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";


    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            window.location.href = "#" + "xml_config_id_xmlexportar_pesquisa";

        }, 2000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_xmlexportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_xmlexportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_xmlexportar(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function xmlexportar_pesquisa_f() {
    envia_recebe_gen_universal_POST('form_xmlexportar_pesquisa', funcvalidacaocampos_xmlexportar, 'dados_elem_form_xmlexportar_pesquisa', funcrecolhecamposenviar_xmlexportar, 'recebe_xml_DB.php', 'xmlexportar_pesquisa_b', '', functratamententodados_r1_xmlexportar, 'form_mensagem_xmlexportar_pesquisa', ".form_inf_geral", functratamententodados_r0_xmlexportar, functratamententodados_rneg_xmlexportar, functratamententodados_ind_xmlexportar);
}

function xmlexportar_f() {
    let textcontent = document.getElementById("xml_config_id_xmlexportar_pesquisa").value;

    if (textcontent == "") {
        alert("Não existem dados preenchidos para criar um ficheiro XML!...");
    }

    let downloadableLink = document.createElement('a');
    downloadableLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textcontent));
    downloadableLink.download = "myFile" + ".xml";
    document.body.appendChild(downloadableLink);
    downloadableLink.click();
    document.body.removeChild(downloadableLink);
}

//-------------------ecran Configuração de XML

//Pesquisa----------------------------------------------------------------------------------------
var estado_configura_criacao = 0;
var xmlDoc;

function configura_fechar_f() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('configura_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_configura_pesquisa").reset();
        document.getElementById('configura_alteracao').style.display = "none";
        document.getElementById('form_configura_alteracao').reset();
        document.getElementById("configura_alteracao_b").style.display = "none";
        document.getElementById('configura_criacao').style.display = "none";
        document.getElementById("configura_criacao_b").style.display = "none";
        document.getElementById('form_configura_criacao').reset();
        if (submenuselecionado_id !== "" && submenuselecionado_id !== null) {
            let obj_submenuselecionado_id = document.getElementById(submenuselecionado_id);
            obj_submenuselecionado_id.style.textDecoration = "none";
            submenuselecionado_id = "";
        }
        document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
        estado_configura_criacao = 0;
    }
}

function configura_fechar_f_usar_menu() {
    if (op_display != "") {
        let obj_op_display = document.getElementById(op_display);
        obj_op_display.style.display = "none";
        op_display = "";
        document.getElementById('configura_pesquisa_ihtml').innerHTML = "";
        document.getElementById("form_configura_pesquisa").reset();
        document.getElementById('configura_alteracao').style.display = "none";
        document.getElementById('form_configura_alteracao').reset();
        document.getElementById("configura_alteracao_b").style.display = "none";
        document.getElementById('configura_criacao').style.display = "none";
        document.getElementById("configura_criacao_b").style.display = "none";
        document.getElementById('form_configura_criacao').reset();

        document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
        estado_configura_criacao = 0;
    }
}

function configura_reset() {

    document.getElementById('configura_pesquisa_ihtml').innerHTML = "";
    document.getElementById('configura_alteracao').style.display = "none";
    document.getElementById('form_configura_alteracao').reset();
    document.getElementById("configura_alteracao_b").style.display = "none";
    document.getElementById('configura_criacao').style.display = "none";
    document.getElementById("configura_criacao_b").style.display = "none";
    document.getElementById('form_configura_criacao').reset();

    document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
    estado_configura_criacao = 0;
}

function configura_abrir_criacao_f() {

    if (estado_configura_criacao == 0) {
        document.getElementById("configura_criacao_b").style.display = "block";
        document.getElementById('configura_criacao').style.display = "block";
        document.getElementById("nova_configuracao_id").innerText = "Esconde - Inserir nova configuração";
        estado_configura_criacao = 1;
    } else {
        document.getElementById("configura_criacao_b").style.display = "none";
        document.getElementById('configura_criacao').style.display = "none";
        document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
        estado_configura_criacao = 0;
    }

    document.getElementById('form_configura_criacao').reset();
    document.getElementById("configura_alteracao_b").style.display = "none";
    document.getElementById('configura_alteracao').style.display = "none";
    document.getElementById('form_configura_alteracao').reset();

    if (guarda_id_obj !== null) {
        guarda_id_obj.classList.remove('active-row');
        guarda_id_obj = null;
        guarda_id_row = "";
    }
}

function verifica_alteracoes_campos_configura(hash_p) {

    let valor_alt = "";
    let idobj = null;

    idobj = document.getElementById("xmlconf_id_configura_pesquisa");
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


function funcvalidacaocampos_configura_pesquisa(pf_nome_form) {

    let hash = {};
    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    if (verifica_alteracoes_campos_configura(hash) < 1) {

        document.getElementById('form_mensagem_configura_pesquisa').innerHTML = hash['mensagem'];
        document.getElementById('form_mensagem_configura_pesquisa').style.display = "block";

        setTimeout(
            function () {
                document.getElementById('form_mensagem_configura_pesquisa').innerHTML = '';
                document.getElementById('form_mensagem_configura_pesquisa').style.display = "none";
            }, 5000
        );
        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_configura_pesquisa(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

var guarda_inf_configura_pesquisa = "";

function functratamententodados_r1_configura_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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
    guarda_inf_configura_pesquisa = JSON.parse(pf_resposta.dados)

    return 1;
}

function functratamententodados_r0_configura_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_configura_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {


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

function functratamententodados_ind_configura_pesquisa(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function configura_pesquisa_f() {
    configura_reset();
    envia_recebe_gen_universal_POST('form_configura_pesquisa', funcvalidacaocampos_configura_pesquisa, 'dados_elem_form_configura_pesquisa', funcrecolhecamposenviar_configura_pesquisa, 'configura_pesquisa.php', 'configura_pesquisa_b', 'configura_pesquisa_ihtml', functratamententodados_r1_configura_pesquisa, 'form_mensagem_configura_pesquisa', ".form_inf_geral", functratamententodados_r0_configura_pesquisa, functratamententodados_rneg_configura_pesquisa, functratamententodados_ind_configura_pesquisa);
}

//-------------------ecran Configuração de XML

//Alteração----------------------------------------------------------------------------------------

function seleciona_linha_listaon_configura(e) {

    let idrow = 0;

    if (e !== null) {
        if (guarda_id_obj === e) {
            e.classList.remove('active-row');

            document.getElementById('configura_alteracao').style.display = "none";
            document.getElementById('form_configura_alteracao').reset();
            document.getElementById("configura_alteracao_b").style.display = "none";
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
                configura_alteracao_prenche_form(idrow);
            }

            document.getElementById('configura_alteracao').style.display = "block";
            document.getElementById("configura_alteracao_b").style.display = "block";

            document.getElementById("configura_criacao_b").style.display = "none";
            document.getElementById('configura_criacao').style.display = "none";
            document.getElementById('form_configura_criacao').reset();

            document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
            estado_configura_criacao = 0;
        }
    }
}

function resettabs() {

    let obj;

    //configuration
    document.getElementById('archname_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('bare_id_configura_alteracao').removeAttribute('checked');
    obj = document.getElementById("debugmonitor_id_configura_alteracao");
    obj.setAttribute('data-id', 0);
    obj.options[0].text = "-- Selecionar --";
    obj = document.getElementById("targetboard_id_configura_alteracao");
    obj.setAttribute('data-id', 0);
    obj.options[0].text = "-- Selecionar --";
    obj = document.getElementById("fpu_id_configura_alteracao");
    obj.setAttribute('data-id', 0);
    obj.options[0].text = "-- Selecionar --";
    obj = document.getElementById("architecturetype_id_configura_alteracao");
    obj.setAttribute('data-id', 0);
    obj.options[0].text = "-- Selecionar --";
    document.getElementById('installrtos_id_configura_alteracao').removeAttribute('checked');
    document.getElementById('posixrtems5_id_configura_alteracao').removeAttribute('checked');
    document.getElementById('rtems48i_id_configura_alteracao').removeAttribute('checked');
    document.getElementById('rtems5_id_configura_alteracao').removeAttribute('checked');

    //arinc653module
    document.getElementById('modulename_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('xmlnsxsi_id_configura_alteracao').setAttribute('value', '');

    //airconfiguration
    document.getElementById('requiredcores_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('tickspersecond_id_configura_alteracao').setAttribute('value', '');

    //moduleschedule
    document.getElementById('schedulename_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('scheduleidentifier_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('majorframeseconds_id_configura_alteracao').setAttribute('value', '');
    document.getElementById('initialmodulesched_id_configura_alteracao').removeAttribute('checked');

    //partitionstable
    document.getElementById('configura_partitions_ihtml').innerHTML = '';

    //partitions
    obj = document.getElementById("criticality_id_partitions_configura_alteracao");
    obj.options[obj.selectedIndex].text = "-- Selecionar --";
    obj.setAttribute('data-id', 0);
    document.getElementById('entrypoint_id_partitions_configura_alteracao').setAttribute('value', "");
    document.getElementById('partitionname_id_partitions_configura_alteracao').setAttribute('value', "");
    document.getElementById('partitionidentifier_id_partitions_configura_alteracao').setAttribute('value', "");
    document.getElementById('systempartition_id_partitions_configura_alteracao').setAttribute('value', "");
    document.getElementById('tabcontext4_partitions_alt').style.display = 'none';

    //partitionconfiguration
    document.getElementById('cores_id_partitionconfiguration_configura_alteracao').setAttribute('value', "");
    document.getElementById('cache_id_partitionconfiguration_configura_alteracao').setAttribute('value', "");
    control_tabs.reset_multiselect('libs_partitionconfiguration_configura_alteracao');
    control_tabs.reset_multiselect('personality_partitionconfiguration_configura_alteracao');
    control_tabs.reset_multiselect('devices_partitionconfiguration_configura_alteracao');
    control_tabs.reset_multiselect('permissions_partitionconfiguration_configura_alteracao');
    document.getElementById('tabcontext4_partitionconfiguration_alt').style.display = 'none';

    //memory
    document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').setAttribute('value', '');
    document.getElementById('tabcontext4_partitionconfiguration_memory_alt').style.display = 'none';

    //partitionscheduletable
    document.getElementById('configura_partitionschedule_ihtml').innerHTML = "";

    //partitionschedule
    document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').setAttribute('value', "");
    document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').setAttribute('value', "");
    document.getElementById('tabcontext5_partitionschedule_alt').style.display = 'none';

    //windowconfiguration
    document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').setAttribute('value', "");
    document.getElementById('cores_id_windowconfiguration_configura_alteracao').setAttribute('value', "");
    document.getElementById('tabcontext5_windowconfiguration_alt').style.display = 'none';

    //windowcheduletable
    document.getElementById('configura_windowchedule_ihtml').innerHTML = "";

    //windowchedule
    document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').setAttribute('value', "");
    document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').setAttribute('value', "");
    document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').removeAttribute('checked');
    document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').setAttribute('value', "");
    document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').setAttribute('value', "");
    document.getElementById("partition_id_reset").innerHTML = "";

}

function configura_alteracao_prenche_form(idrow) {

    let xmlstring = "";
    let configuration;
    let configuration_count = 0;
    let obj;

    let arinc653module;
    let arinc653module_count = 0;

    let airconfiguration;
    let airconfiguration_count = 0;

    let moduleschedule;
    let moduleschedule_count = 0;

    let partitionschedule;
    let partitionschedule_count = 0;
    let partitionschedule_ihtml = "";

    let partitions;
    let partitions_count = 0;
    let partitions_ihtml = "";
    let partitions_html_dd = "";

    let partitionconfiguration;
    let partitionconfiguration_count = 0;

    let memory;
    let memory_count = 0;

    let windowschedule;
    let windowschedule_count = 0;
    let windowschedule_ihtml = "";
    let windowschedule_count_temp = 0;

    let windowconfiguration;
    let windowconfiguration_count = 0;


    if (guarda_inf_configura_pesquisa !== "") {
        xmlstring = guarda_inf_configura_pesquisa[idrow]['oxml'];
        xmlDoc = new DOMParser().parseFromString(xmlstring, "text/xml");
        configuration = xmlDoc.getElementsByTagName("configuration");
        configuration_count = configuration.length;

        if (configuration_count > 0 && configuration_count < 2) {

            obj_configuration = null;
            obj_configuration_initial = null;

            resettabs();

            obj_configuration = new configuration_cls();
            obj_configuration_initial = new configuration_cls();

            obj_configuration.id = configuration[0].getAttribute('id');
            obj_configuration.archname = configuration[0].getElementsByTagName('archname')[0].innerHTML;
            document.getElementById('archname_id_configura_alteracao').setAttribute('value', obj_configuration.archname);

            obj_configuration.bare = configuration[0].getElementsByTagName('bare')[0].innerHTML;
            if (obj_configuration.bare == 'true') {
                document.getElementById('bare_id_configura_alteracao').setAttribute('checked', 'checked');
            }

            obj_configuration.iddebugmonitordesc = configuration[0].getElementsByTagName('iddebugmonitor')[0].innerHTML;
            obj_configuration.iddebugmonitor = configuration[0].getElementsByTagName('iddebugmonitor')[0].getAttribute('idvalue');
            obj = document.getElementById("debugmonitor_id_configura_alteracao");
            obj.options[obj.selectedIndex].text = "-- " + obj_configuration.iddebugmonitordesc + " --";
            obj.setAttribute('data-id', obj_configuration.iddebugmonitor);

            obj_configuration.idtargetboarddesc = configuration[0].getElementsByTagName('idtargetboard')[0].innerHTML;
            obj_configuration.idtargetboard = configuration[0].getElementsByTagName('idtargetboard')[0].getAttribute('idvalue');
            obj = document.getElementById("targetboard_id_configura_alteracao");
            obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idtargetboarddesc + " --";
            obj.setAttribute('data-id', obj_configuration.idtargetboard);

            obj_configuration.idfpudesc = configuration[0].getElementsByTagName('idfpu')[0].innerHTML;
            obj_configuration.idfpu = configuration[0].getElementsByTagName('idfpu')[0].getAttribute('idvalue');
            obj = document.getElementById("fpu_id_configura_alteracao");
            obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idfpudesc + " --";
            obj.setAttribute('data-id', obj_configuration.idfpu);

            obj_configuration.idarchitecturetypedesc = configuration[0].getElementsByTagName('idarchitecturetype')[0].innerHTML;
            obj_configuration.idarchitecturetype = configuration[0].getElementsByTagName('idarchitecturetype')[0].getAttribute('idvalue');
            obj = document.getElementById("architecturetype_id_configura_alteracao");
            obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idarchitecturetypedesc + " --";
            obj.setAttribute('data-id', obj_configuration.idarchitecturetype);

            obj_configuration.installrtos = configuration[0].getElementsByTagName('installrtos')[0].innerHTML;
            if (obj_configuration.installrtos == 'true') {
                document.getElementById('installrtos_id_configura_alteracao').setAttribute('checked', 'checked');
            }

            obj_configuration.posixrtems5 = configuration[0].getElementsByTagName('posixrtems5')[0].innerHTML;
            if (obj_configuration.posixrtems5 == 'true') {
                document.getElementById('posixrtems5_id_configura_alteracao').setAttribute('checked', 'checked');
            }

            obj_configuration.rtems48i = configuration[0].getElementsByTagName('rtems48i')[0].innerHTML;
            if (obj_configuration.rtems48i == 'true') {
                document.getElementById('rtems48i_id_configura_alteracao').setAttribute('checked', 'checked');
            }

            obj_configuration.rtems5 = configuration[0].getElementsByTagName('rtems5')[0].innerHTML;
            if (obj_configuration.rtems5 == 'true') {
                document.getElementById('rtems5_id_configura_alteracao').setAttribute('checked', 'checked');
            }
            obj_configuration.tabactiva[0] = 1;
            obj_configuration.tabactiva[1] = 1;
            control_tabs.seleciona_tab_alt("tab0");
        }

        arinc653module = xmlDoc.getElementsByTagName("arinc653module");
        arinc653module_count = arinc653module.length;

        if (arinc653module_count > 0 && arinc653module_count < 2) {

            obj_configuration.arinc653module_obj.id = arinc653module[0].getAttribute('id');
            obj_configuration.arinc653module_obj.idconfiguration = arinc653module[0].getAttribute('idconfiguration');
            obj_configuration.arinc653module_obj.modulename = arinc653module[0].getElementsByTagName('modulename')[0].innerHTML;
            document.getElementById('modulename_id_configura_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.modulename);

            obj_configuration.arinc653module_obj.xmlnsxsi = arinc653module[0].getElementsByTagName('xmlnsxsi')[0].innerHTML;
            document.getElementById('xmlnsxsi_id_configura_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.xmlnsxsi);

            obj_configuration.tabactiva[2] = 1;
            obj_configuration.tabactiva[3] = 1;
            obj_configuration.tabactiva[4] = 1;
        }

        airconfiguration = xmlDoc.getElementsByTagName("airconfiguration");
        airconfiguration_count = airconfiguration.length;


        if (airconfiguration_count > 0 && airconfiguration_count < 2) {
            obj_configuration.airconfiguration_obj.id = airconfiguration[0].getAttribute('id');
            obj_configuration.airconfiguration_obj.idarinc653module = airconfiguration[0].getAttribute('idarinc653module');
            obj_configuration.airconfiguration_obj.requiredcores = airconfiguration[0].getElementsByTagName('requiredcores')[0].innerHTML;
            document.getElementById('requiredcores_id_configura_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.requiredcores);

            obj_configuration.airconfiguration_obj.tickspersecond = airconfiguration[0].getElementsByTagName('tickspersecond')[0].innerHTML;
            document.getElementById('tickspersecond_id_configura_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.tickspersecond);

        }

        moduleschedule = xmlDoc.getElementsByTagName("moduleschedule");
        moduleschedule_count = moduleschedule.length;

        if (moduleschedule_count > 0 && moduleschedule_count < 2) {

            obj_configuration.moduleschedule_obj.id = moduleschedule[0].getAttribute('id');
            obj_configuration.moduleschedule_obj.idarinc653module = moduleschedule[0].getAttribute('idarinc653module');

            obj_configuration.moduleschedule_obj.schedulename = moduleschedule[0].getElementsByTagName('schedulename')[0].innerHTML;
            document.getElementById('schedulename_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.schedulename);

            obj_configuration.moduleschedule_obj.scheduleidentifier = moduleschedule[0].getElementsByTagName('scheduleidentifier')[0].innerHTML;
            document.getElementById('scheduleidentifier_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.scheduleidentifier);

            obj_configuration.moduleschedule_obj.majorframeseconds = moduleschedule[0].getElementsByTagName('majorframeseconds')[0].innerHTML;
            document.getElementById('majorframeseconds_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.majorframeseconds);

            obj_configuration.moduleschedule_obj.initialmoduleschedule = moduleschedule[0].getElementsByTagName('initialmoduleschedule')[0].innerHTML;
            if (obj_configuration.moduleschedule_obj.initialmoduleschedule == 'true') {
                document.getElementById('initialmodulesched_id_configura_alteracao').setAttribute('checked', 'checked');
            }

            obj_configuration.tabactiva[5] = 1;

        }

        partitions = xmlDoc.getElementsByTagName("partitions");
        partitions_count = partitions.length;

        partitionconfiguration = xmlDoc.getElementsByTagName("partitionconfiguration");
        partitionconfiguration_count = partitionconfiguration.length;

        memory = xmlDoc.getElementsByTagName("memory");
        memory_count = memory.length;

        if (partitions_count > 0) {

            partitions_ihtml = '<table id="table_partitions" class="styled-table" style="width:100%">';
            partitions_ihtml = partitions_ihtml + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Partition name</th> \
                    <th style=\"white-space: nowrap;\">Partition identifier</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

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


                partitions_ihtml = partitions_ihtml + '<tr id="idtr_partitions' + i + '" ' + ' data-idpartitions ="' + i + '" onclick="seleciona_linha_listaon_configura_partitions(this);\">';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].id + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].partitionname + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].partitionidentifier + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].statedesc + '</td>';
                partitions_ihtml = partitions_ihtml + '</tr>';

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

            }

            partitions_ihtml = partitions_ihtml + '</tbody></table>';

            document.getElementById('configura_partitions_ihtml').innerHTML = partitions_ihtml;

            //Criar opções dd partições
            control_tabs.atualiza_dropdown_partition("PARTI", obj_configuration.partitions_obj,);

        }

        partitionschedule = xmlDoc.getElementsByTagName("partitionschedule");
        partitionschedule_count = partitionschedule.length;

        if (partitionschedule_count > 0) {

            partitionschedule_ihtml = '<table class="styled-table" style="width:100%">';
            partitionschedule_ihtml = partitionschedule_ihtml + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Period duration seconds</th> \
                    <th style=\"white-space: nowrap;\">Period seconds</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

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

                partitionschedule_ihtml = partitionschedule_ihtml + '<tr id="idtr_partitionschedule' + i + '" ' + ' data-idpartitionschedule ="' + i + '" onclick="seleciona_linha_listaon_configura_partitionschedule(this)\">';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].id + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].perioddurationseconds + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].periodseconds + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].statedesc + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '</tr>';

                if (windowconfiguration_count > 0) {

                    for (m = 0; m < windowconfiguration_count; m++) {
                        if (windowconfiguration[m].getAttribute('idpartitionschedule') == obj_configuration.partitionschedule_obj[i].id) {
                            obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.idpartitionschedule = windowconfiguration[m].getAttribute('idpartitionschedule');
                            obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.id = windowconfiguration[m].getAttribute('id');
                            obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.windowidentifier = windowconfiguration[m].getElementsByTagName('windowidentifier')[0].innerHTML;
                            obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.cores = windowconfiguration[m].getElementsByTagName('cores')[0].innerHTML;
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

                            windowschedule_count_temp++;
                        }
                    }
                }

            }

            partitionschedule_ihtml = partitionschedule_ihtml + '</tbody></table>';

            document.getElementById('configura_partitionschedule_ihtml').innerHTML = partitionschedule_ihtml;
        }
        obj_configuration_initial = obj_configuration;
    }
}

function seleciona_linha_listaon_configura_partitions(e) {

    let idlinha = "";
    let objtemp;

    if (e !== null) {
        if (obj_configuration.idlinhaobjparticao === e) {

            objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
            objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
            objtemp.setAttribute('data-id', 0);

            document.getElementById('entrypoint_id_partitions_configura_alteracao').value = "";
            document.getElementById('partitionname_id_partitions_configura_alteracao').value = "";
            document.getElementById('partitionidentifier_id_partitions_configura_alteracao').value = "";
            document.getElementById('systempartition_id_partitions_configura_alteracao').checked = false;
            document.getElementById('systempartition_id_partitions_configura_alteracao').removeAttribute('checked');

            document.getElementById('cores_id_partitionconfiguration_configura_alteracao').value = "";
            document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value = "";

            control_tabs.reset_multiselect('libs_partitionconfiguration_configura_alteracao');
            control_tabs.reset_multiselect('personality_partitionconfiguration_configura_alteracao');
            control_tabs.reset_multiselect('devices_partitionconfiguration_configura_alteracao');
            control_tabs.reset_multiselect('permissions_partitionconfiguration_configura_alteracao');

            document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value = "";

            obj_configuration.idlinhaobjparticao = null;
            e.classList.remove('active-row');
            document.getElementById('tabcontext4_partitions_alt').style.display = 'none';
            document.getElementById('tabcontext4_partitionconfiguration_alt').style.display = 'none';
            document.getElementById('tabcontext4_partitionconfiguration_memory_alt').style.display = 'none';

        } else {

            idlinha = e.getAttribute('data-idpartitions');

            if (obj_configuration.idlinhaobjparticao !== null) {
                obj_configuration.idlinhaobjparticao.classList.remove('active-row');
            }

            objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
            objtemp.options[objtemp.selectedIndex].text = "-- " + obj_configuration.partitions_obj[idlinha].criticalitydesc + " --";
            objtemp.setAttribute('data-id', obj_configuration.partitions_obj[idlinha].criticality);

            document.getElementById('entrypoint_id_partitions_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].entrypoint;
            document.getElementById('partitionname_id_partitions_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].partitionname;
            document.getElementById('partitionidentifier_id_partitions_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].partitionidentifier;


            if (obj_configuration.partitions_obj[idlinha].systempartition == 'true') {
                document.getElementById('systempartition_id_partitions_configura_alteracao').setAttribute('checked', 'checked');
                document.getElementById('systempartition_id_partitions_configura_alteracao').checked = true;
            } else {
                document.getElementById('systempartition_id_partitions_configura_alteracao').checked = false;
                document.getElementById('systempartition_id_partitions_configura_alteracao').removeAttribute('checked');
            }

            document.getElementById('cores_id_partitionconfiguration_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cores;
            document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cache;

            control_tabs.reset_multiselect('libs_partitionconfiguration_configura_alteracao');
            control_tabs.seleciona_multiselect('libs_partitionconfiguration_configura_alteracao', obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idslibs, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.libs);
            control_tabs.reset_multiselect('personality_partitionconfiguration_configura_alteracao');
            control_tabs.seleciona_multiselect('personality_partitionconfiguration_configura_alteracao', obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspersonality, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.personality);
            control_tabs.reset_multiselect('devices_partitionconfiguration_configura_alteracao');
            control_tabs.seleciona_multiselect('devices_partitionconfiguration_configura_alteracao', obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idsdevices, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.devices);
            control_tabs.reset_multiselect('permissions_partitionconfiguration_configura_alteracao');
            control_tabs.seleciona_multiselect('permissions_partitionconfiguration_configura_alteracao', obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspermissions, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.permissions);

            document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value = obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.memory_obj.size;


            obj_configuration.idlinhaobjparticao = e;
            e.classList.add('active-row');
            document.getElementById('tabcontext4_partitions_alt').style.display = 'block';
            document.getElementById('tabcontext4_partitionconfiguration_alt').style.display = 'block';
            document.getElementById('tabcontext4_partitionconfiguration_memory_alt').style.display = 'block';

        }
    }
}

function seleciona_linha_listaon_configura_partitionschedule(e) {
    let idlinha = "";
    let objtemp;
    let windowchedule_ihtml = "";
    let windowchedule_count = 0;
    let indicepartition = -1;

    if (e !== null) {

        idlinha = e.getAttribute('data-idpartitionschedule');



        if (obj_configuration.idlinhaobjpartitionschedule === e) {

            document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').value = "";
            document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').value = "";

            document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').value = "";
            document.getElementById('cores_id_windowconfiguration_configura_alteracao').value = "";

            obj_configuration.idlinhaobjpartitionschedule = null;
            document.getElementById('configura_windowchedule_ihtml').innerHTML = "";
            e.classList.remove('active-row');
            document.getElementById('tabcontext5_partitionschedule_alt').style.display = 'none';
            document.getElementById('tabcontext5_windowconfiguration_alt').style.display = 'none';


        } else {

            if (obj_configuration.idlinhaobjpartitionschedule !== null) {
                obj_configuration.idlinhaobjpartitionschedule.classList.remove('active-row');
            }

            document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idlinha].perioddurationseconds;
            document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idlinha].periodseconds;

            document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').value = obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.windowidentifier;
            document.getElementById('cores_id_windowconfiguration_configura_alteracao').value = obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.cores;

            windowchedule_count = obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj.length;

            if (windowchedule_count > 0) {

                windowchedule_ihtml = '<table class="styled-table" style="width:100%">';
                windowchedule_ihtml = windowchedule_ihtml + '<thead> \
                    <tr> \
                        <th style=\"white-space: nowrap;\">Id window schedule</th> \
                        <th style=\"white-space: nowrap;\">Window identifier</th> \
                        <th style=\"white-space: nowrap;\">Core identifier</th> \
                        <th style=\"white-space: nowrap;\">Partition name</th> \
                        <th style=\"white-space: nowrap;\">State</th> \
                    </tr> \
                </thead> \
                <tbody>';

                for (i = 0; i < windowchedule_count; i++) {

                    windowchedule_ihtml = windowchedule_ihtml + '<tr id="idtr_windowchedule' + i + '" ' + ' data-idpartitionschedule ="' + idlinha + '" data-idwindowchedule = "' + i + '" onclick="seleciona_linha_listaon_configura_windowchedule(this)\">';
                    windowchedule_ihtml = windowchedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj[i].id + '</td>';

                    windowchedule_ihtml = windowchedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj[i].windowidentifier + '</td>';
                    windowchedule_ihtml = windowchedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj[i].coreidentifier + '</td>';

                    indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj[i].idpartitionconfiguration);

                    if (indicepartition >= 0) {
                        windowchedule_ihtml = windowchedule_ihtml + '<td>' + obj_configuration.partitions_obj[indicepartition].partitionname + '</td>';
                    } else {
                        windowchedule_ihtml = windowchedule_ihtml + '<td>Não encontrado. Erro na configuração!...</td>';
                    }

                    windowchedule_ihtml = windowchedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[idlinha].windowschedule_obj[i].statedesc + '</td>';


                    windowchedule_ihtml = windowchedule_ihtml + '</tr>';
                }

                windowchedule_ihtml = windowchedule_ihtml + '</tbody></table>';
                document.getElementById('configura_windowchedule_ihtml').innerHTML = windowchedule_ihtml;
            }

            obj_configuration.idlinhaobjpartitionschedule = e;
            e.classList.add('active-row');
            document.getElementById('tabcontext5_partitionschedule_alt').style.display = 'block';
            document.getElementById('tabcontext5_windowconfiguration_alt').style.display = 'block';

        }

        document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value = "";
        document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value = "";
        document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
        document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value = "";
        document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value = "";

        objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");
        if (objtemp !== null) {
            objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
            objtemp.setAttribute('data-id', 0);
        }

        obj_configuration.partitionschedule_obj[idlinha].idlinhaobjwindowschedule = null;
        document.getElementById('tabcontext5_windowchedule_alt').style.display = 'none';

    }
}

function devolve_indice_array_partition(idpartionconfiguration) {

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
        return i;
    }
    return -1;
}

function seleciona_linha_listaon_configura_windowchedule(e) {

    let idlinha = "";
    let idpartitionschedule = "";
    let objtemp;
    let indicepartition = -1;
    let idpartition = 0;
    let namepartition = "";

    if (e !== null) {

        idpartitionschedule = e.getAttribute('data-idpartitionschedule');

        if (idpartitionschedule !== null && idpartitionschedule !== "") {
            if (obj_configuration.partitionschedule_obj[idpartitionschedule].idlinhaobjwindowschedule === e) {

                document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
                document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value = "";

                objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");
                objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
                objtemp.setAttribute('data-id', 0);

                obj_configuration.partitionschedule_obj[idpartitionschedule].idlinhaobjwindowschedule = null;
                e.classList.remove('active-row');
                document.getElementById('tabcontext5_windowchedule_alt').style.display = 'none';

            } else {

                idlinha = e.getAttribute('data-idwindowchedule');

                if (obj_configuration.partitionschedule_obj[idpartitionschedule].idlinhaobjwindowschedule !== null) {
                    obj_configuration.partitionschedule_obj[idpartitionschedule].idlinhaobjwindowschedule.classList.remove('active-row');
                }

                document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].windowidentifier;
                document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].coreidentifier;

                if (obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].partitionperiodstart == 'true') {
                    document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = true;
                } else {
                    document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
                }

                document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].windowstartseconds;
                document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value = obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].windowdurationseconds;

                indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].idpartitionconfiguration);

                objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");

                if (indicepartition >= 0) {
                    //idpartition = obj_configuration.partitions_obj[indicepartition].id;
                    idpartition = obj_configuration.partitionschedule_obj[idpartitionschedule].windowschedule_obj[idlinha].idpartitionconfiguration;
                    namepartition = obj_configuration.partitions_obj[indicepartition].partitionname;
                    objtemp.options[objtemp.selectedIndex].text = namepartition;
                    objtemp.setAttribute('data-id', idpartition);
                }

                obj_configuration.partitionschedule_obj[idpartitionschedule].idlinhaobjwindowschedule = e;
                e.classList.add('active-row');
                document.getElementById('tabcontext5_windowchedule_alt').style.display = 'block';

            }
        }
    }

}

function valida_dropdows_configura_criacao(hash_p) {

    let idobj;
    let valor_alt;

    idobj = document.getElementById("debugmonitor_id_configura_criacao");
    valor_alt = idobj.value;

    if (valida_id_num_dropdown(valor_alt, 'Debugmonitor', hash_p) < 1) {
        return 0;
    }

    idobj = document.getElementById("targetboard_id_configura_criacao");
    valor_alt = idobj.value;

    if (valida_id_num_dropdown(valor_alt, 'Targetboard', hash_p) < 1) {
        return 0;
    }

    idobj = document.getElementById("fpu_id_configura_criacao");
    valor_alt = idobj.value;

    if (valida_id_num_dropdown(valor_alt, 'Fpu', hash_p) < 1) {
        return 0;
    }

    idobj = document.getElementById("architecturetype_id_configura_criacao");
    valor_alt = idobj.value;

    if (valida_id_num_dropdown(valor_alt, 'Architecturetype', hash_p) < 1) {
        return 0;
    }

    return 1;
}


function funcvalidacaocampos_configura_criacao(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

    let hash = {};
    hash['mensagem'] = "";

    if (valida_dropdows_configura_criacao(hash) < 1) {

        document.getElementById("form_mensagem_configura_criacao").innerHTML = hash['mensagem'];
        document.getElementById("form_mensagem_configura_criacao").style.display = "block";

        setTimeout(
            function () {
                document.getElementById("form_mensagem_configura_criacao").innerHTML = '';
                document.getElementById("form_mensagem_configura_criacao").style.display = "none";
            }, 5000
        );

        return 0;
    }

    return 1;
}

function funcrecolhecamposenviar_configura_criacao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

    for (var count = 0; count < form_element_form_base.length; count++) {
        pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
        //alert(form_element_form_base[count].name + '=' + form_element_form_base[count].value)
    }

    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_configura_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    document.getElementById('form_configura_criacao').reset();

    //novo
    control_local.atualiza_manutencao_tabelas_tabcoddesc("CONF", pf_resposta.dados_dd_activo, pf_resposta.dados_dd_total);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";

            document.getElementById('configura_pesquisa_ihtml').innerHTML = '';
            document.getElementById("configura_criacao_b").style.display = "none";
            document.getElementById('configura_criacao').style.display = "none";
            document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
            estado_configura_criacao = 0;
            window.location.href = "#" + "configura_pesquisa";

        }, 3000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_configura_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_configura_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_configura_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function configura_criacao_f() {
    envia_recebe_gen_universal_POST('form_configura_criacao', funcvalidacaocampos_configura_criacao, 'dados_elem_form_configura_criacao', funcrecolhecamposenviar_configura_criacao, 'configura_criacao.php', 'configura_criacao_b', 'nao_usado', functratamententodados_r1_configura_criacao, 'form_mensagem_configura_criacao', ".form_inf_geral", functratamententodados_r0_configura_criacao, functratamententodados_rneg_configura_criacao, functratamententodados_ind_configura_criacao);
}

function save_configura_local(hash_p) {
    if (obj_configuration !== null) {
        localStorage.setItem('configuration_data', JSON.stringify(obj_configuration));

        document.getElementById('form_mensagem_configura_alteracao').innerHTML = hash_p['mensagem'] + 'Configuração guardada localmente!...';
        document.getElementById('form_mensagem_configura_alteracao').style.display = "block";

        setTimeout(
            function () {
                document.getElementById('form_mensagem_configura_alteracao').innerHTML = '';
                document.getElementById('form_mensagem_configura_alteracao').style.display = "none";
            }, 4000
        );
    }
}

function save_configura_local_partition_partition_schedule(hash_p) {
    if (obj_configuration !== null) {
        localStorage.setItem('configuration_data', JSON.stringify(obj_configuration));

        mostra_mensagem_box_conf(hash_p['mensagem'] + 'Configuração guardada localmente!...');

        // document.getElementById('form_mensagem_configura_alteracao').innerHTML = hash_p['mensagem'] + 'Configuração guardada localmente!...';
        // document.getElementById('form_mensagem_configura_alteracao').style.display = "block";

        // setTimeout(
        //     function () {
        //         document.getElementById('form_mensagem_configura_alteracao').innerHTML = '';
        //         document.getElementById('form_mensagem_configura_alteracao').style.display = "none";
        //     }, 4000
        // );
    }
}

function obtem_configura_local_f() {

    let obj;
    obj_configuration = null;
    obj_configuration_initial = null;

    obj_configuration = JSON.parse(localStorage.getItem('configuration_data'));

    if (obj_configuration !== null) {

        obj_configuration_initial = obj_configuration;

        resettabs();
        document.getElementById('configura_pesquisa_ihtml').innerHTML = '';
        document.getElementById('form_configura_pesquisa').reset();

        document.getElementById('configura_alteracao').style.display = "block";
        document.getElementById("configura_alteracao_b").style.display = "block";

        document.getElementById('archname_id_configura_alteracao').value = obj_configuration.archname;

        if (obj_configuration.bare == 'true') {
            document.getElementById('bare_id_configura_alteracao').checked = true;
        } else {
            document.getElementById('bare_id_configura_alteracao').checked = false;
        }

        obj = document.getElementById("debugmonitor_id_configura_alteracao");
        obj.options[obj.selectedIndex].text = "-- " + obj_configuration.iddebugmonitordesc + " --";
        obj.setAttribute('data-id', obj_configuration.iddebugmonitor);

        obj = document.getElementById("targetboard_id_configura_alteracao");
        obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idtargetboarddesc + " --";
        obj.setAttribute('data-id', obj_configuration.idtargetboard);

        obj = document.getElementById("fpu_id_configura_alteracao");
        obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idfpudesc + " --";
        obj.setAttribute('data-id', obj_configuration.idfpu);

        obj = document.getElementById("architecturetype_id_configura_alteracao");
        obj.options[obj.selectedIndex].text = "-- " + obj_configuration.idarchitecturetypedesc + " --";
        obj.setAttribute('data-id', obj_configuration.idarchitecturetype);

        if (obj_configuration.installrtos == 'true') {
            document.getElementById('installrtos_id_configura_alteracao').checked = true;
        } else {
            document.getElementById('installrtos_id_configura_alteracao').checked = false;
        }

        if (obj_configuration.posixrtems5 == 'true') {
            document.getElementById('posixrtems5_id_configura_alteracao').checked = true;
        } else {
            document.getElementById('posixrtems5_id_configura_alteracao').checked = false;
        }

        if (obj_configuration.rtems48i == 'true') {
            document.getElementById('rtems48i_id_configura_alteracao').checked = true;
        } else {
            document.getElementById('rtems48i_id_configura_alteracao').checked = false;
        }

        if (obj_configuration.rtems5 == 'true') {
            document.getElementById('rtems5_id_configura_alteracao').checked = true;
        } else {
            document.getElementById('rtems5_id_configura_alteracao').checked = false;
        }

        obj_configuration.tabactiva[0] = 1;
        obj_configuration.tabactiva[1] = 1;
        control_tabs.seleciona_tab_alt("tab0");


        if (obj_configuration.arinc653module_obj.modulename !== '') {

            document.getElementById('modulename_id_configura_alteracao').value = obj_configuration.arinc653module_obj.modulename;
            document.getElementById('xmlnsxsi_id_configura_alteracao').value = obj_configuration.arinc653module_obj.xmlnsxsi;

            obj_configuration.tabactiva[2] = 1;
            obj_configuration.tabactiva[3] = 1;
            obj_configuration.tabactiva[4] = 1;
        }

        if (obj_configuration.airconfiguration_obj.requiredcores !== '') {

            document.getElementById('requiredcores_id_configura_alteracao').value = obj_configuration.airconfiguration_obj.requiredcores;
            document.getElementById('tickspersecond_id_configura_alteracao').value = obj_configuration.airconfiguration_obj.tickspersecond;

        }

        if (obj_configuration.moduleschedule_obj.schedulename !== '') {

            document.getElementById('schedulename_id_configura_alteracao').value = obj_configuration.moduleschedule_obj.schedulename;
            document.getElementById('scheduleidentifier_id_configura_alteracao').value = obj_configuration.moduleschedule_obj.scheduleidentifier;
            document.getElementById('majorframeseconds_id_configura_alteracao').value = obj_configuration.moduleschedule_obj.majorframeseconds;

            if (obj_configuration.moduleschedule_obj.initialmoduleschedule == 'true') {
                document.getElementById('initialmodulesched_id_configura_alteracao').checked = true;
            } else {
                document.getElementById('initialmodulesched_id_configura_alteracao').checked = false;
            }

            obj_configuration.tabactiva[5] = 1;

        }

        let partitions_count = 0;
        let partitions_ihtml = "";
        let partitions_html_dd = "";

        partitions_count = obj_configuration.partitions_obj.length;

        if (partitions_count > 0) {

            partitions_ihtml = '<table id="table_partitions" class="styled-table" style="width:100%">';
            partitions_ihtml = partitions_ihtml + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Partition name</th> \
                    <th style=\"white-space: nowrap;\">Partition identifier</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

            for (i = 0; i < partitions_count; i++) {

                partitions_ihtml = partitions_ihtml + '<tr id="idtr_partitions' + i + '" ' + ' data-idpartitions ="' + i + '" onclick="seleciona_linha_listaon_configura_partitions(this);\">';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].id + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].partitionname + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].partitionidentifier + '</td>';
                partitions_ihtml = partitions_ihtml + '<td>' + obj_configuration.partitions_obj[i].statedesc + '</td>';
                partitions_ihtml = partitions_ihtml + '</tr>';
            }

            partitions_ihtml = partitions_ihtml + '</tbody></table>';
            document.getElementById('configura_partitions_ihtml').innerHTML = partitions_ihtml;

            //Criar opções dd partições
            control_tabs.atualiza_dropdown_partition("PARTI", obj_configuration.partitions_obj);
        }


        let partitionschedule_count = 0;
        let partitionschedule_ihtml = "";

        partitionschedule_count = obj_configuration.partitionschedule_obj.length;

        if (partitionschedule_count > 0) {

            partitionschedule_ihtml = '<table class="styled-table" style="width:100%">';
            partitionschedule_ihtml = partitionschedule_ihtml + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Period duration seconds</th> \
                    <th style=\"white-space: nowrap;\">Period seconds</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

            for (i = 0; i < partitionschedule_count; i++) {

                partitionschedule_ihtml = partitionschedule_ihtml + '<tr id="idtr_partitionschedule' + i + '" ' + ' data-idpartitionschedule ="' + i + '" onclick="seleciona_linha_listaon_configura_partitionschedule(this)\">';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].id + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].perioddurationseconds + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].periodseconds + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].statedesc + '</td>';
                partitionschedule_ihtml = partitionschedule_ihtml + '</tr>';
            }

            partitionschedule_ihtml = partitionschedule_ihtml + '</tbody></table>';

            document.getElementById('configura_partitionschedule_ihtml').innerHTML = partitionschedule_ihtml;
        }

        document.getElementById('form_mensagem_configura_pesquisa').innerHTML = 'Configuração obtida com sucesso!...';
        document.getElementById('form_mensagem_configura_pesquisa').style.display = "block";

        setTimeout(
            function () {
                document.getElementById('form_mensagem_configura_pesquisa').innerHTML = '';
                document.getElementById('form_mensagem_configura_pesquisa').style.display = "none";
            }, 4000
        );

    }
}

function val_save_configuration_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;

    if (valida_texto(document.getElementById('archname_id_configura_alteracao').value, 'Archname', "", true, 1, 20, hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('bare_id_configura_alteracao').checked, 'Bare', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_id_num_dropdown(document.getElementById("debugmonitor_id_configura_alteracao").getAttribute('data-id'), 'Debugmonitor', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_id_num_dropdown(document.getElementById("targetboard_id_configura_alteracao").getAttribute('data-id'), 'Targetboard', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_id_num_dropdown(document.getElementById("fpu_id_configura_alteracao").getAttribute('data-id'), 'Fpu', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_id_num_dropdown(document.getElementById("architecturetype_id_configura_alteracao").getAttribute('data-id'), 'Architecturetype', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('installrtos_id_configura_alteracao').checked, 'Installrtos', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('posixrtems5_id_configura_alteracao').checked, 'Posixrtems5', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('rtems48i_id_configura_alteracao').checked, 'Rtems48i', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('rtems5_id_configura_alteracao').checked, 'Rtems5', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById('archname_id_configura_alteracao').value;
    if (obj_configuration.archname != alt_value) {
        obj_configuration.archname = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('bare_id_configura_alteracao').checked.toString();
    if (obj_configuration.bare != alt_value) {
        obj_configuration.bare = alt_value;
        alterou = 1;
    }

    obj = document.getElementById("debugmonitor_id_configura_alteracao");
    alt_value = obj.getAttribute('data-id');
    if (obj_configuration.iddebugmonitor != alt_value) {
        obj_configuration.iddebugmonitor = alt_value;
        obj_configuration.iddebugmonitordesc = obj.options[obj.selectedIndex].text;
        alterou = 1;
    }

    obj = document.getElementById("targetboard_id_configura_alteracao");
    alt_value = obj.getAttribute('data-id');
    if (obj_configuration.idtargetboard != alt_value) {
        obj_configuration.idtargetboard = alt_value;
        obj_configuration.idtargetboarddesc = obj.options[obj.selectedIndex].text;
        alterou = 1;
    }

    obj = document.getElementById("fpu_id_configura_alteracao");
    alt_value = obj.getAttribute('data-id');
    if (obj_configuration.idfpu != alt_value) {
        obj_configuration.idfpu = alt_value;
        obj_configuration.idfpudesc = obj.options[obj.selectedIndex].text;
        alterou = 1;
    }

    obj = document.getElementById("architecturetype_id_configura_alteracao");
    alt_value = obj.getAttribute('data-id');
    if (obj_configuration.idarchitecturetype != alt_value) {
        obj_configuration.idarchitecturetype = alt_value;
        obj_configuration.idarchitecturetypedesc = obj.options[obj.selectedIndex].text;
        alterou = 1;
    }

    alt_value = document.getElementById('installrtos_id_configura_alteracao').checked.toString();
    if (obj_configuration.installrtos != alt_value) {
        obj_configuration.installrtos = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('posixrtems5_id_configura_alteracao').checked.toString();
    if (obj_configuration.posixrtems5 != alt_value) {
        obj_configuration.posixrtems5 = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('rtems48i_id_configura_alteracao').checked.toString();
    if (obj_configuration.rtems48i != alt_value) {
        obj_configuration.rtems48i = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('rtems5_id_configura_alteracao').checked.toString();
    if (obj_configuration.rtems5 != alt_value) {
        obj_configuration.rtems5 = alt_value;
        alterou = 1;
    }

    if (alterou == 1) {
        obj_configuration.alterado[0] = 1;
        hash['mensagem'] = 'Alterações validadas. ';
        save_configura_local(hash);
    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local(hash);
    }
    return 1;
}

function val_save_arinc653module_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;

    if (valida_texto(document.getElementById('modulename_id_configura_alteracao').value, 'Modulename', "", true, 1, 20, hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_texto(document.getElementById('xmlnsxsi_id_configura_alteracao').value, 'xmlnsxsi', "", true, 0, 250, hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById('modulename_id_configura_alteracao').value;
    if (obj_configuration.arinc653module_obj.modulename != alt_value) {
        obj_configuration.arinc653module_obj.modulename = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('xmlnsxsi_id_configura_alteracao').value;
    if (obj_configuration.arinc653module_obj.xmlnsxsi != alt_value) {
        obj_configuration.arinc653module_obj.xmlnsxsi = alt_value;
        alterou = 1;
    }

    if (alterou == 1) {
        obj_configuration.alterado[1] = 1;

        hash['mensagem'] = 'Alterações validadas. ';
        save_configura_local(hash);
    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local(hash);
    }
    return 1;
}

function val_save_airconfiguration_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;

    alt_value = document.getElementById("requiredcores_id_configura_alteracao").value;
    if (valida_num_sup_zero(alt_value, 'Requiredcores', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById("tickspersecond_id_configura_alteracao").value;
    if (valida_num_sup_zero(alt_value, 'Tickspersecond', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById('requiredcores_id_configura_alteracao').value;
    if (obj_configuration.airconfiguration_obj.requiredcores != alt_value) {
        obj_configuration.airconfiguration_obj.requiredcores = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('tickspersecond_id_configura_alteracao').value;
    if (obj_configuration.airconfiguration_obj.tickspersecond != alt_value) {
        obj_configuration.airconfiguration_obj.tickspersecond = alt_value;
        alterou = 1;
    }

    if (alterou == 1) {
        obj_configuration.alterado[2] = 1;

        hash['mensagem'] = 'Alterações validadas. ';
        save_configura_local(hash);
    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local(hash);
    }
    return 1;
}

function val_save_moduleschedule_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;


    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");

    if (valida_texto(document.getElementById('schedulename_id_configura_alteracao').value, 'Schedulename', "", true, 1, 20, hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById("scheduleidentifier_id_configura_alteracao").value;
    if (valida_num_sup_zero(alt_value, 'Scheduleidentifier', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (valida_boolean(document.getElementById('initialmodulesched_id_configura_alteracao').checked, 'Initialmoduleschedule', hash) < 1) {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById("majorframeseconds_id_configura_alteracao").value;
    if (!expreg.test(alt_value)) {
        hash['mensagem'] = "Deve respeitar o formato: x.xxxxx!...";
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    alt_value = document.getElementById('schedulename_id_configura_alteracao').value;
    if (obj_configuration.moduleschedule_obj.schedulename != alt_value) {
        obj_configuration.moduleschedule_obj.schedulename = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('scheduleidentifier_id_configura_alteracao').value;
    if (obj_configuration.moduleschedule_obj.scheduleidentifier != alt_value) {
        obj_configuration.moduleschedule_obj.scheduleidentifier = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('initialmodulesched_id_configura_alteracao').checked.toString();
    if (obj_configuration.moduleschedule_obj.initialmoduleschedule != alt_value) {
        obj_configuration.moduleschedule_obj.initialmoduleschedule = alt_value;
        alterou = 1;
    }

    alt_value = document.getElementById('majorframeseconds_id_configura_alteracao').value;
    if (obj_configuration.moduleschedule_obj.majorframeseconds != alt_value) {
        obj_configuration.moduleschedule_obj.majorframeseconds = alt_value;
        alterou = 1;
    }

    if (alterou == 1) {
        obj_configuration.alterado[3] = 1;

        hash['mensagem'] = 'Alterações validadas. ';
        save_configura_local(hash);
    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local(hash);
    }
    return 1;
}

function val_save_partition_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;
    let partitions_count = 0;
    let i = 0;
    partitions_count = obj_configuration.partitions_obj.length;


    if (partitions_count > 0) {

        for (i = 0; i < partitions_count; i++) {

            if (obj_configuration.partitions_obj[i].stateid == CRIAR || obj_configuration.partitions_obj[i].stateid == ALTERAR || obj_configuration.partitions_obj[i].stateid == APAGAR) {
                alterou = 1;
            }
        }
    }

    if (alterou == 1) {

        hash['mensagem'] = 'Efetuou alerações';
        save_configura_local_partition_partition_schedule(hash);
        obj_configuration.alterado[4] = 1;

    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local_partition_partition_schedule(hash);
    }
    return 1;
}

function alterar_partition_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;
    let partitions_count = 0;
    let idlinha = 0;
    let obj_row = null;
    let count_columns = 0;


    partitions_count = obj_configuration.partitions_obj.length;

    if (partitions_count < 1) {
        hash['mensagem'] = 'Não existem partições criadas!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjparticao == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partição!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    idlinha = obj_configuration.idlinhaobjparticao.getAttribute('data-idpartitions');

    let expreg = new RegExp("[0-9]{1}(x)(\\d{6})$");

    if (idlinha != "") {
        if (valida_id_num_dropdown(document.getElementById("criticality_id_partitions_configura_alteracao").getAttribute('data-id'), 'Criticality' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_texto(document.getElementById('entrypoint_id_partitions_configura_alteracao').value, 'Entrypoint' + idlinha, "", true, 1, 30, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_texto(document.getElementById('partitionname_id_partitions_configura_alteracao').value, 'Partitionname' + idlinha, "", true, 1, 20, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        alt_value = document.getElementById("partitionidentifier_id_partitions_configura_alteracao").value;
        if (valida_num_sup_zero(alt_value, 'Partitionidentifier' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_boolean(document.getElementById('systempartition_id_partitions_configura_alteracao').checked, 'systempartition' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        alt_value = document.getElementById("cores_id_partitionconfiguration_configura_alteracao").value;
        if (valida_num_sup_zero(alt_value, 'Cores' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }
        if (regra_verifica_numero_cores(obj_configuration, alt_value, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_texto(document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value, 'Cache' + idlinha, "", false, 0, 0, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_multiselect('libs_partitionconfiguration_configura_alteracao', 'Libs' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_multiselect('personality_partitionconfiguration_configura_alteracao', 'Personality' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_multiselect('devices_partitionconfiguration_configura_alteracao', 'Devices' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (valida_multiselect('permissions_partitionconfiguration_configura_alteracao', 'Permissions' + idlinha, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        alt_value = document.getElementById("size_id_partitionconfiguration_memory_configura_alteracao").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Size" + idlinha + ": Deve respeitar o formato 0x000000!...";
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        obj = document.getElementById("criticality_id_partitions_configura_alteracao");
        alt_value = obj.getAttribute('data-id');
        if (obj_configuration.partitions_obj[idlinha].criticality != alt_value) {
            obj_configuration.partitions_obj[idlinha].criticality = alt_value;
            obj_configuration.partitions_obj[idlinha].criticalitydesc = obj.options[obj.selectedIndex].text;
            alterou = 1;
        }

        alt_value = document.getElementById('entrypoint_id_partitions_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].entrypoint != alt_value) {
            obj_configuration.partitions_obj[idlinha].entrypoint = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('partitionname_id_partitions_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].partitionname != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionname = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('partitionidentifier_id_partitions_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].partitionidentifier != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionidentifier = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('systempartition_id_partitions_configura_alteracao').checked.toString();
        if (obj_configuration.partitions_obj[idlinha].systempartition != alt_value) {
            obj_configuration.partitions_obj[idlinha].systempartition = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('cores_id_partitionconfiguration_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cores != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cores = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cache != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.cache = alt_value;
            alterou = 1;
        }

        alt_value = control_tabs.obtem_ids_multiselecao('libs_partitionconfiguration_configura_alteracao');
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idslibs != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idslibs = alt_value;
            alt_value = control_tabs.obtem_labels_multiselecao('libs_partitionconfiguration_configura_alteracao')
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.libs = alt_value;
            alterou = 1;
        }

        alt_value = control_tabs.obtem_ids_multiselecao('personality_partitionconfiguration_configura_alteracao');
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspersonality != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspersonality = alt_value;
            alt_value = control_tabs.obtem_labels_multiselecao('personality_partitionconfiguration_configura_alteracao')
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.personality = alt_value;
            alterou = 1;
        }

        alt_value = control_tabs.obtem_ids_multiselecao('devices_partitionconfiguration_configura_alteracao');
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idsdevices != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idsdevices = alt_value;
            alt_value = control_tabs.obtem_labels_multiselecao('devices_partitionconfiguration_configura_alteracao')
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.devices = alt_value;
            alterou = 1;
        }

        alt_value = control_tabs.obtem_ids_multiselecao('permissions_partitionconfiguration_configura_alteracao');
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspermissions != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.idspermissions = alt_value;
            alt_value = control_tabs.obtem_labels_multiselecao('permissions_partitionconfiguration_configura_alteracao')
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.permissions = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value;
        if (obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.memory_obj.size != alt_value) {
            obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.memory_obj.size = alt_value;
            alterou = 1;
        }
    }

    if (alterou == 1) {
        if (obj_configuration.partitions_obj[idlinha].id > 0) {

            hash['mensagem'] = 'Efetuou alterações';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            obj_configuration.partitions_obj[idlinha].stateid = ALTERAR;
            obj_configuration.partitions_obj[idlinha].statedesc = ALTERARDESC;

            obj_row = document.getElementById('idtr_partitions' + idlinha);
            count_columns = obj_row.cells.length;
            if (count_columns > 0) {
                obj_row.cells[count_columns - 1].innerText = ALTERARDESC;
            }
            hash['mensagem'] = 'Efetuou alterações';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        } else {
            hash['mensagem'] = 'Efetuou alterações';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        }


    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
    }
    return 1;
}

function apagar_partition_f() {

    let hash = {};
    let obj_row = null;
    let partitions_count = obj_configuration.partitions_obj.length;
    let count_columns = 0;
    let objtemp = null;
    let activa_cab_tabela = 0;

    if (partitions_count < 1) {
        hash['mensagem'] = 'Não existem partições criadas!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjparticao == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partição!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    let idlinha = obj_configuration.idlinhaobjparticao.getAttribute('data-idpartitions');

    if (idlinha != "") {

        if (obj_configuration.partitions_obj[idlinha].id > 0) {

            obj_configuration.partitions_obj[idlinha].stateid = APAGAR;
            obj_configuration.partitions_obj[idlinha].statedesc = APAGARDESC;

            obj_row = document.getElementById('idtr_partitions' + idlinha);
            count_columns = obj_row.cells.length;
            if (count_columns > 0) {
                obj_row.cells[count_columns - 1].innerText = APAGARDESC;
            }

        } else {

            let partitions_count = obj_configuration.partitions_obj.length;
            let HtmlContent = "";
            let i = 0;

            obj_configuration.partitions_obj[idlinha].stateid = LIXO;
            obj_configuration.partitions_obj[idlinha].statedesc = LIXODESC;
            document.getElementById('configura_partitions_ihtml').innerHTML = "";

            if (partitions_count > 0) {

                for (i = 0; i < partitions_count; i++) {
                    if (obj_configuration.partitions_obj[i].stateid != LIXO) {
                        activa_cab_tabela = 1;
                    }
                }

                if (activa_cab_tabela == 1) {
                    HtmlContent = '<table id="table_partitions" class="styled-table" style="width:100%">';
                    HtmlContent = HtmlContent + '<thead> \
                        <tr> \
                            <th style=\"white-space: nowrap;\">Id</th> \
                            <th style=\"white-space: nowrap;\">Partition name</th> \
                            <th style=\"white-space: nowrap;\">Partition identifier</th> \
                            <th style=\"white-space: nowrap;\">State</th> \
                        </tr> \
                    </thead> \
                    <tbody>';
                }

                for (i = 0; i < partitions_count; i++) {
                    if (obj_configuration.partitions_obj[i].stateid != LIXO) {
                        HtmlContent = HtmlContent + '<tr id="idtr_partitions' + i + '" ' + ' data-idpartitions ="' + i + '" onclick="seleciona_linha_listaon_configura_partitions(this);\">';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].id + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].partitionname + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].partitionidentifier + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].statedesc + '</td>';
                        HtmlContent = HtmlContent + '</tr>';
                    }
                }

                HtmlContent = HtmlContent + '</tbody></table>';
                document.getElementById('configura_partitions_ihtml').innerHTML = HtmlContent;

                objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
                objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
                objtemp.setAttribute('data-id', 0);

                document.getElementById('entrypoint_id_partitions_configura_alteracao').value = "";
                document.getElementById('partitionname_id_partitions_configura_alteracao').value = "";
                document.getElementById('partitionidentifier_id_partitions_configura_alteracao').value = "";
                document.getElementById('systempartition_id_partitions_configura_alteracao').checked = false;
                document.getElementById('systempartition_id_partitions_configura_alteracao').removeAttribute('checked');

                document.getElementById('cores_id_partitionconfiguration_configura_alteracao').value = "";
                document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value = "";

                control_tabs.reset_multiselect('libs_partitionconfiguration_configura_alteracao');
                control_tabs.reset_multiselect('personality_partitionconfiguration_configura_alteracao');
                control_tabs.reset_multiselect('devices_partitionconfiguration_configura_alteracao');
                control_tabs.reset_multiselect('permissions_partitionconfiguration_configura_alteracao');

                document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value = "";

                obj_configuration.idlinhaobjparticao = null;
                document.getElementById('tabcontext4_partitions_alt').style.display = 'none';
                document.getElementById('tabcontext4_partitionconfiguration_alt').style.display = 'none';
                document.getElementById('tabcontext4_partitionconfiguration_memory_alt').style.display = 'none';

            }
        }

        hash['mensagem'] = 'Efetuou alterações';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

    }
}

function repor_partition_f() {

    let idlinha;
    let objtemp;
    let hash = {};

    if (obj_configuration.idlinhaobjparticao !== null) {

        idlinha = obj_configuration.idlinhaobjparticao.getAttribute('data-idpartitions');

        objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
        objtemp.options[objtemp.selectedIndex].text = "-- " + obj_configuration_initial.partitions_obj[idlinha].criticalitydesc + " --";
        objtemp.setAttribute('data-id', obj_configuration_initial.partitions_obj[idlinha].criticality);
        document.getElementById('entrypoint_id_partitions_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].entrypoint;
        document.getElementById('partitionname_id_partitions_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionname;
        document.getElementById('partitionidentifier_id_partitions_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionidentifier;


        if (obj_configuration_initial.partitions_obj[idlinha].systempartition == 'true') {
            document.getElementById('systempartition_id_partitions_configura_alteracao').setAttribute('checked', 'checked');
            document.getElementById('systempartition_id_partitions_configura_alteracao').checked = true;
        } else {
            document.getElementById('systempartition_id_partitions_configura_alteracao').removeAttribute('checked');
            document.getElementById('systempartition_id_partitions_configura_alteracao').checked = false;
        }

        document.getElementById('cores_id_partitionconfiguration_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.cores;
        document.getElementById('cache_id_partitionconfiguration_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.cache;

        control_tabs.reset_multiselect('libs_partitionconfiguration_configura_alteracao');
        control_tabs.seleciona_multiselect('libs_partitionconfiguration_configura_alteracao', obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.idslibs, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.libs);
        control_tabs.reset_multiselect('personality_partitionconfiguration_configura_alteracao');
        control_tabs.seleciona_multiselect('personality_partitionconfiguration_configura_alteracao', obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.idspersonality, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.personality);
        control_tabs.reset_multiselect('devices_partitionconfiguration_configura_alteracao');
        control_tabs.seleciona_multiselect('devices_partitionconfiguration_configura_alteracao', obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.idsdevices, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.devices);
        control_tabs.reset_multiselect('permissions_partitionconfiguration_configura_alteracao');
        control_tabs.seleciona_multiselect('permissions_partitionconfiguration_configura_alteracao', obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.idspermissions, obj_configuration.partitions_obj[idlinha].partitionconfiguration_obj.permissions);

        document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.memory_obj.size;

        hash['mensagem'] = 'Efetuou a reposição da partition!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
    } else {
        hash['mensagem'] = 'Não tem partição selecionada!...';
        mostra_mensagem_box_conf(hash['mensagem']);
    }

}

function inserir_partition_f() {

    let partitions_count = obj_configuration.partitions_obj.length;
    let new_partition_indice = -1;
    let table_body_obj = null;
    let newRow = null;
    let HtmlContent = "";
    let hash = {};
    let expreg = new RegExp("[0-9]{1}(x)(\\d{6})$");
    let i = 0;
    let obj = null;

    if (partitions_count >= 0) new_partition_indice = partitions_count;

    if (new_partition_indice >= 0) {

        if (valida_id_num_dropdown(document.getElementById("criticality_id_partitions_configura_alteracao_box").getAttribute('data-id'), 'Criticality', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_texto(document.getElementById('entrypoint_id_partitions_configura_alteracao_box').value, 'Entrypoint', "", true, 1, 30, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_texto(document.getElementById('partitionname_id_partitions_configura_alteracao_box').value, 'Partitionname', "", true, 1, 20, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        alt_value = document.getElementById("partitionidentifier_id_partitions_configura_alteracao_box").value;
        if (valida_num_sup_zero(alt_value, 'Partitionidentifier', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_boolean(document.getElementById('systempartition_id_partitions_configura_alteracao_box').checked, 'systempartition', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        alt_value = document.getElementById("cores_id_partitionconfiguration_configura_alteracao_box").value;
        if (valida_num_sup_zero(alt_value, 'Cores', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (regra_verifica_numero_cores(obj_configuration, alt_value, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_texto(document.getElementById('cache_id_partitionconfiguration_configura_alteracao_box').value, 'Cache', "", false, 0, 0, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_multiselect('libs_partitionconfiguration_configura_alteracao_box', 'Libs', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_multiselect('personality_partitionconfiguration_configura_alteracao_box', 'Personality', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_multiselect('devices_partitionconfiguration_configura_alteracao_box', 'Devices', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        if (valida_multiselect('permissions_partitionconfiguration_configura_alteracao_box', 'Permissions', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        alt_value = document.getElementById("size_id_partitionconfiguration_memory_configura_alteracao_box").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Size: Deve respeitar o formato 0x000000!...";
            mostra_mensagem(hash, 'form_dialog_partitions');
            return 0;
        }

        obj = document.getElementById("criticality_id_partitions_configura_alteracao_box");
        alt_value = obj.getAttribute('data-id');

        obj_configuration.partitions_obj[new_partition_indice] = new partitions_cls();

        obj_configuration.partitions_obj[new_partition_indice].criticality = alt_value;
        obj_configuration.partitions_obj[new_partition_indice].criticalitydesc = obj.options[obj.selectedIndex].text;

        alt_value = document.getElementById('entrypoint_id_partitions_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].entrypoint = alt_value;

        alt_value = document.getElementById('partitionname_id_partitions_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionname = alt_value;

        alt_value = document.getElementById('partitionidentifier_id_partitions_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionidentifier = alt_value;

        alt_value = document.getElementById('systempartition_id_partitions_configura_alteracao_box').checked.toString();
        obj_configuration.partitions_obj[new_partition_indice].systempartition = alt_value;

        alt_value = document.getElementById('cores_id_partitionconfiguration_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.cores = alt_value;

        alt_value = document.getElementById('cache_id_partitionconfiguration_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.cache = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('libs_partitionconfiguration_configura_alteracao_box');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idslibs = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('libs_partitionconfiguration_configura_alteracao_box')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.libs = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('personality_partitionconfiguration_configura_alteracao_box');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idspersonality = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('personality_partitionconfiguration_configura_alteracao_box')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.personality = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('devices_partitionconfiguration_configura_alteracao_box');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idsdevices = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('devices_partitionconfiguration_configura_alteracao_box')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.devices = alt_value;

        alt_value = control_tabs.obtem_ids_multiselecao('permissions_partitionconfiguration_configura_alteracao_box');
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.idspermissions = alt_value;
        alt_value = control_tabs.obtem_labels_multiselecao('permissions_partitionconfiguration_configura_alteracao_box')
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.permissions = alt_value;

        alt_value = document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao_box').value;
        obj_configuration.partitions_obj[new_partition_indice].partitionconfiguration_obj.memory_obj.size = alt_value;

        obj_configuration.partitions_obj[new_partition_indice].id = 0;

        obj_configuration.partitions_obj[new_partition_indice].stateid = CRIAR;
        obj_configuration.partitions_obj[new_partition_indice].statedesc = CRIARDESC;

        obj_configuration.partitions_obj[new_partition_indice].idarinc653module = obj_configuration.arinc653module_obj.id;

        document.getElementById('configura_partitions_ihtml').innerHTML = "";

        partitions_count = obj_configuration.partitions_obj.length;

        if (partitions_count > 0) {

            HtmlContent = '<table id="table_partitions" class="styled-table" style="width:100%">';
            HtmlContent = HtmlContent + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Partition name</th> \
                    <th style=\"white-space: nowrap;\">Partition identifier</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

            for (i = 0; i < partitions_count; i++) {
                if (obj_configuration.partitions_obj[i].stateid != LIXO) {
                    HtmlContent = HtmlContent + '<tr id="idtr_partitions' + i + '" ' + ' data-idpartitions ="' + i + '" onclick="seleciona_linha_listaon_configura_partitions(this);\">';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].id + '</td>';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].partitionname + '</td>';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].partitionidentifier + '</td>';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[i].statedesc + '</td>';
                    HtmlContent = HtmlContent + '</tr>';
                }
            }

            HtmlContent = HtmlContent + '</tbody></table>';
            document.getElementById('configura_partitions_ihtml').innerHTML = HtmlContent;
        }

        hash['mensagem'] = 'Criou a nova partition!...';
        document.getElementById('dialog-box').close();
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        mostra_mensagem_box_conf(hash['mensagem']);
        

        return 1;
    }

}

//-------------Controla dialogbox
function configura_nova_partition_f() {

    let novo_partition_identifier = 0;

    obtem_vista_f('vista_partition.php', 'conteudo_vista', 'form_mensagem_configura_alteracao');
    setTimeout(
        function () {
            document.getElementById('dialog-box').showModal();

            novo_partition_identifier = control_tabs.obtem_partition_identifier(obj_configuration);
            document.getElementById('partitionidentifier_id_partitions_configura_alteracao_box').value = novo_partition_identifier;
            document.getElementById('partitionname_id_partitions_configura_alteracao_box').value = 'p' + novo_partition_identifier;

        }, 1000
    );

}

function val_save_partitionschedule_f() {

    let hash = {};

    let alterou = 0;
    let partitionschedule_count = 0;
    let windowschedule_count = 0;
    let i, j = 0;
    partitionschedule_count = obj_configuration.partitionschedule_obj.length;


    if (partitionschedule_count > 0) {

        for (i = 0; i < partitionschedule_count; i++) {

            if (obj_configuration.partitionschedule_obj[i].stateid == CRIAR || obj_configuration.partitionschedule_obj[i].stateid == ALTERAR || obj_configuration.partitionschedule_obj[i].stateid == APAGAR) {
                alterou = 1;
            }
        }

        for (i = 0; i < partitionschedule_count; i++) {
            windowschedule_count = obj_configuration.partitionschedule_obj[i].windowschedule_obj.length;
            if (windowschedule_count > 0) {

                for (j = 0; j < windowschedule_count; j++) {
                    if (obj_configuration.partitionschedule_obj[i].windowschedule_obj[j].stateid == CRIAR || obj_configuration.partitionschedule_obj[i].windowschedule_obj[j].stateid == ALTERAR || obj_configuration.partitionschedule_obj[i].windowschedule_obj[j].stateid == APAGAR) {
                        alterou = 1;
                    }
                }
                windowschedule_count = 0;
            }
        }
    }

    if (alterou == 1) {
        obj_configuration.alterado[5] = 1;

        hash['mensagem'] = 'Alterações validadas. ';
        save_configura_local_partition_partition_schedule(hash);
    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        save_configura_local_partition_partition_schedule(hash);
    }
    return 1;
}

function configura_nova_partitionschedule_f() {

    let novo_window_identifier = 0;

    obtem_vista_f('vista_partition_schedule.php', 'conteudo_vista2', 'form_mensagem_configura_alteracao');
    setTimeout(
        function () {
            document.getElementById('dialog-box2').showModal();
            novo_window_identifier = control_tabs.obtem_window_identifier_ps(obj_configuration);
            document.getElementById("windowidentifier_id_windowconfiguration_configura_alteracao_box").value = novo_window_identifier;
            document.getElementById("cores_id_windowconfiguration_configura_alteracao_box").value = Number(obj_configuration.airconfiguration_obj.requiredcores);
            document.getElementById("cores_id_windowconfiguration_configura_alteracao_box").setAttribute('max', obj_configuration.airconfiguration_obj.requiredcores);

        }, 1000
    );
}

function inserir_partitionschedule_f() {

    let partitionschedule_count = obj_configuration.partitionschedule_obj.length;
    let new_partitionschedule_indice = -1;
    let table_body_obj = null;
    let newRow = null;
    let HtmlContent = "";
    let hash = {};
    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let i = 0;
    let periodseconds_p = 0;
    let perioddurationseconds_p = 0;

    if (partitionschedule_count >= 0) new_partitionschedule_indice = partitionschedule_count;

    if (new_partitionschedule_indice >= 0) {

        alt_value = document.getElementById("perioddurationseconds_id_partitionschedule_configura_alteracao_box").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Period duration seconds: Deve respeitar o formato x.xxxxx!...";
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }
        perioddurationseconds_p = alt_value;

        alt_value = document.getElementById("periodseconds_id_partitionschedule_configura_alteracao_box").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Period seconds: Deve respeitar o formato x.xxxxx!...";
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        periodseconds_p = alt_value;

        if (regra_verifica_perioddurationseconds_periodseconds(perioddurationseconds_p, periodseconds_p, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        if (regra_verifica_perioddurationseconds_periodseconds_escala(perioddurationseconds_p, periodseconds_p, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        alt_value = document.getElementById("windowidentifier_id_windowconfiguration_configura_alteracao_box").value;
        if (valida_num_sup_zero(alt_value, 'Window identifier', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        alt_value = document.getElementById("cores_id_windowconfiguration_configura_alteracao_box").value;
        if (valida_num_sup_zero(alt_value, 'Cores', hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        if (regra_verifica_numero_cores_ps(obj_configuration, alt_value, hash) < 1) {
            mostra_mensagem(hash, 'form_dialog_partitionschedule');
            return 0;
        }

        obj_configuration.partitionschedule_obj[new_partitionschedule_indice] = new partitionschedule_cls();

        obj = document.getElementById("perioddurationseconds_id_partitionschedule_configura_alteracao_box");
        alt_value = obj.value;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].perioddurationseconds = alt_value;

        obj = document.getElementById("periodseconds_id_partitionschedule_configura_alteracao_box");
        alt_value = obj.value;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].periodseconds = alt_value;

        alt_value = document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao_box').value;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].windowconfiguration_obj.windowidentifier = alt_value;

        alt_value = document.getElementById('cores_id_windowconfiguration_configura_alteracao_box').value;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].windowconfiguration_obj.cores = alt_value;

        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].id = 0;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].stateid = CRIAR;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].statedesc = CRIARDESC;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].idmoduleschedule = obj_configuration.moduleschedule_obj.id;

        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].windowconfiguration_obj.id = 0;
        obj_configuration.partitionschedule_obj[new_partitionschedule_indice].windowconfiguration_obj.idpartitionschedule = 0;


        document.getElementById('configura_partitionschedule_ihtml').innerHTML = "";

        partitionschedule_count = obj_configuration.partitionschedule_obj.length;

        if (partitionschedule_count > 0) {

            HtmlContent = '<table class="styled-table" style="width:100%">';
            HtmlContent = HtmlContent + '<thead> \
                <tr> \
                    <th style=\"white-space: nowrap;\">Id</th> \
                    <th style=\"white-space: nowrap;\">Period duration seconds</th> \
                    <th style=\"white-space: nowrap;\">Period seconds</th> \
                    <th style=\"white-space: nowrap;\">State</th> \
                </tr> \
            </thead> \
            <tbody>';

            for (i = 0; i < partitionschedule_count; i++) {

                HtmlContent = HtmlContent + '<tr id="idtr_partitionschedule' + i + '" ' + ' data-idpartitionschedule ="' + i + '" onclick="seleciona_linha_listaon_configura_partitionschedule(this)\">';
                HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].id + '</td>';
                HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].perioddurationseconds + '</td>';
                HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].periodseconds + '</td>';
                HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].statedesc + '</td>';
                HtmlContent = HtmlContent + '</tr>';
            }

            HtmlContent = HtmlContent + '</tbody></table>';

            document.getElementById('configura_partitionschedule_ihtml').innerHTML = HtmlContent;

            hash['mensagem'] = 'Criou a nova partitionschedule!...';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            document.getElementById('dialog-box2').close();
        }
        return 1;
    }

}

function alterar_partitionschedule_f() {

    let hash = {};
    let alt_value;
    let obj;
    let alterou = 0;
    let partitionschedule_count = 0;
    let idlinha = 0;
    let obj_row = null;
    let count_columns = 0;
    let periodseconds_p = 0;
    let perioddurationseconds_p = 0;

    partitionschedule_count = obj_configuration.partitionschedule_obj.length;

    if (partitionschedule_count < 1) {
        hash['mensagem'] = 'Não existem partitionschedule criadas!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjpartitionschedule == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    idlinha = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");

    if (idlinha != "") {

        alt_value = document.getElementById("perioddurationseconds_id_partitionschedule_configura_alteracao").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Period duration seconds: Deve respeitar o formato x.xxxxx!...";
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }
        perioddurationseconds_p = alt_value;

        alt_value = document.getElementById("periodseconds_id_partitionschedule_configura_alteracao").value;
        if (!expreg.test(alt_value)) {
            hash['mensagem'] = "Period seconds: Deve respeitar o formato x.xxxxx!...";
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        periodseconds_p = alt_value;

        if (regra_verifica_perioddurationseconds_periodseconds(perioddurationseconds_p, periodseconds_p, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (regra_verifica_perioddurationseconds_periodseconds_escala(perioddurationseconds_p, periodseconds_p, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            return 0;
        }

        alt_value = document.getElementById("windowidentifier_id_windowconfiguration_configura_alteracao").value;
        if (valida_num_sup_zero(alt_value, 'Window identifier', hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        alt_value = document.getElementById("cores_id_windowconfiguration_configura_alteracao").value;
        if (valida_num_sup_zero(alt_value, 'Cores', hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        if (regra_verifica_numero_cores_ps(obj_configuration, alt_value, hash) < 1) {
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

        alt_value = document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').value;
        if (obj_configuration.partitionschedule_obj[idlinha].perioddurationseconds != alt_value) {
            obj_configuration.partitionschedule_obj[idlinha].perioddurationseconds = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').value;
        if (obj_configuration.partitionschedule_obj[idlinha].periodseconds != alt_value) {
            obj_configuration.partitionschedule_obj[idlinha].periodseconds = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').value;
        if (obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.windowidentifier != alt_value) {
            obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.windowidentifier = alt_value;
            alterou = 1;
        }

        alt_value = document.getElementById('cores_id_windowconfiguration_configura_alteracao').value;
        if (obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.cores != alt_value) {
            obj_configuration.partitionschedule_obj[idlinha].windowconfiguration_obj.cores = alt_value;
            alterou = 1;
        }
    }

    if (alterou == 1) {
        if (obj_configuration.partitionschedule_obj[idlinha].id > 0) {

            obj_configuration.partitionschedule_obj[idlinha].stateid = ALTERAR;
            obj_configuration.partitionschedule_obj[idlinha].statedesc = ALTERARDESC;

            obj_row = document.getElementById('idtr_partitionschedule' + idlinha);
            count_columns = obj_row.cells.length;
            if (count_columns > 0) {
                obj_row.cells[count_columns - 1].innerText = ALTERARDESC;
                obj_row.cells[1].innerText = obj_configuration.partitionschedule_obj[idlinha].perioddurationseconds;
                obj_row.cells[2].innerText = obj_configuration.partitionschedule_obj[idlinha].periodseconds;
            }
            hash['mensagem'] = 'Efetuou alterações';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

        } else {
            obj_row = document.getElementById('idtr_partitionschedule' + idlinha);
            count_columns = obj_row.cells.length;
            if (count_columns > 0) {
                obj_row.cells[1].innerText = obj_configuration.partitionschedule_obj[idlinha].perioddurationseconds;
                obj_row.cells[2].innerText = obj_configuration.partitionschedule_obj[idlinha].periodseconds;
            }

            hash['mensagem'] = 'Efetuou alterações';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        }

    } else {
        hash['mensagem'] = 'Não efetuou alterações. ';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
    }
    return 1;
}

function apagar_partitionschedule_f() {

    let hash = {};
    let obj_row = null;
    let partitionschedule_count = obj_configuration.partitionschedule_obj.length;
    let count_columns = 0;
    let objtemp = null;
    let activa_cab_tabela = 0;
    let idlinha;

    if (partitionschedule_count < 1) {
        hash['mensagem'] = 'Não existem partitionschedule criadas!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjpartitionschedule == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    idlinha = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

    if (idlinha != "") {

        if (obj_configuration.partitionschedule_obj[idlinha].id > 0) {

            obj_configuration.partitionschedule_obj[idlinha].stateid = APAGAR;
            obj_configuration.partitionschedule_obj[idlinha].statedesc = APAGARDESC;

            obj_row = document.getElementById('idtr_partitionschedule' + idlinha);
            count_columns = obj_row.cells.length;
            if (count_columns > 0) {
                obj_row.cells[count_columns - 1].innerText = APAGARDESC;
            }

        } else {

            partitionschedule_count = obj_configuration.partitionschedule_obj.length;
            let HtmlContent = "";
            let i = 0;

            obj_configuration.partitionschedule_obj[idlinha].stateid = LIXO;
            obj_configuration.partitionschedule_obj[idlinha].statedesc = LIXODESC;
            document.getElementById('configura_partitionschedule_ihtml').innerHTML = "";

            if (partitionschedule_count > 0) {

                for (i = 0; i < partitionschedule_count; i++) {
                    if (obj_configuration.partitionschedule_obj[i].stateid != LIXO) {
                        activa_cab_tabela = 1;
                    }
                }

                if (activa_cab_tabela == 1) {

                    HtmlContent = '<table class="styled-table" style="width:100%">';
                    HtmlContent = HtmlContent + '<thead> \
                        <tr> \
                            <th style=\"white-space: nowrap;\">Id</th> \
                            <th style=\"white-space: nowrap;\">Period duration seconds</th> \
                            <th style=\"white-space: nowrap;\">Period seconds</th> \
                            <th style=\"white-space: nowrap;\">State</th> \
                        </tr> \
                    </thead> \
                    <tbody>';
                }

                for (i = 0; i < partitionschedule_count; i++) {
                    if (obj_configuration.partitionschedule_obj[i].stateid != LIXO) {
                        HtmlContent = HtmlContent + '<tr id="idtr_partitionschedule' + i + '" ' + ' data-idpartitionschedule ="' + i + '" onclick="seleciona_linha_listaon_configura_partitionschedule(this)\">';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].id + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].perioddurationseconds + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].periodseconds + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[i].statedesc + '</td>';
                        HtmlContent = HtmlContent + '</tr>';
                    }
                }

                HtmlContent = HtmlContent + '</tbody></table>';
                document.getElementById('configura_partitionschedule_ihtml').innerHTML = HtmlContent;

                document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').value = "";
                document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').value = "";

                document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').value = "";
                document.getElementById('cores_id_windowconfiguration_configura_alteracao').value = "";

                obj_configuration.idlinhaobjpartitionschedule = null;
                document.getElementById('configura_windowchedule_ihtml').innerHTML = "";
                document.getElementById('tabcontext5_partitionschedule_alt').style.display = 'none';
                document.getElementById('tabcontext5_windowconfiguration_alt').style.display = 'none';

                document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
                document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value = "";

                objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");
                objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
                objtemp.setAttribute('data-id', 0);

                obj_configuration.partitionschedule_obj[idlinha].idlinhaobjwindowschedule = null;
                document.getElementById('tabcontext5_windowchedule_alt').style.display = 'none';
            }
        }

        hash['mensagem'] = 'Efetuou alterações';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

    }
}

function repor_partitionschedule_f() {

    let idlinha;
    let objtemp;
    let hash = {};

    if (obj_configuration.idlinhaobjpartitionschedule !== null) {

        idlinha = obj_configuration.idlinhaobjparticao.getAttribute('data-idpartitionschedule');

        document.getElementById('perioddurationseconds_id_partitionschedule_configura_alteracao').value = obj_configuration_initial.partitionschedule_obj[idlinha].perioddurationseconds;
        document.getElementById('periodseconds_id_partitionschedule_configura_alteracao').value = obj_configuration_initial.partitionschedule_obj[idlinha].periodseconds;
        document.getElementById('windowidentifier_id_windowconfiguration_configura_alteracao').value = obj_configuration_initial.partitionschedule_obj[idlinha].windowidentifier;
        document.getElementById('cores_id_windowconfiguration_configura_alteracao').value = obj_configuration_initial.partitionschedule_obj[idlinha].cores;


        document.getElementById('size_id_partitionconfiguration_memory_configura_alteracao').value = obj_configuration_initial.partitions_obj[idlinha].partitionconfiguration_obj.memory_obj.size;

        hash['mensagem'] = 'Efetuou a reposição da partitionschedule e windowconfiguration!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
    } else {
        hash['mensagem'] = 'Não tem partition schedule selecionada!...';
        //alert('Não tem partition schedule selecionada!...');
        mostra_mensagem_box_conf(hash['mensagem']);
    }

}

//-----------------------------------------------------
function configura_nova_windowschedule_f() {

    let novo_window_identifier = 0;

    obtem_vista_f('vista_window_schedule.php', 'conteudo_vista3', 'form_mensagem_configura_alteracao');

    setTimeout(
        function () {
            document.getElementById('dialog-box3').showModal();
            control_tabs.atualiza_dropdown_partition_box("partition_id_reset_box", obj_configuration.partitions_obj);
            novo_window_identifier = control_tabs.obtem_window_identifier(obj_configuration);
            document.getElementById('windowidentifier_id_windowchedule_configura_alteracao_box').value = novo_window_identifier;
            document.getElementById("coreidentifier_id_windowchedule_configura_alteracao_box").setAttribute('max', obj_configuration.airconfiguration_obj.requiredcores);

        }, 1000
    );
}

function inserir_windowschedule_f() {

    let windowschedule_conta = 0;
    let new_windowschedule_indice = -1;
    let HtmlContent = "";
    let hash = {};
    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let i = 0;
    let idlinha_partitionschedule = 0;
    let alt_value;
    let obj = null;
    let indicepartition = 0;
    let periodseconds_p = 0;
    let windowstartseconds_p = 0;
    let perioddurationseconds_p = 0;
    let windowdurationseconds_p = 0;
    let soma_windowdurationseconds_p = 0;
    let core_p = 0;
    let partitionconfigurationid_p = 0;

    let partitionschedule_count = obj_configuration.partitionschedule_obj.length;


    if (partitionschedule_count < 1) {
        hash['mensagem'] = 'Não existem partitionschedule criadas!...';
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjpartitionschedule == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    idlinha_partitionschedule = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

    if (idlinha_partitionschedule != "") {

        windowschedule_conta = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj.length;

        if (windowschedule_conta >= 0) new_windowschedule_indice = windowschedule_conta;

        if (new_windowschedule_indice >= 0) {

            alt_value = document.getElementById("windowidentifier_id_windowchedule_configura_alteracao_box").value;
            if (valida_num_sup_zero(alt_value, 'Window identifier', hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            alt_value = document.getElementById("coreidentifier_id_windowchedule_configura_alteracao_box").value;
            if (valida_num_sup_zero(alt_value, 'Core identifier', hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }
            core_p = alt_value;

            alt_value = document.getElementById("partition_id_windowchedule_configura_alteracao_box").getAttribute('data-id');
            if (valida_id_num_dropdown(alt_value, 'Partition', hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }
            partitionconfigurationid_p = alt_value;


            alt_value = document.getElementById("windowstartseconds_id_windowchedule_configura_alteracao_box").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window start seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }
            windowstartseconds_p = alt_value;
            periodseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].periodseconds;
            if (regra_verifica_windowstartseconds_periodseconds(windowstartseconds_p, periodseconds_p, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            alt_value = document.getElementById("windowdurationseconds_id_windowchedule_configura_alteracao_box").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window duration seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }
            windowdurationseconds_p = alt_value;
            perioddurationseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].perioddurationseconds;
            if (regra_verifica_windowdurationseconds_periodseconds(windowdurationseconds_p, windowstartseconds_p, periodseconds_p, perioddurationseconds_p, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            if (valida_boolean(document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao_box').checked, 'partitionperiodstart', hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            windowschedule_conta = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj.length;
            perioddurationseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].perioddurationseconds;
            for (i = 0; i < windowschedule_conta; i++) {

                if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].stateid != APAGAR &&
                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].stateid != LIXO &&
                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].coreidentifier == core_p) {

                    soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].windowdurationseconds);
                }

            }
            soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * windowdurationseconds_p);


            if (regra_verifica_windowdurationseconds_total(soma_windowdurationseconds_p, perioddurationseconds_p, idlinha_partitionschedule, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            if (regra_verifica_sobreposicao(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, core_p, windowdurationseconds_p, windowstartseconds_p, true, -1, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            if (regra_verifica_cores(obj_configuration.partitionschedule_obj[idlinha_partitionschedule], obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, core_p, true, -1, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            if (regra_verifica_cores_partition(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, obj_configuration.partitions_obj, partitionconfigurationid_p, core_p, true, -1, hash) < 1) {
                mostra_mensagem(hash, 'form_dialog_windowschedule');
                return 0;
            }

            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice] = new windowschedule_cls();

            obj = document.getElementById("windowidentifier_id_windowchedule_configura_alteracao_box");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].windowidentifier = alt_value;

            obj = document.getElementById("coreidentifier_id_windowchedule_configura_alteracao_box");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].coreidentifier = alt_value;

            obj = document.getElementById("partition_id_windowchedule_configura_alteracao_box");
            alt_value = obj.getAttribute('data-id');
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].idpartitionconfiguration = alt_value;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].idpartitionschedule = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].id;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].id = 0;

            obj = document.getElementById("windowstartseconds_id_windowchedule_configura_alteracao_box");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].windowstartseconds = alt_value;

            obj = document.getElementById("windowdurationseconds_id_windowchedule_configura_alteracao_box");
            alt_value = obj.value;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].windowdurationseconds = alt_value;

            alt_value = document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao_box').checked.toString();
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].partitionperiodstart = alt_value;

            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].stateid = CRIAR;
            obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[new_windowschedule_indice].statedesc = CRIARDESC;

            document.getElementById('configura_windowchedule_ihtml').innerHTML = "";

            windowschedule_conta = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj.length;


            if (windowschedule_conta > 0) {

                HtmlContent = '<table class="styled-table" style="width:100%">';
                HtmlContent = HtmlContent + '<thead> \
                    <tr> \
                        <th style=\"white-space: nowrap;\">Id window schedule</th> \
                        <th style=\"white-space: nowrap;\">Window identifier</th> \
                        <th style=\"white-space: nowrap;\">Core identifier</th> \
                        <th style=\"white-space: nowrap;\">Partition name</th> \
                        <th style=\"white-space: nowrap;\">State</th> \
                    </tr> \
                </thead> \
                <tbody>';

                for (i = 0; i < windowschedule_conta; i++) {

                    HtmlContent = HtmlContent + '<tr id="idtr_windowchedule' + i + '" ' + ' data-idpartitionschedule ="' + idlinha_partitionschedule + '" data-idwindowchedule = "' + i + '" onclick="seleciona_linha_listaon_configura_windowchedule(this)\">';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].id + '</td>';

                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].windowidentifier + '</td>';
                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].coreidentifier + '</td>';

                    indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].idpartitionconfiguration);

                    if (indicepartition >= 0) {
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[indicepartition].partitionname + '</td>';
                    } else {
                        HtmlContent = HtmlContent + '<td>Não encontrado. Erro na configuração!...</td>';
                    }

                    HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].statedesc + '</td>';

                    HtmlContent = HtmlContent + '</tr>';
                }

                HtmlContent = HtmlContent + '</tbody></table>';
                document.getElementById('configura_windowchedule_ihtml').innerHTML = HtmlContent;


                hash['mensagem'] = 'Criou nova windowchedule!...';
                document.getElementById('dialog-box3').close();
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                mostra_mensagem_box_conf(hash['mensagem']);

                return 1;
            }

            return 0;
        }
        return 0;
    }
    return 0;
}

function repor_windowschedule_f() {

    let idlinha_windowschedule;
    let idlinha_partitionschedule;
    let objtemp;
    let hash = {};
    let idpartition;
    let indicepartition;
    let namepartition;

    if (obj_configuration.idlinhaobjpartitionschedule !== null) {

        idlinha_partitionschedule = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

        if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].idlinhaobjwindowschedule != null) {

            idlinha_windowschedule = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].idlinhaobjwindowschedule.getAttribute('data-idwindowchedule');

            if (idlinha_windowschedule >= 0) {

                document.getElementById("windowidentifier_id_windowchedule_configura_alteracao").value = obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].windowidentifier;
                document.getElementById("coreidentifier_id_windowchedule_configura_alteracao").value = obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].coreidentifier;;

                indicepartition = devolve_indice_array_partition(obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].idpartitionconfiguration);
                objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");
                idpartition = obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].idpartitionconfiguration;
                namepartition = obj_configuration_initial.partitions_obj[indicepartition].partitionname;
                objtemp.options[objtemp.selectedIndex].text = namepartition;
                objtemp.setAttribute('data-id', idpartition);

                document.getElementById("windowstartseconds_id_windowchedule_configura_alteracao").value = obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].windowstartseconds;
                document.getElementById("windowdurationseconds_id_windowchedule_configura_alteracao").value = obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].windowdurationseconds;

                if (obj_configuration_initial.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_windowschedule].partitionperiodstart == 'true') {
                    document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = true;
                } else {
                    document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
                }

                hash['mensagem'] = 'Efetuou a reposição da windowschedule!...';
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

            } else {
                hash['mensagem'] = 'Não tem window schedule selecionada!...';
                mostra_mensagem_box_conf(hash['mensagem']);
                //alert('Não tem window schedule selecionada!...');
                
            }
        } else {
            hash['mensagem'] = 'Não tem window schedule selecionada!...';
            mostra_mensagem_box_conf(hash['mensagem']);
            //alert('Não tem window schedule selecionada!...');
        }
    } else {
        hash['mensagem'] = 'Não tem window schedule selecionada!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //alert('Não tem window schedule selecionada!...');
    }
}
function apagar_windowschedule_f() {

    let hash = {};
    let obj_row = null;
    let windowschedule_count;
    let count_columns = 0;
    let objtemp = null;
    let activa_cab_tabela = 0;
    let idlinha_ps;
    let idlinha_ws;
    let HtmlContent = "";
    let i = 0;
    let indicepartition;

    idlinha_ps = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

    if (idlinha_ps >= 0) {

        if (obj_configuration.partitionschedule_obj[idlinha_ps].idlinhaobjwindowschedule != null) {

            idlinha_ws = obj_configuration.partitionschedule_obj[idlinha_ps].idlinhaobjwindowschedule.getAttribute('data-idwindowchedule');

            if (obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[idlinha_ws].id > 0) {

                obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[idlinha_ws].stateid = APAGAR;
                obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[idlinha_ws].statedesc = APAGARDESC;

                obj_row = document.getElementById('idtr_windowchedule' + idlinha_ws);
                count_columns = obj_row.cells.length;
                if (count_columns > 0) {
                    obj_row.cells[count_columns - 1].innerText = APAGARDESC;
                }

            } else {
                windowschedule_count = obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj.length;

                obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[idlinha_ws].stateid = LIXO;
                obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[idlinha_ws].statedesc = LIXODESC;
                document.getElementById('configura_windowchedule_ihtml').innerHTML = "";

                if (windowschedule_count > 0) {

                    for (i = 0; i < windowschedule_count; i++) {
                        if (obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].stateid != LIXO) {
                            activa_cab_tabela = 1;
                        }
                    }

                    if (activa_cab_tabela == 1) {

                        HtmlContent = '<table class="styled-table" style="width:100%">';
                        HtmlContent = HtmlContent + '<thead> \
                            <tr> \
                                <th style=\"white-space: nowrap;\">Id window schedule</th> \
                                <th style=\"white-space: nowrap;\">Window identifier</th> \
                                <th style=\"white-space: nowrap;\">Core identifier</th> \
                                <th style=\"white-space: nowrap;\">Partition name</th> \
                                <th style=\"white-space: nowrap;\">State</th> \
                            </tr> \
                        </thead> \
                        <tbody>';

                    }

                    for (i = 0; i < windowschedule_count; i++) {

                        HtmlContent = HtmlContent + '<tr id="idtr_windowchedule' + i + '" ' + ' data-idpartitionschedule ="' + idlinha_ps + '" data-idwindowchedule = "' + i + '" onclick="seleciona_linha_listaon_configura_windowchedule(this)\">';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].id + '</td>';

                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].windowidentifier + '</td>';
                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].coreidentifier + '</td>';

                        indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].idpartitionconfiguration);

                        if (indicepartition >= 0) {
                            HtmlContent = HtmlContent + '<td>' + obj_configuration.partitions_obj[indicepartition].partitionname + '</td>';
                        } else {
                            HtmlContent = HtmlContent + '<td>Não encontrado. Erro na configuração!...</td>';
                        }

                        HtmlContent = HtmlContent + '<td>' + obj_configuration.partitionschedule_obj[idlinha_ps].windowschedule_obj[i].statedesc + '</td>';

                        HtmlContent = HtmlContent + '</tr>';
                    }

                    HtmlContent = HtmlContent + '</tbody></table>';
                    document.getElementById('configura_windowchedule_ihtml').innerHTML = HtmlContent;
                }

                obj_configuration.partitionschedule_obj[idlinha_ps].idlinhaobjwindowschedule = null;
                document.getElementById('tabcontext5_windowchedule_alt').style.display = 'none';
                document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked = false;
                document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value = "";
                document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value = "";

                objtemp = document.getElementById("partition_id_windowchedule_configura_alteracao");
                objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
                objtemp.setAttribute('data-id', 0);

                hash['mensagem'] = 'Efetuou as alterações';
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

            }
        } else {
            hash['mensagem'] = 'Não selecionou nenhuma windowschedule!...';
            mostra_mensagem_box_conf(hash['mensagem']);
            //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        }

    } else {
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem_box_conf(hash['mensagem']);
        //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

}

function alterar_windowschedule_f() {

    let HtmlContent = "";
    let hash = {};
    let expreg = new RegExp("[0-9]{1}(\\.)(\\d{5})$");
    let i = 0;
    let idlinha_partitionschedule = 0;
    let idlinha_ws;
    let alt_value;
    let obj = null;
    let alterou = 0;
    let indicepartition = 0;
    let periodseconds_p = 0;
    let windowstartseconds_p = 0;
    let perioddurationseconds_p = 0;
    let windowdurationseconds_p = 0;
    let windowschedule_conta = 0;
    let soma_windowdurationseconds_p = 0;
    let core_p = 0;
    let partitionconfigurationid_p = 0;

    partitionschedule_count = obj_configuration.partitionschedule_obj.length;

    if (partitionschedule_count < 1) {
        hash['mensagem'] = 'Não existem partitionschedule criadas!...';
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    if (obj_configuration.idlinhaobjpartitionschedule == null) {
        hash['mensagem'] = 'Não selecionou nenhuma partitionschedule!...';
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }

    idlinha_partitionschedule = obj_configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

    if (idlinha_partitionschedule >= 0) {

        if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].idlinhaobjwindowschedule === null) return 0;

        idlinha_ws = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].idlinhaobjwindowschedule.getAttribute('data-idwindowchedule');

        if (idlinha_ws >= 0) {

            alt_value = document.getElementById("windowidentifier_id_windowchedule_configura_alteracao").value;
            if (valida_num_sup_zero(alt_value, 'Window identifier', hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            alt_value = document.getElementById("coreidentifier_id_windowchedule_configura_alteracao").value;
            if (valida_num_sup_zero(alt_value, 'Core identifier', hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }
            core_p = alt_value;

            value = document.getElementById("partition_id_windowchedule_configura_alteracao").getAttribute('data-id');
            if (valida_id_num_dropdown(value, 'Partition', hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }
            partitionconfigurationid_p = value;

            alt_value = document.getElementById("windowstartseconds_id_windowchedule_configura_alteracao").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window start seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }
            windowstartseconds_p = alt_value;
            periodseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].periodseconds;
            if (regra_verifica_windowstartseconds_periodseconds(windowstartseconds_p, periodseconds_p, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            alt_value = document.getElementById("windowdurationseconds_id_windowchedule_configura_alteracao").value;
            if (!expreg.test(alt_value)) {
                hash['mensagem'] = "Window duration seconds: Deve respeitar o formato x.xxxxx!...";
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            windowdurationseconds_p = alt_value;
            perioddurationseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].perioddurationseconds;
            if (regra_verifica_windowdurationseconds_periodseconds(windowdurationseconds_p, windowstartseconds_p, periodseconds_p, perioddurationseconds_p, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            if (valida_boolean(document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked, 'partitionperiodstart', hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            windowschedule_conta = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj.length;
            perioddurationseconds_p = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].perioddurationseconds;

            for (i = 0; i < windowschedule_conta; i++) {

                if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].stateid != APAGAR &&
                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].stateid != LIXO && i != idlinha_ws &&
                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].coreidentifier == core_p) {

                    soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].windowdurationseconds);
                }
            }
            soma_windowdurationseconds_p = soma_windowdurationseconds_p + Math.round(100000 * windowdurationseconds_p);


            if (regra_verifica_windowdurationseconds_total(soma_windowdurationseconds_p, perioddurationseconds_p, idlinha_partitionschedule, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            if (regra_verifica_sobreposicao(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, core_p, windowdurationseconds_p, windowstartseconds_p, false, idlinha_ws, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            if (regra_verifica_cores(obj_configuration.partitionschedule_obj[idlinha_partitionschedule], obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, core_p, false, idlinha_ws, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            if (regra_verifica_cores_partition(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj, obj_configuration.partitions_obj, partitionconfigurationid_p, core_p, false, idlinha_ws, hash) < 1) {
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                return 0;
            }

            alt_value = document.getElementById('windowidentifier_id_windowchedule_configura_alteracao').value;
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowidentifier != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowidentifier = alt_value;
                alterou = 1;
            }

            alt_value = document.getElementById('coreidentifier_id_windowchedule_configura_alteracao').value;
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].coreidentifier != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].coreidentifier = alt_value;
                alterou = 1;
            }

            alt_value = document.getElementById('partition_id_windowchedule_configura_alteracao').getAttribute('data-id');
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].idpartitionconfiguration != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].idpartitionconfiguration = alt_value;
                alterou = 1;
            }

            alt_value = document.getElementById('windowstartseconds_id_windowchedule_configura_alteracao').value;
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowstartseconds != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowstartseconds = alt_value;
                alterou = 1;
            }

            alt_value = document.getElementById('windowdurationseconds_id_windowchedule_configura_alteracao').value;
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowdurationseconds != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowdurationseconds = alt_value;
                alterou = 1;
            }

            alt_value = document.getElementById('partitionperiodstart_id_windowchedule_configura_alteracao').checked.toString();
            if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].partitionperiodstart != alt_value) {
                obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].partitionperiodstart = alt_value;
                alterou = 1;
            }

            if (alterou == 1) {
                if (obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].id > 0) {

                    hash['mensagem'] = 'Efetuou alterações';
                    mostra_mensagem_box_conf(hash['mensagem']);
                    //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].stateid = ALTERAR;
                    obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].statedesc = ALTERARDESC;

                    obj_row = document.getElementById('idtr_windowchedule' + idlinha_ws);
                    count_columns = obj_row.cells.length;

                    if (count_columns > 0) {
                        obj_row.cells[count_columns - 1].innerText = ALTERARDESC;
                        obj_row.cells[1].innerText = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowidentifier;
                        obj_row.cells[2].innerText = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].coreidentifier;

                        indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].idpartitionconfiguration);

                        if (indicepartition >= 0) {
                            obj_row.cells[3].innerText = obj_configuration.partitions_obj[indicepartition].partitionname;
                        }
                    }

                    hash['mensagem'] = 'Efetuou alterações';
                    mostra_mensagem_box_conf(hash['mensagem']);
                    //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

                } else {
                    obj_row = document.getElementById('idtr_windowchedule' + idlinha_ws);
                    count_columns = obj_row.cells.length;

                    if (count_columns > 0) {

                        obj_row.cells[1].innerText = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].windowidentifier;
                        obj_row.cells[2].innerText = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].coreidentifier;

                        indicepartition = devolve_indice_array_partition(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[idlinha_ws].idpartitionconfiguration);

                        if (indicepartition >= 0) {
                            obj_row.cells[3].innerText = obj_configuration.partitions_obj[indicepartition].partitionname;
                        }
                    }

                    hash['mensagem'] = 'Efetuou alterações';
                    mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
                }

            } else {
                hash['mensagem'] = 'Não efetuou alterações. ';
                mostra_mensagem_box_conf(hash['mensagem']);
                //mostra_mensagem(hash, 'form_mensagem_configura_alteracao');

            }
            return 1;
        }
        return 0;
    }
    return 0;
}

//-----------------------------------------------------
function funcvalidacaocampos_configura_alteracao(pf_nome_form) {

    let hash = {};
    hash['mensagem'] = "Não tem informação disponível para poder enviar para alteração!...";
    let alterou = 0;

    if (obj_configuration !== null) {

        let maxarray = obj_configuration.alterado.length;

        for (i = 0; i < maxarray; i++) {
            if (obj_configuration.alterado[i] == 1) {
                alterou = 1;
            }
        }
        if (alterou == 0) {
            hash['mensagem'] = "Não validou ou não efetuou alterações na configuração!...";
            mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
            return 0;
        } else {
            return 1;
        }

    } else {
        mostra_mensagem(hash, 'form_mensagem_configura_alteracao');
        return 0;
    }
}

function funcrecolhecamposenviar_configura_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    let guardaObjserializado = JSON.stringify(obj_configuration);

    pf_form_dados.append('objectoconfiguration', guardaObjserializado);
    pf_form_dados.append('existiu_alteracao', 1);
    pf_form_dados.append('controler', pf_nome_f_php);

    return 1;
}

function functratamententodados_r1_configura_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    //atualiza objecto e layout
    guarda_inf_configura_pesquisa = JSON.parse(pf_resposta.dados);
    configura_alteracao_prenche_form(0);

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 2000
    );

    document.getElementById(pf_botao_ele_submit).disabled = false;

    return 1;
}

function functratamententodados_r0_configura_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_rneg_configura_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function functratamententodados_ind_configura_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

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

function configura_alteracao_f() {
    envia_recebe_gen_universal_POST('form_configura_alteracao', funcvalidacaocampos_configura_alteracao, 'dados_elem_form_configura_alteracao', funcrecolhecamposenviar_configura_alteracao, 'configura_alteracao.php', 'configura_alteracao_b', 'nao_usado', functratamententodados_r1_configura_alteracao, 'form_mensagem_configura_alteracao', ".form_inf_geral", functratamententodados_r0_configura_alteracao, functratamententodados_rneg_configura_alteracao, functratamententodados_ind_configura_alteracao);
}

//------------------------Vai buscar a view pretendida dialog-box --------------------------------------------------------------------------------

function funcvalidacaocampos_obtem_vista(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    return 1;
}

function funcrecolhecamposenviar_obtem_vista(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

    pf_form_dados.append('controler', pf_nome_f_php);
    pf_form_dados.append('vista', pf_nome_gen_elementos_form);

    return 1;
}

function functratamententodados_r1_obtem_vista(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    if (pf_botao_ele_submit != 'sem_botao') {
        document.getElementById(pf_botao_ele_submit).disabled = false;
    }

    document.getElementById(pf_id_inhtml).innerHTML = pf_resposta.inhtml;
    return 1;
}

function functratamententodados_r0_obtem_vista(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    if (pf_botao_ele_submit != 'sem_botao') {
        document.getElementById(pf_botao_ele_submit).disabled = false;
    }

    return 1;
}

function obtem_vista_tratamentoerroscampos(respostaajax) {

    let conctexto = "";
    conctexto = respostaajax.descresultado;

    return conctexto;
}


function functratamententodados_rneg_obtem_vista(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    concatenatexto = obtem_vista_tratamentoerroscampos(pf_resposta);
    document.getElementById(pf_id_mensagem_form).innerHTML = concatenatexto;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    if (pf_botao_ele_submit != 'sem_botao') {
        document.getElementById(pf_botao_ele_submit).disabled = false;
    }

    return 1;
}

function functratamententodados_ind_obtem_vista(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

    document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
    document.getElementById(pf_id_mensagem_form).style.display = "block";

    setTimeout(
        function () {
            document.getElementById(pf_id_mensagem_form).innerHTML = '';
            document.getElementById(pf_id_mensagem_form).style.display = "none";
        }, 5000
    );

    if (pf_botao_ele_submit != 'sem_botao') {
        document.getElementById(pf_botao_ele_submit).disabled = false;
    }
    return 1;
}

function obtem_vista_f(ident_conteudo_vista, conteudo_vista, form_mensagem) {
    envia_recebe_gen_universal_POST('nao usado', funcvalidacaocampos_obtem_vista, ident_conteudo_vista, funcrecolhecamposenviar_obtem_vista, 'get_vista_app.php', 'sem_botao', conteudo_vista, functratamententodados_r1_obtem_vista, form_mensagem, ".form_inf_geral", functratamententodados_r0_obtem_vista, functratamententodados_rneg_obtem_vista, functratamententodados_ind_obtem_vista);
}

function mostra_mensagem_box_conf(mensagem_p) {
    document.getElementById('dialog-box_msg2').showModal();
    document.getElementById('form_mensagem_msg2').innerHTML = mensagem_p;
}



