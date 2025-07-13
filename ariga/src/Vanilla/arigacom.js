function envia_recebe_gen_universal_POST(nome_form, funcvalidacaocampos, nome_gen_elementos_form, funcrecolhecamposenviar, nome_f_php, botao_ele_submit, id_inhtml, functratamententodados_r1, id_mensagem_form, cor_mensagem_form, functratamententodados_r0, functratamententodados_rneg, functratamententodados_ind) {

    var ajax_envio;
    var resposta;
    var form_dados;
    
    ret = funcvalidacaocampos(nome_form);
    if (ret < 1) return;

    form_dados = new FormData();

    if (funcrecolhecamposenviar(nome_gen_elementos_form, nome_f_php, form_dados) < 1) {
        
        return;
    }
    if(botao_ele_submit != 'sem_botao'){
        document.getElementById(botao_ele_submit).disabled = true;
    }
    
    ajax_envio = new XMLHttpRequest();

    ajax_envio.open('POST', 'gencontroler_ariga.php');

    ajax_envio.send(form_dados);

    ajax_envio.onreadystatechange = function () {

        if (ajax_envio.readyState == 4 && ajax_envio.status == 200) {
            
            try {

                resposta = JSON.parse(ajax_envio.responseText);

            } catch (e) {
                alert(ajax_envio.responseText);
                return 0;

            }

            if (resposta.resultado === '1') {

                functratamententodados_r1(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            } else if (resposta.resultado === '0') {

                functratamententodados_r0(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            } else if (resposta.resultado === '-1') {

                functratamententodados_rneg(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            } else {

                functratamententodados_ind(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);
            }
        } else {

            if (ajax_envio.status != 200) {
                alert("Erro no servidor! Status: " + ajax_envio.status + " ReadyState: " + ajax_envio.readyState);
            }
            if(botao_ele_submit != 'sem_botao'){
                document.getElementById(botao_ele_submit).disabled = false;
            }    
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function envia_recebe_gen_universal_POST_TESTE(nome_form, funcvalidacaocampos, nome_gen_elementos_form, funcrecolhecamposenviar, nome_f_php, botao_ele_submit, id_inhtml, functratamententodados_r1, id_mensagem_form, cor_mensagem_form, functratamententodados_r0, functratamententodados_rneg, functratamententodados_ind) {

    var ajax_envio;
    var resposta;
    var form_dados;

    alert('funcvalidacaocampos');
    
    ret = funcvalidacaocampos(nome_form);
    if (ret < 1) return;

    alert('funcrecolhecamposenviar');

    form_dados = new FormData();

    if (funcrecolhecamposenviar(nome_gen_elementos_form, nome_f_php, form_dados) < 1) {
        
        return;
    }

    alert('botao_ele_submit');

    document.getElementById(botao_ele_submit).disabled = true;

    alert('XMLHttpRequest');

    ajax_envio = new XMLHttpRequest();

    ajax_envio.open('POST', 'gencontroler_ariga.php');

    ajax_envio.send(form_dados);

    ajax_envio.onreadystatechange = function () {

        if (ajax_envio.readyState == 4 && ajax_envio.status == 200) {
            
            //resposta = JSON.parse(ajax_envio.responseText);

            alert(ajax_envio.responseText);

            // if (resposta.resultado === '1') {

            //     functratamententodados_r1(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            // } else if (resposta.resultado === '0') {

            //     functratamententodados_r0(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            // } else if (resposta.resultado === '-1') {

            //     functratamententodados_rneg(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);

            // } else {

            //     functratamententodados_ind(resposta, id_inhtml, id_mensagem_form, cor_mensagem_form, botao_ele_submit);
            // }

        } else {

            if (ajax_envio.status != 200) {
                alert("Erro no servidor! Status: " + ajax_envio.status + " ReadyState: " + ajax_envio.readyState);
            }
            document.getElementById(botao_ele_submit).disabled = false;
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
