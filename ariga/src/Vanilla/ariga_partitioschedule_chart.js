class partitionscheduleGraph{

    //Public
    bgcol1 = "#000";
    bgcol2 = "#808080";
    fgcol = "#fff";
    fgcol2 = "#000";

    windowschedules_num_cores;
    perioddurationseconds;
    periodseconds;
    windowschedule_partitionperiodstart = [];
    windowschedule_windowdurationseconds = [];
    windowschedule_coreidentifier = [];
    windowschedule_partitionidentifier = [];
    windowschedule_windowstartseconds = [];
    windowschedule_core = [];
    windowschedule_partitions = [];
    windowschedule_windowidentifier = [];
    windowschedule_idpartitionconfiguration = [];
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
        html_canvas_obj_p.addEventListener("dblclick", (event) => {  this.handledblclick(event) });
        this.#c2d.clearRect(0, 0, this.#cw, this.#ch);
    }

    atualiza_windowschedule_windowstartseconds(){

        let count = this.#arraypartitions.length;
        let count2 = this.#guarda_valores_intervalos_x.length;
        let i,j = 0;
        let encontrou = 0;

        for(i = 0; i < count; i++){
            
            j = 0;
            encontrou = 0;
            
            while(encontrou == 0 && j < count2){
                if(this.#guarda_valores_intervalos_x[j] == this.#arraypartitions[i].x) {
                    encontrou = 1;
                }else{
                    j++;
                }
            }
            if (encontrou == 1){
                this.windowschedule_windowstartseconds[i] =  this.#guarda_valores_intervalos_segundos[j];
            }
            
        }

    }

    handledblclick(e){
        let x = e.clientX - this.#areacanvas.left;
        let y = Math.round(e.clientY - this.#areacanvas.top);
        let count =  this.#arraypartitions.length;
        let i = 0;
        let encontrou = 0;

        while(encontrou == 0 && i < count){
  
            if ((x >= this.#arraypartitions[i].x && x <= this.#arraypartitions[i].xfinal) && (y >= this.#arraypartitions[i].y && y <= this.#arraypartitions[i].yfinal)){

                encontrou = 1;
            }else{
                i++;
            }
        }
        if (encontrou == 1){

            alter_window_schedule(i, this.windowschedule_windowdurationseconds[i], this.windowschedule_coreidentifier[i], this.windowschedule_partitionidentifier[i], this.windowschedule_idpartitionconfiguration[i], this.windowschedule_windowidentifier[i]);

        }
    }

    handleMouseDown(e){

        let x = e.clientX - this.#areacanvas.left;
        let y = Math.round(e.clientY - this.#areacanvas.top);
        let count =  this.#arraypartitions.length;
        let i = 0;
        let encontrou = 0;

        while(encontrou == 0 && i < count){
  
            if ((x >= this.#arraypartitions[i].x && x <= this.#arraypartitions[i].xfinal) && (y >= this.#arraypartitions[i].y && y <= this.#arraypartitions[i].yfinal)){

                encontrou = 1;
            }else{
                i++;
            }
        }

        if (encontrou == 1){
            this.#indicepartitionarrastada = i;

            this.#offsetX = x - this.#arraypartitions[i].x;
            this.#offsetY = y - this.#arraypartitions[i].y;
            this.#lastX = x;
            this.#lastY = y;
            this.#mouseIsDown = true;
            this.#partition_escolhida_posicao_inicial = null;
            this.#partition_escolhida_posicao_inicial = new partition_ship(

                this.#arraypartitions[i].x, 
                this.#arraypartitions[i].y, 
                this.#arraypartitions[i].width,
                this.#arraypartitions[i].height,
                this.#arraypartitions[i].xfinal,
                this.#arraypartitions[i].yfinal,
                this.#arraypartitions[i].backfill,
                this.#arraypartitions[i].legendfill,
                this.#arraypartitions[i].radius,
                this.#arraypartitions[i].legenda,
                this.#arraypartitions[i].debug
            );

        }
    }

    handleMouseMove(e){

        if (!this.#mouseIsDown) {
            return;
        }
 
        let x = e.clientX - this.#areacanvas.left;
        let y = Math.round(e.clientY - this.#areacanvas.top);
        let distx =  x - this.#lastX;
        let newx =  this.#lastX + distx - this.#offsetX;

        if (newx < this.#guarda_valores_intervalos_x[0]) {
            newx =  this.#guarda_valores_intervalos_x[0];
        };
        if (newx + this.#arraypartitions[this.#indicepartitionarrastada].width > this.#guarda_valores_intervalos_x[this.#guarda_valores_intervalos_x.length - 1]){
            newx =  this.#guarda_valores_intervalos_x[this.#guarda_valores_intervalos_x.length - 1] - this.#arraypartitions[this.#indicepartitionarrastada].width;
        }
        
        this.apagarpartition(this.#arraypartitions, this.#indicepartitionarrastada);

        let count = this.#arraypartitions.length;
        let i = 0;

        for (i = 0; i < count; i++){
            if(i != this.#indicepartitionarrastada){
                
                this.#roundRect_and_text(
                    this.#arraypartitions[i].backfill, 
                    this.#c2d, 
                    this.#arraypartitions[i].x, 
                    this.#arraypartitions[i].y,
                    this.#arraypartitions[i].width, 
                    this.#arraypartitions[i].height,
                    this.#arraypartitions[i].radius, 
                    true,
                    true,
                    this.#arraypartitions[i].legendfill, 
                    this.#arraypartitions[i].legenda);
            }        
        }

        this.#roundRect_and_text(

            this.#arraypartitions[this.#indicepartitionarrastada].backfill, 
            this.#c2d, 
            newx, 
            this.#arraypartitions[this.#indicepartitionarrastada].y,
            this.#arraypartitions[this.#indicepartitionarrastada].width, 
            this.#arraypartitions[this.#indicepartitionarrastada].height,
            this.#arraypartitions[this.#indicepartitionarrastada].radius, 
            true,
            true,
            this.#arraypartitions[this.#indicepartitionarrastada].legendfill, 
            this.#arraypartitions[this.#indicepartitionarrastada].legenda);

        this.#arraypartitions[this.#indicepartitionarrastada].x = newx;
        this.#arraypartitions[this.#indicepartitionarrastada].xfinal = newx + this.#arraypartitions[this.#indicepartitionarrastada].width;

        this.#lastX = x;
        this.#lastY = y;

    }

    handleMouseUp(e) {

        let x = e.clientX - this.#areacanvas.left;
        let y = Math.round(e.clientY - this.#areacanvas.top);

        this.#mouseIsDown = false;
        this.verifica_ultima_posição_corrige();
        this.#indicepartitionarrastada = -1;
        this.#offsetX = 0;
        this.#offsetY = 0;
        this.#lastX = x;
        this.#lastY = y;

    }

    apagarpartition(partitions, indice){
         this.#c2d.clearRect(partitions[indice].x - 1, partitions[indice].y - 1, partitions[indice].width + 2, partitions[indice].height + 2);
    }

    apagarpartition_indice(partition_indice){
         this.#c2d.clearRect(partition_indice.x - 1, partition_indice.y - 1, partition_indice.width + 2, partition_indice.height + 2);
    }

    verifica_ultima_posição_corrige(){

        let count = this.#arraypartitions.length;
        let i = 0;
        let corrigir = 0;
        let encontrou = 0;

        for (i = 0; i < count; i++){
            if(i != this.#indicepartitionarrastada){

                if(this.windowschedule_coreidentifier[i] == this.windowschedule_coreidentifier[this.#indicepartitionarrastada]){
                    
                    if (this.#arraypartitions[this.#indicepartitionarrastada].x > this.#arraypartitions[i].x && this.#arraypartitions[this.#indicepartitionarrastada].x < this.#arraypartitions[i].xfinal){
                        corrigir = corrigir + 1;
                    }

                    if (this.#arraypartitions[this.#indicepartitionarrastada].xfinal > this.#arraypartitions[i].x && this.#arraypartitions[this.#indicepartitionarrastada].xfinal < this.#arraypartitions[i].xfinal){
                        corrigir = corrigir + 2;
                    }
                }
            }
        }   
        
        count = this.#guarda_valores_intervalos_x.length;
        i = 0;

        if (corrigir == 0){

            while(encontrou == 0 && i < count){

                if (this.#guarda_valores_intervalos_x[i] == this.#arraypartitions[this.#indicepartitionarrastada].x){
                    encontrou = 1;
                }else{
                    i++;
                }
            }
             
            if (encontrou == 0){
                corrigir = 4;
            }
        }

        if (corrigir == 1){
            this.redesenha_partition_inicial_x(this.#arraypartitions[this.#indicepartitionarrastada], this.#partition_escolhida_posicao_inicial, corrigir);
        }

        if (corrigir == 2){
            this.redesenha_partition_inicial_x(this.#arraypartitions[this.#indicepartitionarrastada], this.#partition_escolhida_posicao_inicial, corrigir);
        }

        if (corrigir == 3){
            this.redesenha_partition_inicial_x_sob_dupla(this.#arraypartitions[this.#indicepartitionarrastada], this.#partition_escolhida_posicao_inicial);
        }    

        let valor_em_x = 0;
        if (corrigir == 4){
            valor_em_x = this.indica_posicao_correta(this.#guarda_valores_intervalos_x, this.#arraypartitions[this.#indicepartitionarrastada]);
            this.redesenha_partition_x(this.#arraypartitions[this.#indicepartitionarrastada], valor_em_x)
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

    redesenha_partition_x(partition_i, valor_x){

        this.apagarpartition_indice(partition_i);

        this.#roundRect_and_text(
                    partition_i.backfill, 
                    this.#c2d, 
                    valor_x, 
                    partition_i.y,
                    partition_i.width, 
                    partition_i.height,
                    partition_i.radius, 
                    true,
                    true,
                    partition_i.legendfill, 
                    partition_i.legenda);

        partition_i.x = valor_x;
        partition_i.xfinal = valor_x + partition_i.width;
    }

    find_partition(partition, tiposob){

        let count = this.#arraypartitions.length;
        let encontrou = 0;

        let i = 0;

        while(encontrou == 0 && i < count){
  
            if (partition.y == this.#arraypartitions[i].y){

                if (tiposob == 1){
                    if (partition.x > this.#arraypartitions[i].x && partition.x < this.#arraypartitions[i].xfinal){
                        encontrou = 1;
                    }else{
                        i++;
                    }
                }else if(tiposob == 2){
                    if (partition.xfinal > this.#arraypartitions[i].x && partition.xfinal < this.#arraypartitions[i].xfinal){
                        encontrou = 1;
                    }else{
                        i++;
                    }
                }

            }else{
                i++;
            }
        }

        return i;
    }

    redesenha_partition_inicial_x(partition_i, partition_i_inicial, tiposob){

        this.apagarpartition_indice(partition_i);

        let idpartition_sob = this.find_partition(partition_i, tiposob);

        let i = 0;
        let count = this.#arraypartitions.length;
        
        this.#roundRect_and_text(
            partition_i_inicial.backfill, 
            this.#c2d, 
            partition_i_inicial.x, 
            partition_i_inicial.y,
            partition_i_inicial.width, 
            partition_i_inicial.height,
            partition_i_inicial.radius, 
            true,
            true,
            partition_i_inicial.legendfill, 
            partition_i_inicial.legenda);

        this.apagarpartition_indice(this.#arraypartitions[idpartition_sob]);

        this.#roundRect_and_text(
            this.#arraypartitions[idpartition_sob].backfill, 
            this.#c2d, 
            this.#arraypartitions[idpartition_sob].x, 
            this.#arraypartitions[idpartition_sob].y,
            this.#arraypartitions[idpartition_sob].width, 
            this.#arraypartitions[idpartition_sob].height,
            this.#arraypartitions[idpartition_sob].radius, 
            true,
            true,
            this.#arraypartitions[idpartition_sob].legendfill, 
            this.#arraypartitions[idpartition_sob].legenda);     


        partition_i.x = partition_i_inicial.x;
        partition_i.y = partition_i_inicial.y;
        partition_i.width = partition_i_inicial.width;
        partition_i.height = partition_i_inicial.height;
        partition_i.xfinal = partition_i_inicial.xfinal;
        partition_i.yfinal = partition_i_inicial.yfinal;
        partition_i.backfill = partition_i_inicial.backfill;
        partition_i.legendfill = partition_i_inicial.legendfill;
        partition_i.radius = partition_i_inicial.radius;
        partition_i.legenda = partition_i_inicial.legenda;
        partition_i.debug = partition_i_inicial.debug;
    }

    redesenha_partition_inicial_x_sob_dupla(partition_i, partition_i_inicial){

        this.apagarpartition_indice(partition_i);

        let idpartition_sob_1 = this.find_partition(partition_i, 1);
        let idpartition_sob_2 = this.find_partition(partition_i, 2);

        let i = 0;
        let count = this.#arraypartitions.length;
        
        this.#roundRect_and_text(
            partition_i_inicial.backfill, 
            this.#c2d, 
            partition_i_inicial.x, 
            partition_i_inicial.y,
            partition_i_inicial.width, 
            partition_i_inicial.height,
            partition_i_inicial.radius, 
            true,
            true,
            partition_i_inicial.legendfill, 
            partition_i_inicial.legenda);

        this.apagarpartition_indice(this.#arraypartitions[idpartition_sob_1]);
        this.apagarpartition_indice(this.#arraypartitions[idpartition_sob_2]);

        this.#roundRect_and_text(
            this.#arraypartitions[idpartition_sob_1].backfill, 
            this.#c2d, 
            this.#arraypartitions[idpartition_sob_1].x, 
            this.#arraypartitions[idpartition_sob_1].y,
            this.#arraypartitions[idpartition_sob_1].width, 
            this.#arraypartitions[idpartition_sob_1].height,
            this.#arraypartitions[idpartition_sob_1].radius, 
            true,
            true,
            this.#arraypartitions[idpartition_sob_1].legendfill, 
            this.#arraypartitions[idpartition_sob_1].legenda);    

        this.#roundRect_and_text(
            this.#arraypartitions[idpartition_sob_2].backfill, 
            this.#c2d, 
            this.#arraypartitions[idpartition_sob_2].x, 
            this.#arraypartitions[idpartition_sob_2].y,
            this.#arraypartitions[idpartition_sob_2].width, 
            this.#arraypartitions[idpartition_sob_2].height,
            this.#arraypartitions[idpartition_sob_2].radius, 
            true,
            true,
            this.#arraypartitions[idpartition_sob_2].legendfill, 
            this.#arraypartitions[idpartition_sob_2].legenda); 

        partition_i.x = partition_i_inicial.x;
        partition_i.y = partition_i_inicial.y;
        partition_i.width = partition_i_inicial.width;
        partition_i.height = partition_i_inicial.height;
        partition_i.xfinal = partition_i_inicial.xfinal;
        partition_i.yfinal = partition_i_inicial.yfinal;
        partition_i.backfill = partition_i_inicial.backfill;
        partition_i.legendfill = partition_i_inicial.legendfill;
        partition_i.radius = partition_i_inicial.radius;
        partition_i.legenda = partition_i_inicial.legenda;
        partition_i.debug = partition_i_inicial.debug;
    }

    drawGraph(){
 
        //Setup
        this.#posicao_inicial_em_x = this.xmargin * 1.5; 
        this.#posicao_final_em_x = this.#cw - this.xmargin;
        this.#posicao_final_em_y = this.#ch - this.ymargin;
        this.#tamanhomax_da_linha_unidades = (this.#cw - (1.5 * this.xmargin + this.xmargin))

        this.#elems = Math.abs(this.perioddurationseconds/this.periodseconds); //número de divisões de tempo
        //this.#message_debug("this.#elems: " + this.#elems);
        this.#pitch = Math.ceil(this.#tamanhomax_da_linha_unidades / this.#elems);	//largura de cada espaço temporal
        //this.#message_debug("this.#pitch: " + this.#pitch);

        this.#drawFrame();
        this.#drawpartitionwindows();
        
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

        if (countwindowpartitions > 0){

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

    /**
     * Draws a rounded rectangle using the current state of the canvas.
     * If you omit the last three params, it will draw a rectangle
     * outline with a 5 pixel border radius
     * @param {CanvasRenderingContext2D} ctx
     * @param {Number} x The top left x coordinate
     * @param {Number} y The top left y coordinate
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     * @param {Number} [radius = 5] The corner radius; It can also be an object 
     *                 to specify different radii for corners
     * @param {Number} [radius.tl = 0] Top left
     * @param {Number} [radius.tr = 0] Top right
     * @param {Number} [radius.br = 0] Bottom right
     * @param {Number} [radius.bl = 0] Bottom left
     * @param {Boolean} [fill = false] Whether to fill the rectangle.
     * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
     */
    #roundRect( ctx, x, y, width, height, radius = 5, fill = false, stroke = true) {

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
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
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

    #roundRect_and_text_debug(backfill, ctx, x, y, width, height, radius = 5, fill = true, stroke = true, legendafill, legenda) {

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

        this.#message_debug("Partition debug-------------------------------------"); 
        this.#message_debug("x: " +  x);
        this.#message_debug("y: " +  y);
        this.#message_debug("width: " +  width);
        this.#message_debug("height: " +  height);
        this.#message_debug("radius.tl: " +  radius.tl);
        this.#message_debug("radius.tr: " +  radius.tr);
        this.#message_debug("radius.bl: " +  radius.bl);
        this.#message_debug("radius.br: " +  radius.br);
        this.#message_debug("fill: " + fill.toString());
        this.#message_debug("stroke: " + stroke.toString());
        this.#message_debug("legendafill: " + legendafill);
        this.#message_debug("legendafill: " + legenda);
        this.#message_debug("-------------------------------------------------------------"); 

        this.#criar_ficheiro_debug(this.mensagem_debug);

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

    #roundRect_and_extline(ctx, x, y, width, height, radius = 5, stroke = true) {

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

        if (stroke) {
            ctx.stroke();
        }

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



