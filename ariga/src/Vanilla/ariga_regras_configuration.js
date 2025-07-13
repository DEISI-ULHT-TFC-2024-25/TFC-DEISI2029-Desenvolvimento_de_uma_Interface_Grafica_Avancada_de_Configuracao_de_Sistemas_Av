function regra_verifica_numero_cores(configuration, partition_cores_necessarios, hash_p){

    let numcores = Number(configuration.airconfiguration_obj.requiredcores);

    if (Number(partition_cores_necessarios) > numcores) {
        hash_p['mensagem'] = 'Numero de cores definidos para a partition: ' + partition_cores_necessarios + ', não pode ser superior ao requerido no AirConfiguration: ' + numcores + '.';
        return 0;
    }else{
        return 1;
    }

}

function regra_verifica_numero_cores_n(configuration, hash_p){

    let numcores = Number(configuration.airconfiguration_obj.requiredcores);
    let encontrou = 0;
    let count = configuration.partitions_obj.length;
    let i = 0;
    let corespart = 0;

    if(count == 0) return 1;

    while(encontrou == 0 && i < count){
         
        corespart = Number(configuration.partitions_obj[i].partitionconfiguration_obj.cores);

        if (corespart > numcores){
            encontrou = 1;
        }else{
            i++;
        }
    }

    if (encontrou == 1) {
        hash_p['mensagem'] = 'Numero de cores definidos para a Partition indice ' + i + ': '  + corespart + ', não pode ser superior ao requerido no AirConfiguration: ' + numcores + '.';
        return 0;
    }else{
        return 1;
    }

}

function regra_verifica_perioddurationseconds_periodseconds(perioddurationseconds, periodseconds, hash_p){

    let result = Math.round(100000 * perioddurationseconds) % (100000 * periodseconds);

    if (result > 0) {
        hash_p['mensagem'] = 'Period duration seconds: ' + perioddurationseconds + ', não é um valor multiplo de Period seconds: ' + periodseconds + '.';
        return 0;
    }else{
        return 1;
    }
}

function regra_verifica_perioddurationseconds_periodseconds_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let perioddurationseconds = 0;
    let periodseconds = 0;
    let result = 0;
    let expreg = /[0-9]{1}(\.)(\d{5})$/;

    if(count == 0) return 1;

    while(encontrou == 0 && i < count){

        perioddurationseconds = configuration.partitionschedule_obj[i].perioddurationseconds;
        periodseconds = configuration.partitionschedule_obj[i].periodseconds;

        if (perioddurationseconds.match(expreg) == null) {
            encontrou = 2;
        }

        if (encontrou == 0){
            if (periodseconds.match(expreg) == null) {
                encontrou = 3;
            }
        }
            
        if (encontrou == 0){

            result = Math.round(100000 * perioddurationseconds) % (100000 * periodseconds);
            
            if (result > 0) {
                encontrou = 1;
            }else{
                i++;
            }
        }    
    }

    if (encontrou == 2) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + " o Period duration seconds: Deve respeitar o formato x.xxxxx!...";
        return 0; 
    }

    if (encontrou == 3) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + " o Period seconds: Deve respeitar o formato x.xxxxx!...";
        return 0; 
    }

    if (encontrou == 1) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' o Period duration seconds: ' + perioddurationseconds + ', não é um valor multiplo de Period seconds: ' + periodseconds + '.';
        return 0;
    }

    return 1;  
}


function regra_verifica_windowstartseconds_periodseconds(windowstartseconds, periodseconds, hash_p){

    if (windowstartseconds == 0) return 1;
    
    let result = Math.round(100000 * windowstartseconds) % (100000 * periodseconds);

    if (result > 0) {
        hash_p['mensagem'] = 'O valor para Window start seconds: ' + windowstartseconds + ', pode ser zero ou um valor multiplo de Period seconds: ' + periodseconds + '.';
        return 0;
    }else{
        return 1;
    }
}

