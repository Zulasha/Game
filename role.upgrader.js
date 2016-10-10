var roleUpgrade = {

    /** @param {Creep} Creep **/
    run: function(creep) {


        if(creep.memory.working == 'Y') {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            creep.harvest(sources);
            creep.moveTo(Game.flags['UpSpot']);
            if (creep.carry.energy == creep.carryCapacity){creep.memory.working = 'N'}
        }
        else if (creep.memory.working == 'N')  {

            if(creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                if ( _.sum(creep.carry) == 0){creep.memory.working = 'Y'}
            }
            if ( _.sum(creep.carry) == 0){creep.memory.working = 'Y'}
        }
    }
};

module.exports = roleUpgrade;