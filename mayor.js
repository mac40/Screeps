// The Mayor is in charge of handling the population of each room

// Harvester bodies
var SimpleHarvester = [WORK, CARRY, MOVE]

// Builder bodies
var SimpleBuilder = [WORK, CARRY, MOVE]

// Fighter bodies
var SimpleFighter = [TOUGH, ATTACK, MOVE, MOVE]

var Mayor = {

    work: function () {
        for(var room in Game.rooms){
            this.registryOffice(Game.rooms[room]);
        }
    },

    registryOffice: function(room){

        var harvesterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                return (
                    creep.memory.role == 'Harvester'
                )
            }
        }));

        var builderNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function(creep){
                return (
                    creep.memory.role == 'Builder'
                )
            }
        }));

        var fighterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                return (
                    creep.memory.role == 'Fighter'
                )
            }
            
        }));

        var buildingNumber = _.size(room.find(FIND_STRUCTURES, {
            filter: function(structure){
                return (
                    structure.structureType == STRUCTURE_CONTROLLER ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER
                )
            }
        }));

        var energySources = _.size(room.find(FIND_SOURCES));

        var spawns = room.find(FIND_MY_SPAWNS);

        var enemies = room.find(FIND_HOSTILE_CREEPS);

        if (harvesterNumber < energySources){
            this.spawnHarvester(spawns[0]);
        }
        else if (builderNumber < buildingNumber && _.size(enemies) == 0){
            this.spawnBuilder(spawns[0]);
        }
        else if (fighterNumber < 3 + _.size(enemies)){
            this.spawnFighter(spawns[0]);
        }
    },

    genName: function (type) {
        var name = new Date();
        name = type + ' ' + name.getTime();
        return name;
    },

    spawnHarvester: function(spawn, quality) {
        // Generate Name
        var name = this.genName('Harvester');
        
        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(SimpleHarvester, name, {
            memory: {
                role: 'Harvester'
            }
        })
    },

    spawnBuilder: function(spawn, quality) {
        // Generate Name
        var name = this.genName('Builder');

        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(SimpleBuilder, name, {
            memory: {
                role: 'Builder'
            }
        })
    },

    spawnFighter: function(spawn, quality){
        // Generate Name
        var name = this.genName('Fighter');

        // Select Quality
        // TODO: implement quality selection, simple harvesters for now

        // Generate Creep from passed Spawn
        spawn.spawnCreep(SimpleFighter, name, {
            memory: {
                role: 'Fighter'
            }
        })
    }
};

module.exports = Mayor;