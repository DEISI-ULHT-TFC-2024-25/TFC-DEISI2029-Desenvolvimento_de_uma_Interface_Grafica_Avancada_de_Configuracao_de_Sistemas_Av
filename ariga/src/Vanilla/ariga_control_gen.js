class controlavistas{

    #dropdowns = {};
    #listas = {};
    #idcontentores = {};

    constructor() {
        this.#dropdowns['formacao_exe_inscricao'] = "";
        this.#listas['lista_formandos_inscricao'] = "";
        this.#idcontentores['formacao_exe_inscricao'] = "";
        this.#idcontentores['lista_formandos_inscricao'] = "";
    }

    setdd(nome, valor){
        this.#dropdowns[nome] = valor;
    }

    getdd(nome){
        if (this.#dropdowns[nome] === 'undefined') return ""; 
        return  this.#dropdowns[nome];
    }

    setlistas(nome, valor){
        this.#listas[nome] = valor;
    }

    getlistas(nome){
        if (this.#listas[nome] === 'undefined') return "";
        return  this.#listas[nome];
    }

    setidcontentores(nome, valor){
        this.#idcontentores[nome] = valor;
    }

    getidcontentores(nome){
        if (this.#idcontentores[nome] === 'undefined') return "";
        return  this.#idcontentores[nome];
    }

    destroiobj(nome){
        let idcontentor;
        idcontentor = this.getidcontentores(nome);
        idcontentor.innerHTML = "";
    }

    criaobjdd(nome){
        let idcontentor;
        idcontentor = this.getidcontentores(nome);
        let conteudohtml = this.getdd(nome);
        idcontentor.innerHTML = conteudohtml;
    }

    criaobjdd_de_lista(idcontentor, ){
        let objcontentor;
        objcontentor = this.getidcontentores(nome);
        let conteudohtml = this.getdd(nome);
        idcontentor.innerHTML = conteudohtml;
    }

    mostra(id){
        document.getElementById(id).style.display = "block";
    }

    naomostra(id){
        document.getElementById(id).style.display = "none";
    }

    mostraHTML(id, valor){
        document.getElementById(id).innerHTML = valor;
    }

    apagaHTML(id){
        document.getElementById(id).style.display = "";
    }

    movepara(id){
        window.location.href = "#" + id; 
    }
    
    inicializaoconteudoperacao(idform){
        document.getElementById(idform).reset();
    }
    
    limpa_data_obj_id(nomeid, valor, drop){
        let objdp = document.getElementById(nomeid);
        if (drop == 1){
            objdp.setAttribute('data-id', valor);
            objdp.options[0].text = "-- Selecionar --";
        }else{
            objdp.value = valor;
        }
    }

    atualiza_manutencao_tabelas_tabcoddesc(cod_dd_para_atualizar_p, lista_activa, lista_total){

        let objbyclass = document.getElementsByClassName(cod_dd_para_atualizar_p);
        let codactivo = "";
        let count = 0;
        let codigodd = "";
        let htmlddheader = "";
        let htmlddfinal = "";
    
        for (count = 0; count < objbyclass.length; count++) {
    
            codactivo = objbyclass[count].getAttribute('data-activo');
            codigodd = objbyclass[count].getAttribute('data-dd');
            
            //alert(codigodd);    
            //alert(codactivo); 

            htmlddheader = this.getdd(codigodd);
            htmlddfinal = htmlddheader;
            if (codactivo == "N"){
                htmlddfinal = htmlddfinal + lista_total + "</select>";
            }else{
                htmlddfinal = htmlddfinal + lista_activa + "</select>";
            }
            //alert(htmlddfinal); 

            objbyclass[count].innerHTML = htmlddfinal;
        }

    }
}

function cria_ficheiro(texto){

    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([texto], { encoding:"UTF-8", type: 'text/plain;charset=UTF-8' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "teste.txt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);

}

var control_local = new controlavistas();
var temp = "";