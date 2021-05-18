// The harvester syndicate is in charge of the harvester creeps behaviour

var harvesterSyndicate = {
    work: function(){
        _.forEach(Game.creeps, function(creep){
            if(creep.memory.role == 'Harvester'){
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.job = "transfer_energy";
                } else if (creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.job = "gather_energy";
                }
                if (creep.memory.job == "transfer_energy") {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if (targets.length > 0) {
                        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                    else {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
                        }
                    }
                } else if (creep.memory.job == "gather_energy") {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        })
    }
}

module.exports = harvesterSyndicate;