var creepspawn = {

    run: function(){
        var roles = ['Harvester','Carry','Upgrade','Build','Repair'];
        var roleNum = [2,4,1,0,1];

        if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length > 0){
          roleNum[3] = 1;
        }

        for (i = 0; i < roles.length; i++){
            console.log(i);
            var body = [];
                if (roles[i] == 'Harvester'){
                    body = [MOVE, CARRY];
                    for (a = 0; a < Math.floor((Game.spawns['Spawn1'].room.energyAvailable - 100) / 150); a++) {
                        body.push(WORK,MOVE)
                    }
                } else if (roles[i] =='Carry') {
                    for (a = 0; a < Math.floor(Game.spawns['Spawn1'].room.energyAvailable / 150); a++) {
                        body.push(CARRY, CARRY, MOVE)
                    }
                } else {
                    for (a = 0 ; a < Math.floor(Game.spawns['Spawn1'].room.energyAvailable/200);a++){
                        body.push(WORK,CARRY,MOVE)
                    }
                }
                console.log(_(Memory.creeps).filter({Role: roles[i]}).size()+" "+roleNum[i]+' '+roles[i]);
        if (_(Memory.creeps).filter({Role: roles[i]}).size() < roleNum[i] ){
            Game.spawns['Spawn1'].createCreep(body, null, {Role: roles[i], working: 'N'});
            break;
        }

        }

    }



};

module.exports = creepspawn;