function regra_verifica_windowstartseconds_periodseconds_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let windowstartseconds = 0;
    let periodseconds = 0;
    let result = 0;
    let expreg = /[0-9]{1}(\.)(\d{5})$/;
    let j = 0;
    let count2 = 0;

    while(encontrou == 0 && i < count){

        periodseconds = configuration.partitionschedule_obj[i].periodseconds;
        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length;
        j = 0;

        while(encontrou == 0 && j < count2){

            windowstartseconds = configuration.partitionschedule_obj[i].windowschedule_obj[j].windowstartseconds;

            if (windowstartseconds.match(expreg) == null) {
                encontrou = 2;
            }    

            if (encontrou == 0){

                if (windowstartseconds != 0){
                    result = Math.round(100000 * windowstartseconds) % (100000 * periodseconds);
                }else{
                    result = 0;
                }
                    
                
                if (result > 0) {
                    encontrou = 1;
                }else{
                    j++;
                }

            }
        }
        if (encontrou == 0) i++;
    }

    if (encontrou == 2) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', o Window start seconds: Deve respeitar o formato x.xxxxx!...';
        return 0; 
    }

    if (encontrou == 1) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ' ,o valor para Window start seconds: ' + windowstartseconds + ', pode ser zero ou um valor multiplo de Period seconds: ' + periodseconds + '.';
        return 0; 
    }
    
    return 1;
}


function regra_verifica_windowdurationseconds_periodseconds(windowdurationseconds, windowstartseconds, periodseconds, perioddurationseconds, hash_p){

    let soma = 0;

    if (windowdurationseconds == 0){
        hash_p['mensagem'] = 'O Window duration seconds: ' + windowdurationseconds + ' não pode ser zero' + '.';
        return 0;
    }
    
    if (windowdurationseconds > perioddurationseconds){
        hash_p['mensagem'] = 'O Window duration seconds: ' + windowdurationseconds + ' não pode ser superior ao Period duration seconds ' + perioddurationseconds + '.';
        return 0;
    }

    result = Math.round(100000 * windowdurationseconds) % (100000 * periodseconds);

    if (result > 0){
        hash_p['mensagem'] =  'O valor para Window duration seconds: ' + windowdurationseconds + ', tem de ser multiplo de Period seconds: ' + periodseconds + '.';
        return 0;
    }

    soma = Math.round(100000 * windowdurationseconds) + (100000 * windowstartseconds);

    if (soma > Math.round((100000 * perioddurationseconds))) {
        hash_p['mensagem'] = 'O valor para Window duration seconds é inválido: ' + windowdurationseconds + ', tendo em conta que o Window start seconds é: ' + windowstartseconds + ' ultrapassando o limite Period duration seconds ' + perioddurationseconds + '.';
        return 0;
    }

    return 1;
}

function regra_verifica_windowdurationseconds_periodseconds_n(configuration, hash_p){

    let soma = 0;
    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let windowstartseconds = 0;
    let windowdurationseconds = 0;
    let periodseconds = 0;
    let perioddurationseconds = 0;
    let result = 0;
    let expreg = /[0-9]{1}(\.)(\d{5})$/;
    let j = 0;
    let count2 = 0;

    while(encontrou == 0 && i < count){

        periodseconds = configuration.partitionschedule_obj[i].periodseconds;
        perioddurationseconds = configuration.partitionschedule_obj[i].perioddurationseconds;

        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length;
        j = 0;

        while(encontrou == 0 && j < count2){

            windowstartseconds = configuration.partitionschedule_obj[i].windowschedule_obj[j].windowstartseconds;
            windowdurationseconds = configuration.partitionschedule_obj[i].windowschedule_obj[j].windowdurationseconds;

            if (windowdurationseconds.match(expreg) == null) {
                encontrou = 1;
            }    

            if (encontrou == 0){

                if (windowdurationseconds == 0){
                    encontrou = 2;
                }

            }

            if (encontrou == 0){

                if (windowdurationseconds > perioddurationseconds){
                    encontrou = 3;
                }
            }

            if (encontrou == 0){

                result = Math.round(100000 * windowdurationseconds) % (100000 * periodseconds);

                if (result > 0){
                    encontrou = 4;
                }
            }

            if (encontrou == 0){

                soma = Math.round(100000 * windowdurationseconds) + (100000 * windowstartseconds);

                if (soma > Math.round(100000 * perioddurationseconds)){
                    encontrou = 5;
                }
            }

            if (encontrou == 0){
                j++;
            }

        }

        if (encontrou == 0){
            i++;
        }
    }
    
    if (encontrou == 1) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', o Window duration seconds: Deve respeitar o formato x.xxxxx!...';
        return 0; 
    }

    if (encontrou == 2) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', o Window duration seconds: ' + windowdurationseconds + ' não pode ser zero' + '.';
        return 0; 
    }

    if (encontrou == 3) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', Window duration seconds: ' + windowdurationseconds + ' não pode ser superior ao Period duration seconds ' + perioddurationseconds + '.';
        return 0; 
    }            
    
    if (encontrou == 4) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', o valor para Window duration seconds: ' + windowdurationseconds + ', tem de ser multiplo de Period seconds: ' + periodseconds + '.';
        return 0; 
    }   

    if (encontrou == 5) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' e Window schedule com indice ' + j  + ', o valor para Window duration seconds é inválido: ' + windowdurationseconds + ', tendo em conta que o Window start seconds é: ' + windowstartseconds + ' ultrapassando o limite Period duration seconds ' + perioddurationseconds + '.';
        return 0; 
    } 

    return 1;
}

