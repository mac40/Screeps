// The Mayor is in charge of handling the population of each room

var Mayor = {

    work: function () {
        _.forEach(Game.rooms, function(room){
            var laws = Legislator.work(room);
            RegistryOffice.work(room, laws);
        })
    }
};

var Legislator = {
    work: function(room) {
        var laws = {}

        // Set martial law if there are enemies in the room
        if (_.size(room.find(FIND_HOSTILE_CREEPS)) > 0) {
            laws.martial = true;
        }
        else {
            laws.martial = false;
        }

        return laws;
    }
};

var RegistryOffice = {
    /**
     * The registry office is in charge of maintaining the creeps balance correct
     * based on laws and current population
     */

    work: function(room, laws) {
        var census = this.census(room);
        this.birthControl(room, laws, census);
    },

    census: function(room){
        var harvesterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Harvester'
                )
            }
        }));

        var builderNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Builder'
                )
            }
        }));

        var fighterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Fighter'
                )
            }

        }));

        var buildingNumber = _.size(room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return (
                    structure.structureType == STRUCTURE_CONTROLLER ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER
                )
            }
        }));

        return {
            harvesterNumber: harvesterNumber,
            builderNumber: builderNumber,
            fighterNumber: fighterNumber,
            buildingNumber: buildingNumber
        }
    },

    birthControl: function(room, laws, census){
        /**
         * Spawn Priority:
         * 1. Harvesters
         * 2. Builders
         * 3. Fighters
         * 
         * Spawn priority can be suppressed or changed with laws
         */

        // Harvesters spawn rules
        if (census.harvesterNumber < _.size(room.find(FIND_SOURCES))) {
            MaternityWard.spawnHarvester(room.find(FIND_MY_SPAWNS)[0]);
        }

        // Builders spawn rules
        else if (census.builderNumber < census.buildingNumber && !laws.martial) {
            MaternityWard.spawnBuilder(room.find(FIND_MY_SPAWNS)[0]);
        }

        // Fighters spawn rules
        else if (census.fighterNumber < 3 + _.size(room.find(FIND_HOSTILE_CREEPS))) {
            MaternityWard.spawnFighter(room.find(FIND_MY_SPAWNS)[0]);
        }
    }
};

var MaternityWard = {
    /**
     * The maternity ward is in charge of spawning new creeps
     */

    bodies: {
        SimpleHarvester: [WORK, CARRY, CARRY, MOVE, MOVE],
        SimpleBuilder: [WORK, CARRY, MOVE],
        SimpleFighter: [TOUGH, RANGED_ATTACK, MOVE, MOVE]
    },

    genName: function (type) {
        var name = new Date();
        name = type + ' ' + name.getTime();
        return name;
    },

    spawnHarvester: function (spawn, quality) {
        // Generate Name
        var name = this.genName('Harvester');

        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(this.bodies.SimpleHarvester, name, {
            memory: {
                role: 'Harvester'
            }
        })
    },

    spawnBuilder: function (spawn, quality) {
        // Generate Name
        var name = this.genName('Builder');

        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(this.bodies.SimpleBuilder, name, {
            memory: {
                role: 'Builder'
            }
        })
    },

    spawnFighter: function (spawn, quality) {
        // Generate Name
        var name = this.genName('Fighter');

        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(this.bodies.SimpleFighter, name, {
            memory: {
                role: 'Fighter'
            }
        })
    }
};

var landRegistry = {
    work: function(room, laws){
        return NaN;
    }
};

module.exports = Mayor;