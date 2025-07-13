    
class partitionscheduleGraph{

    //Public
    bgcol1 = "#000";
    bgcol2 = "#808080";
    fgcol = "#fff";
    fgcol2 = "#000";

    windowschedules_num_cores;
    perioddurationseconds;
    periodseconds;
    windowschedule_partitionperiodstart;
    windowschedule_windowdurationseconds;
    windowschedule_coreidentifier;
    windowschedule_partitionidentifier;
    windowschedule_windowstartseconds;
    windowschedule_core;
    windowschedule_partitions;
    windowschedule_windowidentifier;
    windowschedule_idpartitionconfiguration;
    indice_windowschedule_partitions = -1;

    frames = 10;
    scalefactor = 1;
    title = "";
    barcolor = ["#D8BFD8", "#F0FFFF", "#E0FFFF", "#B0E0E6", "#F0FFF0", "#EEE8AA", "#FFDAB9", "#808080", "#BC8F8F"];
    scalesuffix = "";
    mensagem_debug = "";
    
    bh = 0.75; 		//Partition are 75% height of each interval by default
    xmargin = 30;	//Applied to left and right
    ymargin = 40;	//Applied to top and bottom
    height_cores_step = 40;

    //Private
    #that;
    #c2d;
    #cw;
    #ch;
    #posicao_inicial_em_x;
    #posicao_final_em_x;
    #posicao_final_em_y;
    #elems;
    #pitch;
    #tamanhomax_da_linha_unidades;
    #guarda_valores_intervalos_segundos;
    #guarda_valores_intervalos_x;
    #guarda_valores_intervalos_y;

    #offsetY;
    #offsetX;
    #mouseIsDown;
    #debug;
    #lastX;
    #lastY;
    #indicepartitionarrastada;
    #arraypartitions;
    #areacanvas;
    #partition_escolhida_posicao_inicial;
    #click_shift;

    constructor(html_canvas_obj_p, valor_w_p, valor_h_p, debug_p) {

        this.#that = this;
        this.#c2d = html_canvas_obj_p.getContext('2d');
        this.#cw = valor_w_p;
        this.#ch = valor_h_p;
        this.#posicao_inicial_em_x = 0;
        this.#posicao_final_em_x = 0;
        this.#posicao_final_em_y = 0;
        this.#pitch = 0;
        this.#elems = 0;
        this.#tamanhomax_da_linha_unidades = 0;
        this.#debug = debug_p;
        this.#guarda_valores_intervalos_segundos = [];
        this.#guarda_valores_intervalos_x = [];
        this.#guarda_valores_intervalos_y = [];
        this.#click_shift = false;
        this.#mouseIsDown = false;
        this.#lastX = 0;
        this.#lastY = 0;
        this.#arraypartitions = [];
        this.#indicepartitionarrastada = -1;
        this.#offsetY = 0;
        this.#offsetX = 0;
        this.#partition_escolhida_posicao_inicial = null;

        html_canvas_obj_p.width = valor_w_p;
        html_canvas_obj_p.height = valor_h_p;
        this.#areacanvas = html_canvas_obj_p.getBoundingClientRect()
        html_canvas_obj_p.addEventListener("mousedown", (event) => {  this.handleMouseDown(event) });
        html_canvas_obj_p.addEventListener("mousemove", (event) => {  this.handleMouseMove(event) });
        html_canvas_obj_p.addEventListener("mouseup", (event) => {  this.handleMouseUp(event) });
        html_canvas_obj_p.addEventListener("click", (event) => {  this.handleclick_shift(event) });
        this.#c2d.reset();

        this.windowschedule_partitionperiodstart = new Array();
        this.windowschedule_windowdurationseconds = new Array();
        this.windowschedule_coreidentifier = new Array();
        this.windowschedule_partitionidentifier = new Array();
        this.windowschedule_windowstartseconds = new Array();
        this.windowschedule_core = new Array();
        this.windowschedule_partitions =new Array();
        this.windowschedule_windowidentifier = new Array();
        this.windowschedule_idpartitionconfiguration = new Array();
    }
    
    getGuarda_valores_intervalos_x(){
        return this.#guarda_valores_intervalos_x;
    }
    getGuarda_valores_intervalos_segundos(){
        return this.#guarda_valores_intervalos_segundos;
    }
    getAllArraypartitions(){
        return this.#arraypartitions;
    }