function regra_verifica_windowdurationseconds_total(somawindowdurationseconds, perioddurationseconds, indice, hash_p){

    if (somawindowdurationseconds > Math.round(100000 * perioddurationseconds)){
        hash_p['mensagem'] = 'A soma de Window duration seconds: ' + (somawindowdurationseconds * 0.00001).toFixed(5) + ' para PS' + indice + ' não pode ser superior ao Period duration seconds ' + perioddurationseconds + '.';
        return 0;
    } 

    return 1;
}

function regra_verifica_windowdurationseconds_total_n(configuration, hash_p){

    let soma = 0;
    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let windowdurationseconds = 0;
    let perioddurationseconds = 0;
    let j = 0;
    let count2 = 0;    

    while(encontrou == 0 && i < count){

        perioddurationseconds = Math.round(100000 *configuration.partitionschedule_obj[i].perioddurationseconds);

        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length;
        j = 0;
        soma = 0;

        while(j < count2){

            windowdurationseconds = configuration.partitionschedule_obj[i].windowschedule_obj[j].windowdurationseconds;
            soma = soma + Math.round(100000 * windowdurationseconds);
            j++;    
        }

        if (soma > perioddurationseconds){
            encontrou = 1;
        }else{
            i++;
        }
    }

    if(encontrou == 1){

        hash_p['mensagem'] = 'A soma de Window duration seconds: ' + (soma * 0.00001).toFixed(5) + ' para PS' + i + ' não pode ser superior ao Period duration seconds ' + perioddurationseconds + '.';
        return 0;
    }

    return 1;
}

function regra_verifica_numero_cores_ps(configuration, partition_sch_cores_necessarios, hash_p){

    let numcores = configuration.airconfiguration_obj.requiredcores;

    if (partition_sch_cores_necessarios > numcores) {
        hash_p['mensagem'] = 'Numero de cores definidos para a partition schedule: ' + partition_sch_cores_necessarios + ', não pode ser superior ao requerido no AirConfiguration: ' + numcores + '.';
        return 0;
    }else{
        return 1;
    }

}

function regra_verifica_numero_cores_ps_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let numcores = configuration.airconfiguration_obj.requiredcores;

    while(encontrou == 0 && i < count){

        partition_sch_cores_necessarios = configuration.partitionschedule_obj[i].windowconfiguration_obj.cores;

        if (Number(partition_sch_cores_necessarios) > Number(numcores)){
            encontrou = 1;
        }else{
            i++;
        }

    }

    if(encontrou == 1){
        hash_p['mensagem'] = 'Numero de cores definidos para a partition schedule ' + i + ': ' + partition_sch_cores_necessarios + ', não pode ser superior ao requerido no AirConfiguration: ' + numcores + '.';
        return 0;
    }

    return 1;
}

