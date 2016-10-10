var roleHarvester = require('role.harvester');
var roleUpgrade = require('role.upgrader');
var roleBuild = require('role.build');
var roleRepair = require('role.repair');
var roleCarry = require('role.carry');
var creepSpawn = require('creepspawn');

module.exports.loop = function () {


    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.Role == 'Harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.Role == 'Upgrade'){
            roleUpgrade.run(creep);
        }
        else if(creep.memory.Role == 'Build'){
            roleBuild.run(creep);
        }
        else if(creep.memory.Role == 'Repair'){
            roleRepair.run(creep);
        }
        else if(creep.memory.Role == 'Carry'){
            roleCarry.run(creep);
        }
    }
    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });

    if (Game.spawns['Spawn1'].room.energyAvailable > 299){
        creepSpawn.run()
    }
    /*
    if (Game.spawns['Spawn1'].room.controller.level < 3  || (_(Memory.creeps).filter({Role: 'Harvester'}).size() == 0 )) {
        if (_(Memory.creeps).filter({Role: 'Harvester'}).size() < 2) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], null, {Role: 'Harvester'});
        }
        else if (_(Memory.creeps).filter({Role: 'Upgrade'}).size() < 1) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], null, {Role: 'Upgrade', working: 'N'});
        }
        else if (_(Memory.creeps).filter({Role: 'Build'}).size() < 2 && Game.constructionSites.length > 0) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], null, {Role: 'Build', working: 'N'});
        }
        else if (_(Memory.creeps).filter({Role: 'Repair'}).size() < 1) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null, {Role: 'Repair'});
        }
        else if (_(Memory.creeps).filter({Role: 'Carry'}).size() < 1) {
            Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {Role: 'Carry'});
        }
    }
    else {
        if (_(Memory.creeps).filter({Role: 'Harvester'}).size() < 2) {
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], null, {Role: 'Harvester'});
        }
        else if (_(Memory.creeps).filter({Role: 'Carry'}).size() < 4) {
            Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], null, {Role: 'Carry', working: 'N'});
        }
        else if (_(Memory.creeps).filter({Role: 'Upgrade'}).size() < 1) {
            Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], null, {Role: 'Upgrade', working: 'N'});
        }
        else if (_(Memory.creeps).filter({Role: 'Build'}).size() < 2 && Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            Game.spawns['Spawn1'].createCreep([WORK, WORK,WORK, CARRY, MOVE,MOVE,MOVE], null, {Role: 'Build', working: 'N'});
        }
        else if (_(Memory.creeps).filter({Role: 'Repair'}).size() < 1) {
            Game.spawns['Spawn1'].createCreep([WORK,WORK, CARRY, MOVE,MOVE,MOVE], null, {Role: 'Repair'});
        }

    }
    */
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
});
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        } else if (tower.energy > tower.energyCapacity/2) {
            var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});
            targets.sort((a,b) => a.hits - b.hits);
            tower.repair(targets[0])
        }
    }
};