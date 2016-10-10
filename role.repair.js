var roleRepair = {

    /** @param {Creep} Creep **/
    run: function(creep) {

    if (creep.carry.energy == 0){
        var sor = Game.spawns['Spawn1'];
        creep.moveTo(sor);
        creep.withdraw(sor,RESOURCE_ENERGY)
    } else {
        var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax /*&& s.structureType != STRUCTURE_WALL*/
    });


        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        else {
            creep.moveTo(Game.flags['RepRally'])
        }
    }
    }
};

module.exports = roleRepair;