function regra_verifica_sobreposicao(partitionschedule_windows, coreidentifier, windowdurationseconds, windowstartseconds, nova, indice_window_schedule, hash_p){

    let count = partitionschedule_windows.length;
    let i = 0;
    let encontrou = 0;
    let windowstartseconds_ptestar = 0;
    let windowstartseconds_p = 0;
    let windowdurationseconds_ptestar = 0;
    let windowdurationseconds_p = 0;


    if (count == 0) return 1;

    windowstartseconds_ptestar = Math.round(100000 * windowstartseconds);
    windowdurationseconds_ptestar = Math.round(100000 * windowdurationseconds);

    if (nova == true){
        
        while (encontrou == 0 && i < count){

            if(partitionschedule_windows[i].coreidentifier == coreidentifier){
            
                windowstartseconds_p = Math.round(100000 * partitionschedule_windows[i].windowstartseconds);
                windowdurationseconds_p = Math.round(100000 * partitionschedule_windows[i].windowdurationseconds);

                if (windowstartseconds_ptestar >= windowstartseconds_p && windowstartseconds_ptestar < windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;    
                }

                if (windowstartseconds_ptestar + windowdurationseconds_ptestar > windowstartseconds_p && windowstartseconds_ptestar + windowdurationseconds_ptestar <= windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;    
                }

                 if (windowstartseconds_ptestar <= windowstartseconds_p && windowstartseconds_ptestar + windowdurationseconds_ptestar >= windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;  
                 }

                if (encontrou == 0) i++;  

            }else{
                i++;
            }
        }

        if (encontrou == 1){
            hash_p['mensagem'] = 'A Window schedule que está a criar está sobreposta com a Window schedule :' + partitionschedule_windows[i].windowidentifier + '.';
            return 0;
        }

    }else{

        while (encontrou == 0 && i < count){

            windowstartseconds_p = Math.round(100000 * partitionschedule_windows[i].windowstartseconds);
            windowdurationseconds_p = Math.round(100000 * partitionschedule_windows[i].windowdurationseconds);

            if(partitionschedule_windows[i].coreidentifier == coreidentifier && i != indice_window_schedule){

                if (windowstartseconds_ptestar >= windowstartseconds_p && windowstartseconds_ptestar < windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;    
                }

                if (windowstartseconds_ptestar + windowdurationseconds_ptestar > windowstartseconds_p && windowstartseconds_ptestar + windowdurationseconds_ptestar <= windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;    
                }

                if (windowstartseconds_ptestar <= windowstartseconds_p && windowstartseconds_ptestar + windowdurationseconds_ptestar >= windowstartseconds_p + windowdurationseconds_p){
                    encontrou = 1;  
                }

                if (encontrou == 0) i++;  

            }else{
                i++;
            }
        }

        if (encontrou == 1){
            hash_p['mensagem'] = 'A Window schedule que está a alterar está sobreposta com a Window schedule :' + partitionschedule_windows[i].windowidentifier + '.';
            return 0;
        }
    }

    return 1;
}

function regra_verifica_sobreposicao_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let count2 = 0;
    let count3 = 0;
    let i = 0;
    let j = 0;
    let l = 0;
    let encontrou = 0;
    let windowstartseconds_ptestar = 0;
    let windowstartseconds_p = 0;
    let windowdurationseconds_ptestar = 0;
    let coreidentifier_ptestar = 0;
    let coreidentifier_p = 0;
    let windowdurationseconds_p = 0;


    while(encontrou == 0 && i < count){

        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length;
        count3 = count2;

        j = 0;

        while(encontrou == 0 && j < count2){

            windowstartseconds_ptestar = Math.round(100000 * configuration.partitionschedule_obj[i].windowschedule_obj[j].windowstartseconds);
            windowdurationseconds_ptestar = Math.round(100000 * configuration.partitionschedule_obj[i].windowschedule_obj[j].windowdurationseconds);
            coreidentifier_ptestar = configuration.partitionschedule_obj[i].windowschedule_obj[j].coreidentifier;

            l = 0;

            while(encontrou == 0 && l < count3){

                coreidentifier_p = configuration.partitionschedule_obj[i].windowschedule_obj[l].coreidentifier; 

                if (coreidentifier_p == coreidentifier_ptestar && j != l){

                    windowstartseconds_p = Math.round(100000 * configuration.partitionschedule_obj[i].windowschedule_obj[l].windowstartseconds);
                    windowdurationseconds_p = Math.round(100000 * configuration.partitionschedule_obj[i].windowschedule_obj[l].windowdurationseconds);

                    if (windowstartseconds_ptestar >= windowstartseconds_p && windowstartseconds_ptestar < windowstartseconds_p + windowdurationseconds_p){
                        encontrou = 1;    
                    }

                    if (windowstartseconds_ptestar + windowdurationseconds_ptestar > windowstartseconds_p && windowstartseconds_ptestar + windowdurationseconds_ptestar <= windowstartseconds_p + windowdurationseconds_p){
                        encontrou = 1;    
                    }
                    
                    if (encontrou == 0){
                        l++;
                    }

                }else{
                    l++;
                }
            }

            if (encontrou == 0){
                j++;
            }

        }

        if (encontrou == 0){
            i++;
        }

    }

     if (encontrou == 1){
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' a Window schedule com indice ' + j + ' está sobreposta com Window schedule com indice ' + l + '.';
        return 0;
    }

    return 1;
}

