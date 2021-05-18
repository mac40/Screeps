// The Guild of Workers handle the behaviour of worker creeps

var workersGuild = {
    work: function(){
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Builder') {
                if(creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.job = 'gather_energy';
                }
                if(creep.store.getFreeCapacity() == 0) {
                    creep.memory.job = 'build';
                }
                if(creep.memory.job == 'gather_energy') {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                else if(creep.memory.job == 'build') {
                    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(constructionSites.length) {
                        if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSites[0]);
                        }
                    }
                }
            }
        })
    }
};

module.exports = workersGuild;