    getareacanvas(){
        return this.#areacanvas;
    }

    setArraypartition_index(index, partition){
        this.#arraypartitions[index] = partition;
    }

    getArraypartition_index(index){
        return this.#arraypartitions[index];
    }

    setIndicepartitionarrastada(index){
        this.#indicepartitionarrastada = index;
    }

    getIndicepartitionarrastada(){
        return this.#indicepartitionarrastada;
    }

    setOffsetX(offset){
        this.#offsetX = offset;
    }

    getOffsetX(){
        return this.#offsetX;
    }

    setOffsetY(offset){
        this.#offsetY = offset;
    }

    getOffsetY(){
        return this.#offsetY;
    }

    setLastX(lastX){
        this.#lastX = lastX;
    }
 
    getLastX(lastX){
        return this.#lastX;
    }

    setLastY(lastY){
        this.#lastY = lastY;
    }
     
    getLastY(){
        return this.#lastY;
    }

    setMouseIsDown(estado){
        this.#mouseIsDown = estado;
    } 

    getMouseIsDown(){
        return this.#mouseIsDown;
    } 

    getClick_shift(){
        return this.#click_shift; 
    }

    setClick_shift(estado){
        this.#click_shift = estado; 
    }

    setPartition_escolhida_posicao_inicial(partition){
        this.#partition_escolhida_posicao_inicial = null;
        this.#partition_escolhida_posicao_inicial = partition;
    }

    getPartition_escolhida_posicao_inicial(){
        return this.#partition_escolhida_posicao_inicial;
    }

    handleclick_shift(e){

        if (e.shiftKey){
            
            grafico.setClick_shift(true);

            let areacanvas = grafico.getareacanvas();

            let x = e.clientX - areacanvas.left;
            let y = Math.round(e.clientY - areacanvas.top);

            let arraypartitions = grafico.getAllArraypartitions();

            let count = arraypartitions.length;
            let i = 0;
            let encontrou = 0;

            while(encontrou == 0 && i < count){

                    // this.#message_debug("windowschedule_windowdurationseconds: " + grafico.windowschedule_windowdurationseconds[i]); 
                    // this.#message_debug("windowschedule_coreidentifier: " + grafico.windowschedule_coreidentifier[i]); 
                    // this.#message_debug("windowschedule_partitionidentifier: " + grafico.windowschedule_partitionidentifier[i]); 

                    // this.#message_debug("Id partition: " + i + " -------------------------------------"); 
                    // this.#message_debug('arraypartitions.X: ' + arraypartitions[i].x);
                    // this.#message_debug('clientX: ' + e.clientX);
                    // this.#message_debug('areacanvas.left: ' + this.#areacanvas.left);
                    // this.#message_debug('x: ' + x);
                    // this.#message_debug('xfinal: ' + arraypartitions[i].xfinal);

                    // this.#message_debug('arraypartitions.Y: ' + arraypartitions[i].y);
                    // this.#message_debug('clientY: ' + e.clientY);
                    // this.#message_debug('areacanvas.top: ' + this.#areacanvas.top);
                    // this.#message_debug('y: ' + y);
                    // this.#message_debug('yfinal: ' + arraypartitions[i].yfinal);
                    // this.#message_debug("-------------------------------------------------------------"); 

                if ((x >= arraypartitions[i].x && x <= arraypartitions[i].xfinal) && (y >= arraypartitions[i].y && y <= arraypartitions[i].yfinal)){
                    encontrou = 1;
                    // this.#message_debug('encontrou: ' + i);
                    // this.#message_debug("-------------------------------------------------------------"); 
                }else{
                    i++;
                }
            }

            // this.#criar_ficheiro_debug(this.mensagem_debug);
            // this.mensagem_debug = "";

            if (encontrou == 1){

                alter_window_schedule(i, grafico.windowschedule_windowdurationseconds[i], grafico.windowschedule_coreidentifier[i], grafico.windowschedule_partitionidentifier[i], grafico.windowschedule_idpartitionconfiguration[i], grafico.windowschedule_windowidentifier[i]);

            }

            grafico.setClick_shift(false);
        }
    }

