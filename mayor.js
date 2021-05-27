// The Mayor is in charge of handling the population of each room

var Mayor = {

    work: function () {
        _.forEach(Game.rooms, function(room){
            Legislator.work(room);
            RegistryOffice.work(room);
            LandRegistry.work(room);
        })
    }
};

var Legislator = {
    /**
     * The Legislator is in charge of setting up laws,
     * based on the roomController level, that will define
     * the RegistryOffice, LandRegistry and workers behaviour
     */
    work: function(room) {

        room.memory.laws = {};

        switch (room.controller.level) {
            case 1:
                room.memory.laws.promoteHarvesting = true;
                room.memory.laws.forceUpgrade = true;
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
        }

        // ----- MARTIAL LAW ----- //
        if (_.size(room.find(FIND_HOSTILE_CREEPS)) > 0) {
            room.memory.laws.Martial = true;
        }
        else {
            room.memory.laws.Martial = false;
        }
    }
};

var RegistryOffice = {
    /**
     * The registry office is in charge of maintaining the creeps balance correct
     * based on laws and current population
     */

    work: function(room) {
        var census = this.census(room);
        this.populationControl(room, census);
    },

    census: function(room){
        var harvesterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Harvester'
                );
            }
        }));

        var builderNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Builder'
                );
            }
        }));

        var fighterNumber = _.size(room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return (
                    creep.memory.role == 'Fighter'
                );
            }

        }));

        return {
            harvesterNumber: harvesterNumber,
            builderNumber: builderNumber,
            fighterNumber: fighterNumber,
        }
    },

    willAttorney: function(){
        /**
         * The will attorney handles the memories of
         * dead creeps
         */
        for (var creep in Memory.creeps){
            if (!Game.creeps[creep]){
                delete Memory.creeps[creep];
            }
        }
    },

    populationControl: function(room, census){

        this.willAttorney();

        if (census.harvesterNumber < _.size(room.find(FIND_SOURCES))*2) {
            MaternityWard.spawnHarvester(room.find(FIND_MY_SPAWNS)[0]);
        }
        else if (census.builderNumber < 3) {
            MaternityWard.spawnBuilder(room.find(FIND_MY_SPAWNS)[0]);
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
                role: 'Harvester',
                hash: parseInt(name.substring(10))
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

var LandRegistry = {
    work: function(room){
        // TODO
    },

    planExtention: function(room) {
        // TODO
    },

    planRoad: function(room, from, to) {
        to = { pos: to.pos, range: 1 };
        var path = PathFinder.search(from.pos, to).path;
        _.forEach(path, function (pos) {
            room.createConstructionSite(pos, STRUCTURE_ROAD);
        });
    },

    planTower: function(room) {
        // TODO
    },

    planRampart: function(room) {
        // TODO
    },

    planWall: function(room) {
        // TODO
    },

    planSpawn: function(room) {
        // TODO
    }
};

module.exports = Mayor;