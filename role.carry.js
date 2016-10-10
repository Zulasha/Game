var roleCarry = {

    /** @param {Creep} Creep **/
    run: function(creep) {
        if(creep.memory.working == "Y" ) {
            var sources = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            creep.pickup(sources);
            creep.withdraw(creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_CONTAINER)}),RESOURCE_ENERGY);
            for (i = 0; i < 2; i++) {
                if (_(Memory.creeps).filter({ctar: i + 1}).size() < 2) {
                    creep.memory.ctar = i + 1;
                }
            }
            var target = "Pickup" + creep.memory.ctar;
            creep.moveTo(Game.flags[target]);
            if(creep.carry.energy == creep.carryCapacity){
                creep.memory.working = "N"
            }
        }
        if (creep.memory.working == "N" ) {
            if (creep.carry.energy == 0) {
                creep.memory.working = "Y"
            }
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION)
                && s.energy < s.energyCapacity
            });
            if (structure == undefined){structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
            }); }
            if (structure == undefined){structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE) && s.energy < s.energyCapacity
            }); }
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }

        }
    }
};

module.exports = roleCarry;