    handleMouseDown(e){

        if (grafico.getClick_shift()) return;

        let areacanvas = grafico.getareacanvas();
        let x = e.clientX - areacanvas.left;
        let y = Math.round(e.clientY - areacanvas.top);

        let arraypartitions = grafico.getAllArraypartitions();

        let count = arraypartitions.length;
        let i = 0;
        let encontrou = 0;

        while(encontrou == 0 && i < count){
  
            if ((x >= arraypartitions[i].x && x <= arraypartitions[i].xfinal) && (y >= arraypartitions[i].y && y <= arraypartitions[i].yfinal)){
                encontrou = 1;
            }else{
                i++;
            }
        }

        if (encontrou == 1){

            grafico.setIndicepartitionarrastada(i);
            grafico.setOffsetX(x - arraypartitions[i].x);
            grafico.setOffsetY(y - arraypartitions[i].y);
            grafico.setLastX(x);
            grafico.setLastY(y);
            grafico.setMouseIsDown(true);
            let partition_escolhida_posicao_inicial = new partition_ship(
                arraypartitions[i].x, 
                arraypartitions[i].y, 
                arraypartitions[i].width,
                arraypartitions[i].height,
                arraypartitions[i].xfinal,
                arraypartitions[i].yfinal,
                arraypartitions[i].backfill,
                arraypartitions[i].legendfill,
                arraypartitions[i].radius,
                arraypartitions[i].legenda,
                arraypartitions[i].debug
            );
            grafico.setPartition_escolhida_posicao_inicial(partition_escolhida_posicao_inicial);
        }

    }

    handleMouseMove(e){

        if (grafico.getClick_shift()) return;

        if (!grafico.getMouseIsDown()) {
            return;
        }

        let arraypartitions = grafico.getAllArraypartitions();
        let areacanvas = grafico.getareacanvas();
        let indicepartitionarrastada = grafico.getIndicepartitionarrastada();
        let x = e.clientX - areacanvas.left;
        let y = Math.round(e.clientY - areacanvas.top);

        let distx =  x - grafico.getLastX();
        let newx =  grafico.getLastX() + distx - grafico.getOffsetX();

        let guarda_valores_intervalos_x = grafico.getGuarda_valores_intervalos_x();

        if (newx < guarda_valores_intervalos_x[0]) {
            newx =  guarda_valores_intervalos_x[0];
        };

        if (newx + arraypartitions[indicepartitionarrastada].width > guarda_valores_intervalos_x[guarda_valores_intervalos_x.length - 1]){
            newx =  guarda_valores_intervalos_x[guarda_valores_intervalos_x.length - 1] - arraypartitions[indicepartitionarrastada].width;
        }

        arraypartitions[indicepartitionarrastada].x = newx;
        arraypartitions[indicepartitionarrastada].xfinal = newx + arraypartitions[indicepartitionarrastada].width;
        grafico.setArraypartition_index(indicepartitionarrastada, arraypartitions[indicepartitionarrastada]);

        grafico.setLastX(x);
        grafico.setLastY(y);
        
        grafico.apagarContext();
        grafico.drawGraph_move();
    }

    handleMouseUp(e) {

        if (grafico.getClick_shift()) return;

        let areacanvas = grafico.getareacanvas();
        let x = e.clientX - areacanvas.left;
        let y = Math.round(e.clientY - areacanvas.top);

        grafico.setMouseIsDown(false);
        grafico.verifica_ultima_posição_corrige();
        grafico.setIndicepartitionarrastada(-1);
        grafico.setOffsetX(0);
        grafico.setOffsetY(0);
        grafico.setLastX(x);
        grafico.setLastY(y);
    }

    atualiza_windowschedule_windowstartseconds(){

        let arraypartitions = grafico.getAllArraypartitions();
        let count = arraypartitions.length;
        let guarda_valores_intervalos_segundos = grafico.getGuarda_valores_intervalos_segundos();
        let guarda_valores_intervalos_x = grafico.getGuarda_valores_intervalos_x();
        let count2 = guarda_valores_intervalos_segundos.length;
        let i,j = 0;
        let encontrou = 0;

        for(i = 0; i < count; i++){
            
            j = 0;
            encontrou = 0;
            
            while(encontrou == 0 && j < count2){
                if(guarda_valores_intervalos_x[j] == arraypartitions[i].x) {
                    encontrou = 1;
                }else{
                    j++;
                }
            }
            if (encontrou == 1){
                grafico.windowschedule_windowstartseconds[i] = guarda_valores_intervalos_segundos[j];
            }
            
        }

    }

