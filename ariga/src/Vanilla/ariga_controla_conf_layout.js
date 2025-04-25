class controla_tabs{

    #tab_context_activa = "";
    #tabactiva = "";
    #muntab = 3;
    #numtabactiva = -1;
    
    constructor() {
        this.#tab_context_activa = "tabcontext0";
        this.#tabactiva = "tab0";
        this.#numtabactiva = 0;
    }

    set_tab_activa(numtab){
        this.#tab_context_activa = "tabcontext" + numtab;
        this.#tabactiva = "tab" + numtab;;
        this.#numtabactiva = numtab;
    }

    get_num_tab_activa(){
        return  this.#numtabactiva;
    }

    seleciona_tab_alt(objid){
        let idtabcontext = document.getElementById(objid).getAttribute("data-tab");
        document.getElementById("tabcontext" + idtabcontext).style.display = "block";
        document.getElementById(this.#tab_context_activa).style.display = "none";
        document.getElementById(this.#tabactiva).classList.remove("tabactiva");
        document.getElementById(this.#tabactiva).classList.add("tabinactiva");
        document.getElementById(objid).classList.remove("tabinactiva");
        document.getElementById(objid).classList.add("tabactiva");

        this.#tab_context_activa = "tabcontext" + idtabcontext;
        this.#tabactiva = objid;
        
    }
}
    
class configuration_cls{

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
    }
}

class arinc653module_cls{

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

class airconfiguration_cls{

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

class moduleschedule_cls{

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

class partitionschedule_cls{

    perioddurationseconds;
    periodseconds;
    id;
    idmoduleschedule;
    windowschedule_obj;
    windowconfiguration_obj;

    constructor() {
        this.perioddurationseconds = "";
        this.periodseconds = "";
        this.id = 0;
        this.idmoduleschedule = 0;
        this.windowschedule_obj = new Array();
        this.windowconfiguration_obj = new windowconfiguration_cls();
    }
}

class windowschedule_cls{

    partitionperiodstart;
    windowdurationseconds;
    windowidentifier;
    windowstartseconds;
    coreidentifier;
    id;
    idpartitionschedule;
    idpartitionconfiguration;

    constructor() {
        this.partitionperiodstart = "";
        this.windowdurationseconds = "";
        this.windowidentifier = "";
        this.windowstartseconds = "";
        this.coreidentifier = "";
        this.id = 0;
        this.idpartitionschedule = 0;
        this.idpartitionconfiguration = 0;
    }
}

class windowconfiguration_cls{

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

class partitions_cls{

    criticality;
    criticalitydesc;
    entrypoint;
    partitionname;
    partitionidentifier;
    systempartition;
    id;
    idmoduleschedule;
    partitionconfiguration_obj;

    constructor() {
        this.criticality = "";
        this.criticalitydesc = "";
        this.entrypoint = "";
        this.partitionname = "";
        this.partitionidentifier = "";
        this.systempartition = "";
        this.id = 0;
        this.idmoduleschedule = 0;
        this.partitionconfiguration_obj = new partitionconfiguration_cls();
    }
}

class partitionconfiguration_cls{

    cores;
    cache;
    libs;
    personality;
    devices;
    permissions;
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
        this.id = 0;
        this.idpartition = 0;
        this.memory_obj = new memory_cls();
    }
}

class memory_cls{

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
var obj_configuration; 