function regra_verifica_cores(partitionschedule, partitionschedule_windows, coreidentifier, nova, indice_window_schedule, hash_p){

    let count = partitionschedule_windows.length;
    let i = 0;
    let coreidentifier_p;
    let arraycoreidentifier = new Array();
    let indiceretornado = 0;

    let numcores = Number(partitionschedule.windowconfiguration_obj.cores);

    if (count == 0) return 1;

    if (nova == true){
        
        for(i = 0; i < count; i++){

            coreidentifier_p = partitionschedule_windows[i].coreidentifier;
            indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);
            if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
            coreidentifier_p = 0;
            indiceretornado = 0;
        }

        indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier);
        if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier;

    }else{

        for(i = 0; i < count; i++){
            if(i != indice_window_schedule){


                coreidentifier_p = partitionschedule_windows[i].coreidentifier;
                indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);

                if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
                coreidentifier_p = 0;
                indiceretornado = 0;
            }
        }

        indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier);
        if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier;

    }

    count = arraycoreidentifier.length;

    if(count > numcores){
        hash_p['mensagem'] = 'De Windows schedules foram identificados ' + count +  ' cores quando no partition schedule foram identificados apenas ' + numcores + ' cores.';
        return 0;
    }

    return 1

}

function regra_verifica_cores_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let i = 0;
    let coreidentifier_p;
    let arraycoreidentifier = null;
    let indiceretornado = 0;
    let count2 = 0;
    let encontrou = 0;
    let numcores = 0;
    let count_num_cores = 0;


    while(encontrou == 0 && i < count){

        numcores = Number(configuration.partitionschedule_obj[i].windowconfiguration_obj.cores);
        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length;
        j = 0;

        if (count2 > 0){

            arraycoreidentifier = null;
            arraycoreidentifier = new Array();
            
            for(j = 0; j < count2; j++){

                coreidentifier_p = configuration.partitionschedule_obj[i].windowschedule_obj[j].coreidentifier;
                indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);
                if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
                coreidentifier_p = 0;
                indiceretornado = 0;
            }

            count_num_cores = arraycoreidentifier.length;

            if(count_num_cores > numcores){
                encontrou = 1;
            }else{
                i++;
            }

        }else{
            i++;
        }


    }

    if(encontrou == 1){
        hash_p['mensagem'] = 'De Windows schedules foram identificados ' + count_num_cores +  ' cores quando no partition schedule foram identificados apenas ' + numcores + ' cores.';
        return 0;
    }

    return 1;

}


function regra_verifica_cores_partition(partitionschedule_windows, partitions, partitionconfigurationid, coreidentifier, nova, indice_window_schedule, hash_p){
    
    let count = partitionschedule_windows.length;
    let i = 0;
    let coreidentifier_p;
    let idpartitionconfiguration_p;
    let arraycoreidentifier = new Array();
    let indiceretornado = 0;
    let numcorespartition = 0;
    let partitionname = "";

    indicepartition = devolve_indice_array_partition(partitionconfigurationid);

    if (indicepartition < 0) return 0

    numcorespartition = Number(partitions[indicepartition].partitionconfiguration_obj.cores);
    partitionname = partitions[indicepartition].partitionname;

    if (nova == true){
        
        for(i = 0; i < count; i++){
            idpartitionconfiguration_p = partitionschedule_windows[i].idpartitionconfiguration;

            if (idpartitionconfiguration_p == partitionconfigurationid){
                
                coreidentifier_p = partitionschedule_windows[i].coreidentifier;
                indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);
                if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
                coreidentifier_p = 0;
                indiceretornado = 0;

            }
        }

        indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier);
        if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier;

    }else{

        for(i = 0; i < count; i++){
            idpartitionconfiguration_p = partitionschedule_windows[i].idpartitionconfiguration;
            if (idpartitionconfiguration_p == partitionconfigurationid && i != indice_window_schedule){

                coreidentifier_p = partitionschedule_windows[i].coreidentifier;
                indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);
                if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
                coreidentifier_p = 0;
                indiceretornado = 0;

            }
        }

        indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier);
        if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier;
    }

    count = arraycoreidentifier.length;

    if(count > numcorespartition){
        hash_p['mensagem'] = 'De Windows schedules foram identificados ' + count +  ' cores, para a partition ' + partitionname + ' quando na partition foram identificados apenas ' + numcorespartition + ' cores.';
        return 0;
    }

    return 1;
}