    verifica_ultima_posição_corrige(){

        let arraypartitions = grafico.getAllArraypartitions();
        let indicepartitionarrastada = grafico.getIndicepartitionarrastada();
        let count = arraypartitions.length;
        let i = 0;
        let corrigir = 0;
        let encontrou = 0;

        if (indicepartitionarrastada < 0)  return;

        for (i = 0; i < count; i++){
            if(i != indicepartitionarrastada){

                if(grafico.windowschedule_coreidentifier[i] == grafico.windowschedule_coreidentifier[indicepartitionarrastada]){
                    
                    if (arraypartitions[indicepartitionarrastada].x > arraypartitions[i].x && arraypartitions[indicepartitionarrastada].x < arraypartitions[i].xfinal){
                        corrigir = corrigir + 1;
                    }

                    if (arraypartitions[indicepartitionarrastada].xfinal > arraypartitions[i].x && arraypartitions[indicepartitionarrastada].xfinal < arraypartitions[i].xfinal){
                        corrigir = corrigir + 2;
                    }
                }
            }
        }   
        
        let guarda_valores_intervalos_x = grafico.getGuarda_valores_intervalos_x();
        count = guarda_valores_intervalos_x.length;
        i = 0;

        if (corrigir == 0){

            while(encontrou == 0 && i < count){

                if (guarda_valores_intervalos_x[i] == arraypartitions[indicepartitionarrastada].x){
                    encontrou = 1;
                }else{
                    i++;
                }
            }
             
            if (encontrou == 0){
                corrigir = 4;
            }
        }

        let partition_escolhida_posicao_inicial;

        if (corrigir == 1 || corrigir == 2 || corrigir == 3){

            partition_escolhida_posicao_inicial = grafico.getPartition_escolhida_posicao_inicial();
            arraypartitions[indicepartitionarrastada].x = partition_escolhida_posicao_inicial.x;
            arraypartitions[indicepartitionarrastada].xfinal = partition_escolhida_posicao_inicial.xfinal;
            grafico.setArraypartition_index(indicepartitionarrastada, arraypartitions[indicepartitionarrastada]);
            grafico.apagarContext();
            grafico.drawGraph_move();
        }

        let valor_em_x = 0;

        if (corrigir == 4){
            valor_em_x = grafico.indica_posicao_correta(guarda_valores_intervalos_x, arraypartitions[indicepartitionarrastada]);
            arraypartitions[indicepartitionarrastada].x = valor_em_x;
            arraypartitions[indicepartitionarrastada].xfinal =   valor_em_x + arraypartitions[indicepartitionarrastada].width;
            grafico.setArraypartition_index(indicepartitionarrastada, arraypartitions[indicepartitionarrastada]);
            grafico.apagarContext();
            grafico.drawGraph_move();
        }

    }

    indica_posicao_correta(valores_intervalos_x, partition_i){

        let encontrou = 0;
        let encontrou_indice_sup = -1;
        let encontrou_indice_inf = -1; 
        let calc_dif_inf = 0;
        let calc_dif_sup = 0;
        let i = 0;
        let count = valores_intervalos_x.length;
        let valor_x_escolhido = -1;

        while(encontrou == 0 && i < count){
            if (partition_i.x < valores_intervalos_x[i]){
                encontrou = 1;
                calc_dif_inf = partition_i.x - valores_intervalos_x[i-1];
                encontrou_indice_sup = i;
                encontrou_indice_inf = i - 1;
                calc_dif_sup = valores_intervalos_x[i] - partition_i.x;
            }else{
                i++;
            }
        }
        if (calc_dif_sup <= calc_dif_inf){
            return valor_x_escolhido = valores_intervalos_x[encontrou_indice_sup];
        }else{
            return valor_x_escolhido = valores_intervalos_x[encontrou_indice_inf];
        }

    }


    apagarContext(){
         this.#c2d.reset();
    }

