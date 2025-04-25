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
    obj.style.textDecoration = "underline solid silver 5px";
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

function funcvalidacaocampos_xmlimportar(pf_nome_form) {

    var formValid = document.forms[pf_nome_form].checkValidity();

    document.forms[pf_nome_form].reportValidity();
    if (formValid == false) {
        return 0;
    }

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

function seleciona_linha_listaon_configura(e) {

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
            configura_alteracao_prenche_form(guarda_id_row);
            document.getElementById('configura_alteracao').style.display = "block";
            document.getElementById('form_configura_alteracao').reset();
            document.getElementById("configura_alteracao_b").style.display = "block";

            document.getElementById("configura_criacao_b").style.display = "none";
            document.getElementById('configura_criacao').style.display = "none";
            document.getElementById('form_configura_criacao').reset();

            document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
            estado_configura_criacao = 0;
        }
    }
}

function configura_alteracao_prenche_form(guarda_id_row_p) {

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

    let partitionconfiguration;
    let partitionconfiguration_count = 0;

    let memory;
    let memory_count = 0;

    if (guarda_id_row_p !== "") {
        let idrow = document.getElementById(guarda_id_row_p).getAttribute("data-id");
        if (guarda_inf_configura_pesquisa !== "") {
            xmlstring = guarda_inf_configura_pesquisa[idrow]['oxml'];
            xmlDoc = new DOMParser().parseFromString(xmlstring, "text/xml");
            configuration = xmlDoc.getElementsByTagName("configuration");
            configuration_count = configuration.length;

            if (configuration_count > 0 && configuration_count < 2){

                obj_configuration = null;
                obj_configuration = new configuration_cls();

                obj_configuration.id = configuration[0].getAttribute('id');
                obj_configuration.archname = configuration[0].getElementsByTagName('archname')[0].innerHTML;
                document.getElementById('archname_id_configura_alteracao').setAttribute('value', obj_configuration.archname);

                obj_configuration.bare = configuration[0].getElementsByTagName('bare')[0].innerHTML;
                if (obj_configuration.bare == 'true'){
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
                obj.setAttribute('data-id',  obj_configuration.idtargetboard);

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
                if (obj_configuration.installrtos == 'true'){
                    document.getElementById('installrtos_id_configura_alteracao').setAttribute('checked', 'checked');
                }

                obj_configuration.posixrtems5 = configuration[0].getElementsByTagName('posixrtems5')[0].innerHTML;
                if (obj_configuration.posixrtems5 == 'true'){
                    document.getElementById('posixrtems5_id_configura_alteracao').setAttribute('checked', 'checked');
                }

                obj_configuration.rtems48i = configuration[0].getElementsByTagName('rtems48i')[0].innerHTML;
                if (obj_configuration.rtems48i == 'true'){
                    document.getElementById('rtems48i_id_configura_alteracao').setAttribute('checked', 'checked');
                }

                obj_configuration.rtems5 = configuration[0].getElementsByTagName('rtems5')[0].innerHTML;
                if (obj_configuration.rtems5 == 'true'){
                    document.getElementById('rtems5_id_configura_alteracao').setAttribute('checked', 'checked');
                }

            }

            arinc653module = xmlDoc.getElementsByTagName("arinc653module");
            arinc653module_count = arinc653module.length;

            if (arinc653module_count > 0 && arinc653module_count < 2){
                obj_configuration.arinc653module_obj.id = arinc653module[0].getAttribute('id');
                obj_configuration.arinc653module_obj.idconfiguration = arinc653module[0].getAttribute('idconfiguration');
                obj_configuration.arinc653module_obj.modulename = arinc653module[0].getElementsByTagName('modulename')[0].innerHTML;
                document.getElementById('modulename_id_configura_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.modulename);

                obj_configuration.arinc653module_obj.xmlnsxsi = arinc653module[0].getElementsByTagName('xmlnsxsi')[0].innerHTML;
                document.getElementById('xmlnsxsi_id_configura_alteracao').setAttribute('value', obj_configuration.arinc653module_obj.xmlnsxsi);
            }
            
            airconfiguration = xmlDoc.getElementsByTagName("airconfiguration");
            airconfiguration_count = airconfiguration.length;


            if (airconfiguration_count > 0 && airconfiguration_count < 2){
                obj_configuration.airconfiguration_obj.id = airconfiguration[0].getAttribute('id');
                obj_configuration.airconfiguration_obj.idarinc653module = airconfiguration[0].getAttribute('idarinc653module');
                obj_configuration.airconfiguration_obj.requiredcores = airconfiguration[0].getElementsByTagName('requiredcores')[0].innerHTML;
                document.getElementById('requiredcores_id_configura_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.requiredcores);

                obj_configuration.airconfiguration_obj.tickspersecond = airconfiguration[0].getElementsByTagName('tickspersecond')[0].innerHTML;
                document.getElementById('tickspersecond_id_configura_alteracao').setAttribute('value', obj_configuration.airconfiguration_obj.tickspersecond);
            }

            moduleschedule = xmlDoc.getElementsByTagName("moduleschedule");
            moduleschedule_count = moduleschedule.length;

            if (moduleschedule_count > 0 && moduleschedule_count < 2){

                obj_configuration.moduleschedule_obj.id = moduleschedule[0].getAttribute('id');
                obj_configuration.moduleschedule_obj.idarinc653module = moduleschedule[0].getAttribute('idarinc653module');

                obj_configuration.moduleschedule_obj.schedulename = moduleschedule[0].getElementsByTagName('schedulename')[0].innerHTML;
                document.getElementById('schedulename_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.schedulename);

                obj_configuration.moduleschedule_obj.scheduleidentifier = moduleschedule[0].getElementsByTagName('scheduleidentifier')[0].innerHTML;
                document.getElementById('scheduleidentifier_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.scheduleidentifier);

                obj_configuration.moduleschedule_obj.majorframeseconds = moduleschedule[0].getElementsByTagName('majorframeseconds')[0].innerHTML;
                document.getElementById('majorframeseconds_id_configura_alteracao').setAttribute('value', obj_configuration.moduleschedule_obj.majorframeseconds);

                obj_configuration.moduleschedule_obj.initialmoduleschedule = moduleschedule[0].getElementsByTagName('initialmoduleschedule')[0].innerHTML;
                if (obj_configuration.moduleschedule_obj.initialmoduleschedule == 'true'){
                    document.getElementById('initialmodulesched_id_configura_alteracao').setAttribute('checked', 'checked');
                }

            }

            partitions = xmlDoc.getElementsByTagName("partitions");
            partitions_count = partitions.length;

            partitionconfiguration = xmlDoc.getElementsByTagName("partitionconfiguration");
            partitionconfiguration_count = partitionconfiguration.length;
            
            memory = xmlDoc.getElementsByTagName("memory");
            memory_count = memory.length;

            if (partitions_count > 0){

                partitions_ihtml = '<table class="styled-table" style="width:100%">';
                partitions_ihtml = partitions_ihtml + '<thead> \
                    <tr> \
                        <th style=\"white-space: nowrap;\">Id</th> \
                        <th style=\"white-space: nowrap;\">Partition name</th> \
                        <th style=\"white-space: nowrap;\">Partition identifier</th> \
                    </tr> \
                </thead> \
                <tbody>';

                for(i = 0; i < partitions_count; i++){

                    obj_configuration.partitions_obj[i] = new partitions_cls(); 
                    obj_configuration.partitions_obj[i].id = partitions[i].getAttribute('id');
                    obj_configuration.partitions_obj[i].idmoduleschedule = partitions[i].getAttribute('idmoduleschedule');
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
                    partitions_ihtml = partitions_ihtml + '</tr>';

                    if (partitionconfiguration_count > 0){
                        for(j = 0; j < partitionconfiguration_count; j++){

                            if (partitionconfiguration[j].getAttribute('idpartition') == obj_configuration.partitions_obj[i].id){
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.id = partitionconfiguration[j].getAttribute('id');
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.idpartition = partitionconfiguration[j].getAttribute('idpartition');
    
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.cores = partitionconfiguration[j].getElementsByTagName('cores')[0].innerHTML;
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.cache = partitionconfiguration[j].getElementsByTagName('cache')[0].innerHTML;
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.libs = partitionconfiguration[j].getElementsByTagName('libs')[0].innerHTML;
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.personality = partitionconfiguration[j].getElementsByTagName('personality')[0].innerHTML;
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.devices = partitionconfiguration[j].getElementsByTagName('devices')[0].innerHTML;
                                obj_configuration.partitions_obj[i].partitionconfiguration_obj.permissions = partitionconfiguration[j].getElementsByTagName('permissions')[0].innerHTML;

                                if (memory_count > 0){
                                    for(l = 0; l < memory_count; l++){
            
                                        if (memory[l].getAttribute('idpartitionconfiguration') == obj_configuration.partitions_obj[i].partitionconfiguration_obj.id){
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

            }

            partitionschedule = xmlDoc.getElementsByTagName("partitionschedule");
            partitionschedule_count = partitionschedule.length;
            
            if (partitionschedule_count > 0){

                partitionschedule_ihtml = '<table class="styled-table" style="width:100%">';
                partitionschedule_ihtml = partitionschedule_ihtml + '<thead> \
                    <tr> \
                        <th style=\"white-space: nowrap;\">Id</th> \
                        <th style=\"white-space: nowrap;\">Period duration seconds</th> \
                        <th style=\"white-space: nowrap;\">Period seconds</th> \
                    </tr> \
                </thead> \
                <tbody>';

                for(i = 0; i < partitionschedule_count; i++){

                    obj_configuration.partitionschedule_obj[i] = new partitionschedule_cls(); 
                    obj_configuration.partitionschedule_obj[i].id = partitionschedule[i].getAttribute('id');
                    obj_configuration.partitionschedule_obj[i].idmoduleschedule = partitionschedule[i].getAttribute('idmoduleschedule');
                    obj_configuration.partitionschedule_obj[i].perioddurationseconds = partitionschedule[i].getElementsByTagName('perioddurationseconds')[0].innerHTML;
                    obj_configuration.partitionschedule_obj[i].periodseconds = partitionschedule[i].getElementsByTagName('periodseconds')[0].innerHTML;

                    partitionschedule_ihtml = partitionschedule_ihtml + '<tr id="idtr_partitionschedule' + i + '" ' + ' data-idpartitionschedule ="' + i + '" onclick="seleciona_linha_listaon_configura_partitionschedule(this)\">';
                    partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].id + '</td>';
                    partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].perioddurationseconds + '</td>';
                    partitionschedule_ihtml = partitionschedule_ihtml + '<td>' + obj_configuration.partitionschedule_obj[i].periodseconds + '</td>';
                    partitionschedule_ihtml = partitionschedule_ihtml + '</tr>';

                }

                partitionschedule_ihtml = partitionschedule_ihtml + '</tbody></table>';

                document.getElementById('configura_partitionschedule_ihtml').innerHTML = partitionschedule_ihtml;

            }



            //alert(x[0].getAttribute('id'));
            //alert(x[0].getElementsByTagName('archname')[0].innerHTML);
        }
    };
}

function seleciona_linha_listaon_configura_partitions(e){

    let idlinha = "";
    let objtemp;

    if (e !== null) {
        if (obj_configuration.idlinhaobjparticao === e){ 
        
            objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
            objtemp.options[objtemp.selectedIndex].text = "-- Selecionar --";
            objtemp.setAttribute('data-id', 0);

            document.getElementById('entrypoint_id_partitions_configura_alteracao').setAttribute('value', "");
            document.getElementById('partitionname_id_partitions_configura_alteracao').setAttribute('value', "");
            document.getElementById('partitionidentifier_id_partitions_configura_alteracao').setAttribute('value', "");
            document.getElementById('systempartition_id_partitions_configura_alteracao').setAttribute('value', "");

            obj_configuration.idlinhaobjparticao = null;
            e.classList.remove('active-row');
            document.getElementById('tabcontext4_partitions_alt').style.display = 'none';
            
        }else{

            idlinha = e.getAttribute('data-idpartitions');

            if (obj_configuration.idlinhaobjparticao !== null) {
                obj_configuration.idlinhaobjparticao.classList.remove('active-row');
            }
        
            objtemp = document.getElementById("criticality_id_partitions_configura_alteracao");
            objtemp.options[objtemp.selectedIndex].text = "-- " + obj_configuration.partitions_obj[idlinha].criticalitydesc + " --";
            objtemp.setAttribute('data-id', obj_configuration.partitions_obj[idlinha].criticality);

            document.getElementById('entrypoint_id_partitions_configura_alteracao').setAttribute('value', obj_configuration.partitions_obj[idlinha].entrypoint);
            document.getElementById('partitionname_id_partitions_configura_alteracao').setAttribute('value', obj_configuration.partitions_obj[idlinha].partitionname);
            document.getElementById('partitionidentifier_id_partitions_configura_alteracao').setAttribute('value', obj_configuration.partitions_obj[idlinha].partitionidentifier);
            document.getElementById('systempartition_id_partitions_configura_alteracao').setAttribute('value', obj_configuration.partitions_obj[idlinha].systempartition);

            obj_configuration.idlinhaobjparticao = e;
            e.classList.add('active-row');
            document.getElementById('tabcontext4_partitions_alt').style.display = 'block';
        }
    }
}


// function seleciona_linha_listaon_configura(e) {

//     if (e !== null) {
//         if (guarda_id_obj === e) {
//             e.classList.remove('active-row');

//             document.getElementById('configura_alteracao').style.display = "none";
//             document.getElementById('form_configura_alteracao').reset();
//             document.getElementById("configura_alteracao_b").style.display = "none";
//             guarda_id_obj = null;
//             guarda_id_row = "";

//         } else {

//             e.classList.add('active-row');

//             if (guarda_id_obj !== null) {
//                 guarda_id_obj.classList.remove('active-row');
//             }
//             guarda_id_obj = e;
//             guarda_id_row = e.id;
//             configura_alteracao_prenche_form(guarda_id_row);
//             document.getElementById('configura_alteracao').style.display = "block";
//             document.getElementById('form_configura_alteracao').reset();
//             document.getElementById("configura_alteracao_b").style.display = "block";

//             document.getElementById("configura_criacao_b").style.display = "none";
//             document.getElementById('configura_criacao').style.display = "none";
//             document.getElementById('form_configura_criacao').reset();

//             document.getElementById("nova_configuracao_id").innerText = "Mostra - Inserir nova configuração";
//             estado_configura_criacao = 0;
//         }
//     }
// }






// //Criação utilizador

// function gestaoutilizadores_abrir_criacao_f() {
//     if (estado_gestao_utilizadores_criacao == 0) {
//         document.getElementById("gestaoutilizadores_criacao_b").style.display = "block";
//         document.getElementById('gestaoutilizadores_criacao').style.display = "block";
//         document.getElementById("novo_registo_id").innerText = "Esconde - Inserir novo utilizador";
//         estado_gestao_utilizadores_criacao = 1;
//     } else {
//         document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
//         document.getElementById('gestaoutilizadores_criacao').style.display = "none";
//         document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
//         estado_gestao_utilizadores_criacao = 0;
//     }

//     document.getElementById('form_gestaoutilizadores_criacao').reset();
//     document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
//     document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
//     document.getElementById('form_gestaoutilizadores_alteracao').reset();

//     if (guarda_id_obj !== null) {
//         guarda_id_obj.classList.remove('active-row');
//         guarda_id_obj = null;
//         guarda_id_row = "";
//     }
// }

// function funcvalidacaocampos_gestaoutilizadores_criacao(pf_nome_form) {

//     var formValid = document.forms[pf_nome_form].checkValidity();

//     document.forms[pf_nome_form].reportValidity();
//     if (formValid == false) {
//         return 0;
//     }

//     return 1;
// }

// function funcrecolhecamposenviar_gestaoutilizadores_criacao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

//     var form_element_form_base = document.getElementsByClassName(pf_nome_gen_elementos_form);

//     for (var count = 0; count < form_element_form_base.length; count++) {
//         pf_form_dados.append(form_element_form_base[count].name, form_element_form_base[count].value);
//     }

//     pf_form_dados.append('controler', pf_nome_f_php);

//     return 1;
// }

// function functratamententodados_r1_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById("emailutilizador_id_gu").setAttribute('value', pf_resposta.codutilizador_pesq);
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     document.getElementById('form_gestaoutilizadores_criacao').reset();

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";

//             document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = '';
//             document.getElementById("gestaoutilizadores_criacao_b").style.display = "none";
//             document.getElementById('gestaoutilizadores_criacao').style.display = "none";
//             document.getElementById("novo_registo_id").innerText = "Mostra - Inserir novo utilizador";
//             estado_gestao_utilizadores_criacao = 0;
//             window.location.href = "#" + "gestaoutilizadores_pesquisa";



//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_r0_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_rneg_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_ind_gestaoutilizadores_criacao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;
//     return 1;

// }

// function gestaoutilizadores_criacao_f() {
//     envia_recebe_gen_universal_POST('form_gestaoutilizadores_criacao', funcvalidacaocampos_gestaoutilizadores_criacao, 'dados_elem_form_gestaoutilizadores_criacao', funcrecolhecamposenviar_gestaoutilizadores_criacao, 'gestaoutilizadores_criacao.php', 'gestaoutilizadores_criacao_b', 'nao_usado', functratamententodados_r1_gestaoutilizadores_criacao, 'form_mensagem_gestaoutilizadores_criacao', ".form_inf_geral", functratamententodados_r0_gestaoutilizadores_criacao, functratamententodados_rneg_gestaoutilizadores_criacao, functratamententodados_ind_gestaoutilizadores_criacao);
// }

// //Alteração utilizador

// campos_alterados = {};

// function verifica_alteracoes_campos_gestaoutilizadores(hash_p) {

//     let valor_pesq = "";
//     let valor_alt = "";
//     let existiu_alteracao = 0;
//     let indice = 0;
//     let idobj = null;
//     let idrow;

//     if (guarda_id_row !== "") {

//         idrow = document.getElementById(guarda_id_row).getAttribute("data-id");

//         if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

//             valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['onome'];
//             idobj = document.getElementById("nome_id_alt_gu");
//             valor_alt = idobj.value;
//             if (valor_alt != valor_pesq) {

//                 if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

//                     if (valida_texto(idobj.value, 'Nome', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
//                         campos_alterados = {};
//                         return 0;
//                     } else {
//                         existiu_alteracao++;

//                         campos_alterados['nome_alt_gu'] = valor_alt;
//                     }
//                 }
//             }

//             valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oactivo'];
//             idobj = document.getElementById("activo_id_alt_gu");
//             valor_alt = idobj.getAttribute('data-id');
//             if (valor_alt != valor_pesq) {
//                 if (idobj.getAttribute('data-required') == 'S') {

//                     if (valida_id_s_n_dropdown(valor_alt, 'Activo', hash_p) < 1) {
//                         campos_alterados = {};
//                         return 0;
//                     } else {
//                         existiu_alteracao++;
//                         campos_alterados['activo_alt_gu'] = valor_alt;
//                     }
//                 }
//             }

//             valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oidperfilutilizador'];
//             idobj = document.getElementById("perfil_id_alt_gu");
//             valor_alt = idobj.getAttribute('data-id');
//             if (valor_alt != valor_pesq) {
//                 if (idobj.getAttribute('data-required') == 'S') {

//                     if (valida_id_num_dropdown(valor_alt, 'Perfil', hash_p) < 1) {
//                         campos_alterados = {};
//                         return 0;
//                     } else {
//                         existiu_alteracao++;
//                         campos_alterados['perfil_alt_gu'] = valor_alt;
//                     }
//                 }
//             }

//             if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

//                 valor_pesq = guarda_inf_gestaoutilizadores_pesquisa[idrow]['ocodutilizador'];
//                 idobj = document.getElementById("emailutilizador_id_alt_gu");
//                 valor_alt = idobj.value;
//                 if (valor_alt != valor_pesq) {

//                     if (idobj.getAttribute('data-required') == 'S' || idobj.getAttribute('minlength') > 0) {

//                         if (valida_texto(idobj.value, 'email', ".+@ariga\.com", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
//                             campos_alterados = {};
//                             return 0;
//                         } else {
//                             existiu_alteracao++;

//                             campos_alterados['emailutilizador_alt_gu'] = valor_alt;
//                         }
//                     }
//                 }
//             }

//             if (guarda_inf_gestaoutilizadores_pesquisa !== "") {

//                 idobj = document.getElementById("codigoacesso_id_alt_gu");
//                 valor_alt = idobj.value;
//                 campos_alterados['so_pws_alt_gu'] = 0;

//                 if (valor_alt != "") {

//                     if (idobj.getAttribute('minlength') > 0) {

//                         if (valida_texto(idobj.value, 'Password', "", 'S', idobj.getAttribute('minlength'), idobj.getAttribute('maxlength'), hash_p) < 1) {
//                             campos_alterados = {};
//                             return 0;
//                         } else {
//                             existiu_alteracao++;
//                             if (existiu_alteracao == 1) {
//                                 campos_alterados['so_pws_alt_gu'] = 1;
//                             }
//                             campos_alterados['codigoacesso_alt_gu'] = valor_alt;
//                         }
//                     }
//                 }
//             }

//         }

//         if (existiu_alteracao > 0) {
//             campos_alterados['existiu_alteracao_alt_gu'] = existiu_alteracao;
//             if (idrow >= 0) {
//                 campos_alterados['idutilizador_alt_gu'] = guarda_inf_gestaoutilizadores_pesquisa[idrow]['oidutilizador'];
//                 campos_alterados['emailutilizador_pesq_gu'] = guarda_inf_gestaoutilizadores_pesquisa[idrow]['ocodutilizador'];
//             }
//             return 1
//         } else {
//             hash_p['mensagem'] = "Não efetuou nenhuma alteração";
//             return 0;
//         }
//     } else {
//         hash_p['mensagem'] = "Não selecionou nenhuma linha válida";
//     }
//     return 1;
// }

// function funcvalidacaocampos_gestaoutilizadores_alteracao(pf_nome_form) {

//     let hash = {};
//     hash['mensagem'] = "";




//     if (verifica_alteracoes_campos_gestaoutilizadores(hash) < 1) {

//         document.getElementById("form_mensagem_gestaoutilizadores_alteracao").innerHTML = hash['mensagem'];
//         document.getElementById("form_mensagem_gestaoutilizadores_alteracao").style.display = "block";

//         setTimeout(
//             function () {
//                 document.getElementById("form_mensagem_gestaoutilizadores_alteracao").innerHTML = '';
//                 document.getElementById("form_mensagem_gestaoutilizadores_alteracao").style.display = "none";
//             }, 5000
//         );

//         return 0;
//     }
//     return 1;
// }

// function funcrecolhecamposenviar_gestaoutilizadores_alteracao(pf_nome_gen_elementos_form, pf_nome_f_php, pf_form_dados) {

//     for (var key in campos_alterados) {
//         pf_form_dados.append(key, campos_alterados[key]);
//     }

//     pf_form_dados.append('controler', pf_nome_f_php);

//     return 1;
// }

// function functratamententodados_r1_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     limpa_data_obj_id("activo_id_alt_gu", 0, 1);
//     limpa_data_obj_id("perfil_id_alt_gu", 0, 1);
//     document.getElementById('form_gestaoutilizadores_alteracao').reset();
//     limpa_data_obj_id("nome_id_alt_gu", "", 0);
//     limpa_data_obj_id("emailutilizador_id_alt_gu", "", 0);
//     limpa_data_obj_id("codigoacesso_id_alt_gu", "", 0);

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";

//             document.getElementById('gestaoutilizadores_pesquisa_ihtml').innerHTML = '';
//             document.getElementById("gestaoutilizadores_alteracao_b").style.display = "none";
//             document.getElementById('gestaoutilizadores_alteracao').style.display = "none";
//             window.location.href = "#" + "gestaoutilizadores_pesquisa";

//         }, 2000
//     );
//     document.getElementById("emailutilizador_id_gu").value = pf_resposta.codutilizador_pesq;
//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_r0_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_rneg_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;

//     return 1;
// }

// function functratamententodados_ind_gestaoutilizadores_alteracao(pf_resposta, pf_id_inhtml, pf_id_mensagem_form, pf_cor_mensagem_form, pf_botao_ele_submit) {

//     document.getElementById(pf_id_mensagem_form).innerHTML = pf_resposta.descresultado;
//     document.getElementById(pf_id_mensagem_form).style.display = "block";

//     setTimeout(
//         function () {
//             document.getElementById(pf_id_mensagem_form).innerHTML = '';
//             document.getElementById(pf_id_mensagem_form).style.display = "none";
//         }, 5000
//     );

//     document.getElementById(pf_botao_ele_submit).disabled = false;
//     return 1;

// }

// function gestaoutilizadores_alteracao_f() {
//     envia_recebe_gen_universal_POST('form_gestaoutilizadores_alteracao', funcvalidacaocampos_gestaoutilizadores_alteracao, 'dados_elem_form_gestaoutilizadores_alteracao', funcrecolhecamposenviar_gestaoutilizadores_alteracao, 'gestaoutilizadores_alteracao.php', 'gestaoutilizadores_alteracao_b', 'nao_usado', functratamententodados_r1_gestaoutilizadores_alteracao, 'form_mensagem_gestaoutilizadores_alteracao', ".form_inf_geral", functratamententodados_r0_gestaoutilizadores_alteracao, functratamententodados_rneg_gestaoutilizadores_alteracao, functratamententodados_ind_gestaoutilizadores_alteracao);
// }