function regra_verifica_cores_partition_n(configuration, hash_p){
    
    let count = configuration.partitionschedule_obj.length;
    let count2 = 0;
    let count3 = 0;
    let i = 0;
    let j = 0;
    let l = 0;
    let coreidentifier_p;
    let idpartitionconfiguration_p;
    let idpartitionconfiguration_ptestar;
    let arraycoreidentifier = null;
    let indiceretornado = 0;
    let numcorespartition = 0;
    let partitionname = "";
    let count_partition_cores = 0;
    let encontrou = 0;

    while(encontrou == 0 && i < count){
        

        count2 = configuration.partitionschedule_obj[i].windowschedule_obj.length; 
        count3 = count2;
        j = 0;

        while(encontrou == 0 && j < count2){

            idpartitionconfiguration_ptestar = configuration.partitionschedule_obj[i].windowschedule_obj[j].idpartitionconfiguration;
            numcorespartition = Number(configuration.partitions_obj[idpartitionconfiguration_ptestar - 1].partitionconfiguration_obj.cores);
            partitionname = configuration.partitions_obj[idpartitionconfiguration_ptestar - 1].partitionname;

            arraycoreidentifier = null;
            arraycoreidentifier = new Array()
            l = 0;

            for(l = 0; l < count3; l++){

                 idpartitionconfiguration_p = configuration.partitionschedule_obj[i].windowschedule_obj[l].idpartitionconfiguration;  

                 if(idpartitionconfiguration_p == idpartitionconfiguration_ptestar){

                    coreidentifier_p = configuration.partitionschedule_obj[i].windowschedule_obj[l].coreidentifier;
                    indiceretornado = arraycoreidentifier.lastIndexOf(coreidentifier_p);
                    if (indiceretornado < 0) arraycoreidentifier[arraycoreidentifier.length] = coreidentifier_p;
                    coreidentifier_p = 0;
                    indiceretornado = 0;
                 }

            }

            count_partition_cores = arraycoreidentifier.length;

            if(count_partition_cores > numcorespartition){
                encontrou = 1;
            }

            if (encontrou == 0){
                j++;
            }
        }

        if (encontrou == 0){
            i++;
        }

    }

    if (encontrou == 1){
        hash_p['mensagem'] = 'Para a PS indice ' + i + ' ,nas Windows schedules foram identificados ' + count_partition_cores +  ' cores, para a partition ' + partitionname + ' quando na partition foram identificados apenas ' + numcorespartition + ' cores.';
        return 0;
    }

    return 1;
}

function regra_verifica_perioddurationseconds_periodseconds_escala(perioddurationseconds, periodseconds, hash_p){

    let result = Math.round(100000 * perioddurationseconds) / (100000 * periodseconds);

    if (result > 100) {
        hash_p['mensagem'] = 'Period duration seconds deve incorporar no máximo 100 Period seconds respeitando a escala igual ou superior 1/100, neste caso o valor é superior a 100: ' + result + '.';
        return 0;
    }else{
        return 1;
    }
}

function regra_verifica_perioddurationseconds_periodseconds_escala_n(configuration, hash_p){

    let count = configuration.partitionschedule_obj.length;
    let encontrou = 0;
    let i = 0;
    let perioddurationseconds = 0;
    let periodseconds = 0;
    let result = 0;

    if(count == 0) return 1;

    while(encontrou == 0 && i < count){

        perioddurationseconds = configuration.partitionschedule_obj[i].perioddurationseconds;
        periodseconds = configuration.partitionschedule_obj[i].periodseconds;

        if (encontrou == 0){

            result = Math.round(100000 * perioddurationseconds) / (100000 * periodseconds);
            
            if (result > 100) {
                encontrou = 1;
            }else{
                i++;
            }
        }    
    }

    if (encontrou == 1) {
        hash_p['mensagem'] = 'Na Partition schedule com indice ' + i + ' Period duration seconds deve incorporar no máximo 100 Period seconds respeitando a escala igual ou superior 1/100, neste caso o valor é superior a 100: ' + result + '.';
        return 0;
    }

    return 1;  
}

function devolve_parametro_escala_x(configuration, indive_ps){

    if (indive_ps == null || indive_ps < 0) return 1
    let perioddurationseconds = configuration.partitionschedule_obj[indive_ps].perioddurationseconds;
    let periodseconds = configuration.partitionschedule_obj[indive_ps].periodseconds;
    let result = Math.round(100000 * perioddurationseconds) / (100000 * periodseconds);

    if (result == null || result < 1) return 1

    return result;        
}