    drawGraph(){
 
        //Setup
        this.#posicao_inicial_em_x = this.xmargin * 1.5; 
        this.#posicao_final_em_x = this.#cw - this.xmargin;
        this.#posicao_final_em_y = this.#ch - this.ymargin;
        this.#tamanhomax_da_linha_unidades = (this.#cw - (1.5 * this.xmargin + this.xmargin))

        this.#elems = Math.round(this.perioddurationseconds/this.periodseconds); //número de divisões de tempo
        //this.#message_debug("this.#elems: " + this.#elems);
        this.#pitch = Math.ceil(this.#tamanhomax_da_linha_unidades / this.#elems);	//largura de cada espaço temporal~

        //this.#message_debug("this.#pitch: " + this.#pitch);

        this.#drawFrame();
        this.#drawpartitionwindows();
        
    }

    drawGraph_move(){
 
        this.#drawFrame();
        this.#drawpartitionwindows_move();
        
    }

    #drawpartitionwindows_move(){
     
        let countwindowpartitions = this.#arraypartitions.length;
       
        if (countwindowpartitions > 0){

            for (i = 0; i < countwindowpartitions; i++) {
                if (i != this.#indicepartitionarrastada){
                    this.#roundRect_and_text(
                        this.#arraypartitions[i].backfill,
                        this.#c2d, 
                        this.#arraypartitions[i].x, 
                        this.#arraypartitions[i].y, 
                        this.#arraypartitions[i].width, 
                        this.#arraypartitions[i].height, 
                        5, 
                        true, 
                        true, 
                        this.fgcol2, 
                        this.#arraypartitions[i].legenda);
                }

                this.#roundRect_and_text(
                    this.#arraypartitions[this.#indicepartitionarrastada].backfill,
                    this.#c2d, 
                    this.#arraypartitions[this.#indicepartitionarrastada].x, 
                    this.#arraypartitions[this.#indicepartitionarrastada].y, 
                    this.#arraypartitions[this.#indicepartitionarrastada].width, 
                    this.#arraypartitions[this.#indicepartitionarrastada].height, 
                    5, 
                    true, 
                    true, 
                    this.fgcol2, 
                    this.#arraypartitions[this.#indicepartitionarrastada].legenda);

                // this.#message_debug("Id partition: " + i + " -------------------------------------"); 
                // this.#message_debug("x: " +  barx);
                // this.#message_debug("y: " +  bary);
                // this.#message_debug("width: " +  barw);
                // this.#message_debug("height: " +  barh);
                // this.#message_debug("xfinal: " +  somaxfinal);
                // this.#message_debug("yfinal: " +  somayfinal);
                // this.#message_debug("partition Identifier: " + this.windowschedule_partitionidentifier[i].toString());
                // this.#message_debug("-------------------------------------------------------------"); 
            }

        }
 
    }

    #drawFrame(){

        //Background color
        let gradfill = this.#c2d.createLinearGradient(0, 0, 0, this.#ch);
        gradfill.addColorStop(0, this.bgcol1);
        gradfill.addColorStop(0.5, this.bgcol1);
        gradfill.addColorStop(1, this.bgcol1);
        this.#c2d.fillStyle = gradfill;
        this.#c2d.fillRect(0, 0, this.#cw, this.#ch);	
        
        //Coloca o titulo
        this.#c2d.font="Bold 20px Calibri";
        this.#c2d.textBaseline="middle";
        this.#c2d.strokeStyle = this.fgcol;
        this.#c2d.fillStyle = this.fgcol;
        let th = this.#c2d.measureText(this.title).width;
        this.#c2d.fillText(this.title, (this.#cw/2)-(th/2), 10); //posição do texto  X e Y
        let i = 0;    
        let separacao_entre_barras = 0;
        
        //Horizontal axis
        if (this.windowschedules_num_cores > 0){

            for(i=0;i < this.windowschedules_num_cores; i++){    
                
                separacao_entre_barras =  this.height_cores_step * i;
                this.#c2d.lineWidth = 0.5;
                this.#c2d.beginPath();
                this.#c2d.moveTo(this.#posicao_inicial_em_x, this.#posicao_final_em_y - separacao_entre_barras); //posição inicial do eixo do XX
                this.#c2d.lineTo(this.#posicao_final_em_x, this.#posicao_final_em_y - separacao_entre_barras); //posição final do eixo dos XX
                this.#guarda_valores_intervalos_y[i] = this.#posicao_final_em_y - separacao_entre_barras;

                this.#c2d.stroke();
            } 

        }

        this.#c2d.font="9px Calibri";//Fonte dos labels
        
        let x = 0;
        let xlabel = "";
        i = 0;

        for (i = 0; i <= this.#elems; i++) {
            
            //Coloca os labels horizontais
            x = (this.xmargin * 1.5) + (i * this.#pitch);

            this.#guarda_valores_intervalos_x[i] = x;

            xlabel = (this.periodseconds * i).toFixed(5).toString() + 's';
            this.#guarda_valores_intervalos_segundos[i] = (this.periodseconds * i).toFixed(5);

            //this.#message_debug("xlabel: " + xlabel);
            th = this.#c2d.measureText(xlabel).width;
            this.#c2d.fillText(xlabel, x - (this.#c2d.measureText(xlabel).width / 2), this.#ch - this.ymargin + 10);

            //Marcas dos labels horizontais
            this.#c2d.lineWidth = 2;
            this.#c2d.strokeStyle = this.fgcol;
            this.#c2d.beginPath();
            this.#c2d.moveTo(x,  this.#ch - this.ymargin - 1);
            this.#c2d.lineTo(x,  this.#ch - this.ymargin + 3);
            this.#c2d.stroke();
        }

        //Linha vertical
        x = (this.xmargin * 1.5) - 2;
        this.#c2d.lineWidth = 0.5;
        this.#c2d.strokeStyle = this.fgcol;
        this.#c2d.beginPath();
        this.#c2d.moveTo(x, this.#ch - this.ymargin - 1);
        this.#c2d.lineTo(x, this.ymargin);
        this.#c2d.stroke();

        //Coloca labels verticais
        this.#c2d.font="Bold 11px Calibri";
        this.#c2d.lineWidth = 2;

        i = 0;
        let y = 0;
        th = 0;

        if (this.windowschedules_num_cores > 0){

            for(i=0;i < this.windowschedules_num_cores; i++){    

                    y = (this.#ch - this.ymargin) - (i * this.height_cores_step) - (this.height_cores_step / 2);

                    this.#c2d.beginPath();
                    this.#c2d.moveTo(x + 1, y);
                    this.#c2d.lineTo(x - 3, y); //marcas do local onde vão ficar os labels (ao meio da coluna)
                    this.#c2d.stroke();
                    if (this.windowschedule_core[i] === undefined ){
                        th = this.#c2d.measureText('Core #').width;
                        this.#c2d.fillText('Core #', x - th - 5, y); //onde vai ficar os labels
                    }else{
                        th = this.#c2d.measureText('Core ' + this.windowschedule_core[i]).width;
                        this.#c2d.fillText('Core ' + this.windowschedule_core[i], x - th - 5, y); //onde vai ficar os labels
                    }

            }
        }
       
    }

    #return_pos_y(coreidentifier){

        let i = 0;
        let encontrou = 0;


        while(encontrou == 0 && i < this.windowschedules_num_cores){

            if (this.windowschedule_core[i] == coreidentifier){
                encontrou = 1;
            }else{
                i++;
            }
        }

        if (encontrou == 1){
            return  this.#guarda_valores_intervalos_y[i];
        }else{
            return 0;
        }
    } 

    #return_pos_x_inicial(partitiontime){

        let i = 0;
        let encontrou = 0;
        let count = 0;

        count =  this.#guarda_valores_intervalos_x.length;

        while(encontrou == 0 && i < count){

            if (Number(this.#guarda_valores_intervalos_segundos[i]) == Number(partitiontime)){
                encontrou = 1;
            }else{
                i++;
            }
        }

        if (encontrou == 1){
            return  this.#guarda_valores_intervalos_x[i];
        }else{
            return 0;
        }
    } 

    #return_dim_x(partitiontime){

        let i = 0;
        let numbertimes = 0;

        numbertimes = Math.round(partitiontime/this.periodseconds);
        i = this.#pitch * numbertimes;

        return i;
    } 

    #return_cor_partition(partitionname){

        let retorno = 0;
        let cor = 0;

        retorno = this.windowschedule_partitionidentifier.indexOf(partitionname);

        if (retorno !== -1){
            return cor = this.barcolor[retorno];
        }else{
            return cor = "";
        }
    } 
    
    #drawpartitionwindows(){
     
        let countwindowpartitions = this.windowschedule_partitionidentifier.length;
        let retornocor = "";
        let retorno_posx_i = 0;
        let retorno_dimx = 0;
        let retorno_posy_i = 0;

        this.#c2d.lineWidth = 1;
        this.#c2d.strokeStyle = this.barcol1;
        
        let barh = this.height_cores_step * this.bh; //Height de cada partition window
        let barw = 0;
        let bary = 0;
        let barx = 0;  
        
        let texto_leg = "";
        let th;
        let somaxfinal = 0;
        let somayfinal = 0;

        this.#arraypartitions = [];
        this.#arraypartitions = new Array();

        if (countwindowpartitions > 0){

            this.#arraypartitions = new Array(countwindowpartitions);

            for (i = 0; i < countwindowpartitions; i++) {
                
                retornocor = this.#return_cor_partition(this.windowschedule_partitionidentifier[i]);
                if (retornocor == "")  {
                    alert("Erro a identificar a cor!...");
                    return;
                }    
                retorno_posy_i =  this.#return_pos_y(this.windowschedule_coreidentifier[i]);    

                if (retorno_posy_i == 0)  {
                    alert("Erro a identificar a posição inicial em Y!...");   
                    return;
                }    
                bary = retorno_posy_i - barh - 3;

                retorno_posx_i =  this.#return_pos_x_inicial(this.windowschedule_windowstartseconds[i]); 
                if (retorno_posx_i == 0)  {
                    alert("Erro a identificar a posição inicial em X!...");   
                    return;
                }
                barx = retorno_posx_i;
               
                retorno_dimx =  this.#return_dim_x(this.windowschedule_windowdurationseconds[i]); 
                if (retorno_dimx <= 0)  {
                    alert("Erro a identificar comprimento em X!...");   
                    return;
                }    
                barw = retorno_dimx;

                this.#roundRect_and_text(retornocor, this.#c2d, barx, bary, barw, barh, 5, true, true, this.fgcol2, this.windowschedule_partitionidentifier[i].toString());

                somaxfinal = 0;
                somayfinal = 0;

                somaxfinal = barx + barw;
                somayfinal = bary + barh;

                this.#arraypartitions[i] = new partition_ship(barx, bary, barw, barh, somaxfinal, somayfinal, retornocor, this.fgcol2, 5, this.windowschedule_partitionidentifier[i].toString(), 0);
                // this.#message_debug("Id partition: " + i + " -------------------------------------"); 
                // this.#message_debug("x: " +  barx);
                // this.#message_debug("y: " +  bary);
                // this.#message_debug("width: " +  barw);
                // this.#message_debug("height: " +  barh);
                // this.#message_debug("xfinal: " +  somaxfinal);
                // this.#message_debug("yfinal: " +  somayfinal);
                // this.#message_debug("partition Identifier: " + this.windowschedule_partitionidentifier[i].toString());
                // this.#message_debug("-------------------------------------------------------------"); 
            }

        }
 
    }
    
    #roundRect_and_text(backfill, ctx, x, y, width, height, radius = 5, fill = true, stroke = true, legendafill, legenda) {

        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        if (fill) {
            ctx.fillStyle = backfill;
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }

        let th = 0;

        //Adiciona legenda
        ctx.fillStyle = legendafill;
        th = ctx.measureText(legenda).width;
        ctx.fillText(legenda, x + (width/2) - th/2, y + (height/2)); //posição do texto  X e Y
    }
    
    
    #message_debug(texto){
        this.mensagem_debug = this.mensagem_debug + texto + "\n";
    }

    #criar_ficheiro_debug(mensagem_debug) {

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

}

class partition_ship{

      x;
      y;
      width;
      height;
      xfinal;
      yfinal;
      backfill;
      legendfill;
      radius;
      legenda;

    constructor(x_p, y_p, width_p, height_p, xfinal_p, yfinal_p, backfill_p, legendfill_p, radius_p, legenda_p, debug_p) {

        this.x = x_p;
        this.y = y_p;
        this.width = width_p;
        this.height = height_p;
        this.xfinal = xfinal_p;
        this.yfinal = yfinal_p;
        this.backfill = backfill_p;
        this.legendfill = legendfill_p;
        this.radius = radius_p;
        this.legenda = legenda_p;
        this.debug = debug_p;
    }
}


