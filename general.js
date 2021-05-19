// The General is in charge of the military creeps

var General = {
    work: function(){
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Fighter') {
                var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(enemy){
                    if(creep.attack(enemy) == ERR_NOT_IN_RANGE || creep.attack(enemy) == ERR_NO_BODYPART){ // Try to melee attack if in range and has body part
                        if (creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE || creep.rangedAttack(enemy) == ERR_NO_BODYPART) { // If unable to melee try to ranged attack if in range and has body part
                            if(creep.rangedAttack(enemy) == ERR_NO_BODYPART && creep.attack(enemy) == ERR_NO_BODYPART){ // If all fighting modules are lost flee
                                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
                            }
                            creep.moveTo(enemy);
                        }
                    }
                }
            }
        })
    }
}

module.exports = General;