// The Workers Guild handles the job assignment and instruction of creeps across all syndicates

var EmploymentOffice = {

    /**
     * The Employment Office assign a job based on:
     * 1. The creep role
     * 2. The creep status
     * 3. The laws of the room the creep is in
     */

    assignJob: function(creep) {
        // ----- HARVESTER JOBS ----- //
        if (creep.memory.role == 'Harvester'){
            if (creep.store.getFreeCapacity() == 0) {
                creep.memory.job = "store_energy";
            }
            if (creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.job = "gather_energy";
            }
        }
        // ----- BUILDER JOBS ----- //
        else if (creep.memory.role == 'Builder'){
            if (creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.job = 'gather_energy';
            }
            if (creep.store.getFreeCapacity() == 0) {
                if(creep.room.memory.laws.forceUpgrade){
                    creep.memory.job = 'upgrade_controller';
                }
                else {
                    creep.memory.job = 'build';
                }
            }
        }
    }
}

var JobInstructor = {
    storeEnergy: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        });

        if (targets.length > 0 && creep.room.controller.ticksToDowngrade > 100) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            this.upgradeController(creep);
        }
    },

    gatherEnergy: function(creep) {
        if (creep.memory.role == 'Harvester') {
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

        else if (creep.memory.role == 'Builder'){
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },

    build: function(creep) {
        var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length) {
            if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSites[0]);
            }
        }
        else {
            this.upgradeController(creep);
        }
    },

    upgradeController: function(creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
        }
    }
}

module.exports.employmentOffice = EmploymentOffice;
module.exports.jobInstructor = JobInstructor;