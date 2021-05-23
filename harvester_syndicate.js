// The harvester syndicate is in charge of the harvester creeps behaviour

var harvesterSyndicate = {
    work: function () {
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Harvester') {

                employmentOffice.assignJob(creep);

                if (creep.memory.job == "transfer_energy") {
                    jobInstructor.transferEnergy(creep);
                }
                else if (creep.memory.job == "gather_energy") {
                    jobInstructor.gatherEnergy(creep);
                }
            }
        })
    }
}

var employmentOffice = {
    assignJob: function(creep) {
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.job = "transfer_energy";
        }
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.job = "gather_energy";
        }
    }
}

var jobInstructor = {
    transferEnergy: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        });

        if (targets.length > 0 && creep.room.controller.ticksToDowngrade > 18000) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
            }
        }
    },

    gatherEnergy: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (_.size(Game.creeps) < _.size(sources)) {
            var selectedSource = creep.pos.findClosestByPath(FIND_SOURCES);
        }
        else {
            var selectedSource = sources[creep.memory.hash % _.size(sources)];
        }


        if (creep.harvest(selectedSource) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(selectedSource, { visualizePathStyle: { stroke: '#ffaa00' } }) == ERR_NO_PATH) {
                creep.memory.hash = creep.memory.hash + 1;
            }
        }
    }
}

module.exports = harvesterSyndicate;