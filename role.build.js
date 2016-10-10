var roleBuild = {

    /** @param {Creep} Creep **/
    run: function(creep) {


        if(creep.memory.working == 'Y') {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy > 49
        });
            if(creep.withdraw(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            if (creep.carry.energy == creep.carryCapacity){creep.memory.working = 'N'}
        }
        else if (creep.memory.working == 'N')  {
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                if ( _.sum(creep.carry) == 0){creep.memory.working = 'Y'}
            }
            if (target == undefined){
                creep.moveTo(Game.flags['BuildRally'])
            }
            if ( _.sum(creep.carry) == 0){creep.memory.working = 'Y'}
        }

    if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length == 0){
       creep.suicide()
    }
}};

module.exports = roleBuild;