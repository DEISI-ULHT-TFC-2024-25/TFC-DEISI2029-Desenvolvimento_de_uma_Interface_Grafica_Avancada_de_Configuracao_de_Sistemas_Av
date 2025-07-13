class controla_tabs {

    #tab_context_activa = "";
    #tabactiva = "";
    #muntab = 3;
    #numtabactiva = -1;

    constructor() {
        this.#tab_context_activa = "tabcontext0";
        this.#tabactiva = "tab0";
        this.#numtabactiva = 0;
    }

    set_tab_activa(numtab) {
        this.#tab_context_activa = "tabcontext" + numtab;
        this.#tabactiva = "tab" + numtab;;
        this.#numtabactiva = numtab;
    }

    get_num_tab_activa() {
        return this.#numtabactiva;
    }

    seleciona_tab_alt(objid) {
        let idtabcontext = document.getElementById(objid).getAttribute("data-tab");

        if (obj_configuration.tabactiva[idtabcontext] == 0) {
            alert('Deve preencher dados anteriores e guardar, para poder ter acesso a esta zona da configuração!...')
            return;
        }

        document.getElementById(this.#tab_context_activa).style.display = "none";
        document.getElementById("tabcontext" + idtabcontext).style.display = "block";

        document.getElementById(this.#tabactiva).classList.remove("tabactiva");
        document.getElementById(this.#tabactiva).classList.add("tabinactiva");
        document.getElementById(objid).classList.remove("tabinactiva");
        document.getElementById(objid).classList.add("tabactiva");

        this.#tab_context_activa = "tabcontext" + idtabcontext;
        this.#tabactiva = objid;

    }

    seleciona_multiselect(nameobj, listaIDs, listanames) {

        if (listaIDs == "") return 0;

        let arraycheckboxs = document.getElementsByName(nameobj + '_chk');
        let len_arraycheckboxs = arraycheckboxs.length;
        if (len_arraycheckboxs < 1) return 0;

        const myArrayIDs = listaIDs.split(";");
        let len_myArrayIDs = myArrayIDs.length;
        if (len_myArrayIDs < 1) return 0;

        document.getElementById(nameobj + '_label').value = listanames;

        let atributoid = "";
        let j = 0;

        for (i = 0; i < len_arraycheckboxs; i++) {

            atributoid = arraycheckboxs[i].getAttribute('data-id');


            for (j = 0; j < len_myArrayIDs; j++) {

                if (myArrayIDs[j] == atributoid) {
                    arraycheckboxs[i].setAttribute('checked', 'checked');
                    arraycheckboxs[i].checked = true;
                }

            }
        }

        return 1;

    }

    atualiza_atributo_multiselecao_datalabel(idmultiselecao) {

        let arraycheckboxs = document.getElementsByName(idmultiselecao + '_chk');
        let len_arraycheckboxs = arraycheckboxs.length;
        let listanames = "";

        if (len_arraycheckboxs < 1) return 0;

        for (i = 0; i < len_arraycheckboxs; i++) {
            if (arraycheckboxs[i].checked == true) {
                if (listanames != "") {
                    listanames = listanames + ";" + arraycheckboxs[i].value;
                } else {
                    listanames = arraycheckboxs[i].value;
                }
            }
        }

        document.getElementById(idmultiselecao + '_label').value = listanames;

    }

    obtem_labels_multiselecao(idmultiselecao) {

        return document.getElementById(idmultiselecao + '_label').value;
    }


    obtem_ids_multiselecao(idmultiselecao) {

        let arraycheckboxs = document.getElementsByName(idmultiselecao + '_chk');
        let len_arraycheckboxs = arraycheckboxs.length;
        let listaids = "";

        if (len_arraycheckboxs < 1) return "";

        for (i = 0; i < len_arraycheckboxs; i++) {
            if (arraycheckboxs[i].checked == true) {
                if (listaids != "") {
                    listaids = listaids + ";" + arraycheckboxs[i].getAttribute('data-id');
                } else {
                    listaids = arraycheckboxs[i].getAttribute('data-id');;
                }
            }
        }

        return listaids;

    }

    reset_multiselect(nameobj) {

        let arraycheckboxs = document.getElementsByName(nameobj + '_chk');
        let len_arraycheckboxs = arraycheckboxs.length;
        if (len_arraycheckboxs < 1) return 0;

        document.getElementById(nameobj + '_label').value = '';

        for (i = 0; i < len_arraycheckboxs; i++) {
            arraycheckboxs[i].removeAttribute('checked');
            arraycheckboxs[i].checked = false;
        }

        return 1;
    }

    cria_opcoesdd_partition(partitionobj) {

        let ihtmlretorno = "";
        let count = 0;
        let id;
        let descricao;

        if (partitionobj !== null) {

            count = partitionobj.length;

            for (i = 0; i < count; i++) {
                id = partitionobj[i].partitionconfiguration_obj.id;
                descricao = partitionobj[i].partitionname;
                ihtmlretorno = ihtmlretorno + '<option value="' + id + '" >' + descricao + '</option>';
            }
        }

        return ihtmlretorno;

    }

    gera_dropdown_partition(partitionobj, nomedropdown, id, classe, obrigatorio) {
        let html = "";
        let opcoesdd = "";

        opcoesdd = this.cria_opcoesdd_partition(partitionobj);

        html = '<select name="' + nomedropdown + '" class="' + classe + '"';

        if (id != "") {
            html = html + ' id="' + id + '" data-id="" onchange="atualiza_atributo_drop_data_id(this.id);"';
        }

        if (obrigatorio == 'S') {
            html = html + ' required data-required="S">';
        } else {
            html = html + ' data-required="N">';
        }
        html = html + '<option value="0">-- Selecionar --</option>';

        html = html + opcoesdd;
        html = html + '</select>';

        return html;
    }

    atualiza_dropdown_partition(cod_dd_para_atualizar_p, partobj) {

        let objbyclass = document.getElementsByClassName(cod_dd_para_atualizar_p);
        let id = "";
        let count = 0;
        let classe = "";
        let nomedropdown = "";
        let htmlddfinal = "";
        let obrigatorio = "";

        for (count = 0; count < objbyclass.length; count++) {

            id = objbyclass[count].getAttribute('data-dd');
            classe = objbyclass[count].getAttribute('data-dd-class');
            nomedropdown = objbyclass[count].getAttribute('data-dd-name');
            obrigatorio = objbyclass[count].getAttribute('data-obrigatorio');

            htmlddfinal = this.gera_dropdown_partition(partobj, nomedropdown, id, classe, obrigatorio)

            objbyclass[count].innerHTML = htmlddfinal;
        }
    }

    atualiza_dropdown_partition_box(cod_dd_para_atualizar_p, partobj) {

        let obj = document.getElementById(cod_dd_para_atualizar_p);
        let id = "";
        let count = 0;
        let classe = "";
        let nomedropdown = "";
        let htmlddfinal = "";
        let obrigatorio = "";

        if (obj !== null) {

            id = obj.getAttribute('data-dd');
            classe = obj.getAttribute('data-dd-class');
            nomedropdown = obj.getAttribute('data-dd-name');
            obrigatorio = obj.getAttribute('data-obrigatorio');

            htmlddfinal = this.gera_dropdown_partition(partobj, nomedropdown, id, classe, obrigatorio)

            obj.innerHTML = htmlddfinal;
        }
    }

    atribui_value(obj) {

        if (obj.checked) {
            obj.value = 'true';
        } else {
            obj.value = 'false';
        }
    }

    obtem_window_identifier(configuration){

        let i = 0;
        let windowidentifier = new Array();

        let idlinha_partitionschedule = configuration.idlinhaobjpartitionschedule.getAttribute('data-idpartitionschedule');

        let windowschedule_conta = obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj.length; 

        if (windowschedule_conta == 0) return 1;

        for(i = 0; i < windowschedule_conta; i++){
           windowidentifier[i] =  Number(obj_configuration.partitionschedule_obj[idlinha_partitionschedule].windowschedule_obj[i].windowidentifier); 
        }

        windowidentifier.sort();


        let ult_window_identifier_inserido = windowidentifier[windowschedule_conta - 1];

        return  Number(ult_window_identifier_inserido) + 1;

    }

    obtem_window_identifier_from_visualiza(idps){

        let i = 0;
        let windowidentifier = new Array();

        let windowschedule_conta = obj_configuration.partitionschedule_obj[idps].windowschedule_obj.length; 

        if (windowschedule_conta == 0) return 1;

        for(i = 0; i < windowschedule_conta; i++){
           windowidentifier[i] =  Number(obj_configuration.partitionschedule_obj[idps].windowschedule_obj[i].windowidentifier); 
        }

        windowidentifier.sort();


        let ult_window_identifier_inserido = windowidentifier[windowschedule_conta - 1];

        return  Number(ult_window_identifier_inserido) + 1;

    }

    obtem_window_identifier_ps(configuration){

        let i = 0;
        let windowidentifier = new Array();

        let partitionschedule_conta = obj_configuration.partitionschedule_obj.length; 

        if (partitionschedule_conta == 0) return 1;

        for(i = 0; i < partitionschedule_conta; i++){
           windowidentifier[i] =  Number(obj_configuration.partitionschedule_obj[i].windowconfiguration_obj.windowidentifier); 
        }

        windowidentifier.sort();

        let ult_window_identifier_inserido =  windowidentifier[partitionschedule_conta - 1];

        return Number(ult_window_identifier_inserido) + 1;

    }

     obtem_partition_identifier(configuration){

        let i = 0;
        let partitionidentifier = new Array();

        let partition_conta = obj_configuration.partitions_obj.length; 

        if (partition_conta == 0) return 1;

        for(i = 0; i < partition_conta; i++){
           partitionidentifier[i] =  Number(obj_configuration.partitions_obj[i].partitionidentifier); 
        }

        partitionidentifier.sort();

        let ult_partition_identifier_inserido =  partitionidentifier[partition_conta - 1];

        return Number(ult_partition_identifier_inserido) + 1;
    }
}

class configuration_cls {

    archname;
    bare;
    iddebugmonitor;
    iddebugmonitordesc;
    idtargetboard;
    idtargetboarddesc;
    idfpu;
    idfpudesc;
    idarchitecturetype;
    idarchitecturetypedesc;
    installrtos;
    posixrtems5;
    rtems48i;
    rtems5;
    id;
    arinc653module_obj;
    airconfiguration_obj;
    moduleschedule_obj;
    partitionschedule_obj;
    partitions_obj;
    idlinhaobjparticao;
    idlinhaobjpartitionschedule;
    tabactiva;
    alterado;

    constructor() {
        this.archname = "";
        this.bare = "";
        this.iddebugmonitor = 0;
        this.iddebugmonitordesc = "";
        this.idtargetboard = 0;
        this.idtargetboarddesc = "";;
        this.idfpu = 0;
        this.idfpudesc = "";
        this.idarchitecturetype = 0;
        this.idarchitecturetypedesc = 0;
        this.installrtos = "";
        this.posixrtems5 = "";
        this.rtems48i = "";
        this.rtems5 = "";
        this.id = 0;
        this.arinc653module_obj = new arinc653module_cls();
        this.airconfiguration_obj = new airconfiguration_cls();
        this.moduleschedule_obj = new moduleschedule_cls();
        this.partitionschedule_obj = new Array();
        this.partitions_obj = new Array();
        this.idlinhaobjparticao = null;
        this.idlinhaobjpartitionschedule = null;
        this.tabactiva = [0, 0, 0, 0, 0, 0];
        this.alterado = [0, 0, 0, 0, 0, 0];
    }
}

class arinc653module_cls {

    modulename;
    xmlnsxsi;
    id;
    idconfiguration;

    constructor() {
        this.modulename = "";
        this.xmlnsxsi = "";
        this.id = 0;
        this.idconfiguration = 0;
    }
}

class airconfiguration_cls {

    requiredcores;
    tickspersecond;
    id;
    idarinc653module;

    constructor() {
        this.requiredcores = "";
        this.tickspersecond = "";
        this.id = 0;
        this.idarinc653module = 0;
    }
}

class moduleschedule_cls {

    schedulename;
    scheduleidentifier;
    majorframeseconds;
    initialmoduleschedule;
    id;
    idarinc653module;

    constructor() {
        this.requiredcores = "";
        this.scheduleidentifier = "";
        this.majorframeseconds = "";
        this.initialmoduleschedule = "";
        this.id = 0;
        this.idarinc653module = 0;
    }
}

class partitionschedule_cls {

    perioddurationseconds;
    periodseconds;
    id;
    idmoduleschedule;
    windowschedule_obj;
    windowconfiguration_obj;
    idlinhaobjwindowschedule;
    stateid;
    statedesc;

    constructor() {
        this.perioddurationseconds = "";
        this.periodseconds = "";
        this.id = 0;
        this.idmoduleschedule = 0;
        this.windowschedule_obj = new Array();
        this.windowconfiguration_obj = new windowconfiguration_cls();
        this.idlinhaobjwindowschedule = null;
        this.stateid = INICIAL;
        this.statedesc = INICIALDESC;

    }
}

class windowschedule_cls {

    partitionperiodstart;
    windowdurationseconds;
    windowidentifier;
    windowstartseconds;
    coreidentifier;
    id;
    idpartitionschedule;
    idpartitionconfiguration;
    stateid;
    statedesc;

    constructor() {
        this.partitionperiodstart = "";
        this.windowdurationseconds = "";
        this.windowidentifier = "";
        this.windowstartseconds = "";
        this.coreidentifier = "";
        this.id = 0;
        this.idpartitionschedule = 0;
        this.idpartitionconfiguration = 0;
        this.stateid = INICIAL;
        this.statedesc = INICIALDESC;
    }
}

class windowconfiguration_cls {

    windowidentifier;
    cores;
    id;
    idpartitionschedule;

    constructor() {
        this.windowidentifier = "";
        this.cores = "";
        this.id = 0;
        this.idpartitionschedule = 0;
    }
}

class partitions_cls {

    criticality;
    criticalitydesc;
    entrypoint;
    partitionname;
    partitionidentifier;
    systempartition;
    id;
    idarinc653module;
    partitionconfiguration_obj;
    stateid;
    statedesc;

    constructor() {
        this.criticality = "";
        this.criticalitydesc = "";
        this.entrypoint = "";
        this.partitionname = "";
        this.partitionidentifier = "";
        this.systempartition = "";
        this.id = 0;
        this.idarinc653module = 0;
        this.stateid = INICIAL;
        this.statedesc = INICIALDESC;
        this.partitionconfiguration_obj = new partitionconfiguration_cls();
    }
}

class partitionconfiguration_cls {

    cores;
    cache;
    libs;
    personality;
    devices;
    permissions;
    idslibs;
    idspersonality;
    idsdevices;
    idspermissions;
    id;
    idpartition;
    memory_obj;

    constructor() {
        this.cores = "";
        this.cache = "";
        this.libs = "";
        this.personality = "";
        this.devices = "";
        this.permissions = "";
        this.idslibs = "";
        this.idspersonality = "";
        this.idsdevices = "";
        this.idspermissions = "";
        this.id = 0;
        this.idpartition = 0;
        this.memory_obj = new memory_cls();
    }
}

class memory_cls {

    size;
    id;
    idpartitionconfiguration;

    constructor() {
        this.size = "";
        this.id = 0;
        this.idpartitionconfiguration = 0;
    }
}

var control_tabs = new controla_tabs();
var obj_configuration = null;
var obj_configuration_initial = null; 