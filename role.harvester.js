var roleHarvester = {

    /** @param {Creep} Creep **/
    run: function(creep) {
            if (creep.carry.energy < creep.carryCapacity ||  _(Memory.creeps).filter({Role: 'Carry'}).size() > 0) {
                for (i = 0; i < creep.room.find(FIND_SOURCES).length; i++) {
                    if (_(Memory.creeps).filter({tar: i + 1}).size() < 1) {
                        creep.memory.tar = i + 1;
                    }
                }
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                var target = "Mine" + creep.memory.tar;
                creep.harvest(sources);
                creep.moveTo(Game.flags[target]);
                if (_(Memory.creeps).filter({Role: 'Carry'}).size() > 0){
                    creep.drop(RESOURCE_ENERGY)
                }
            } else {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
                });
                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
    }};

module.exports = roleHarvester;