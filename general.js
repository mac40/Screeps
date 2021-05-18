// The General is in charge of the military creeps

var General = {
    work: function(){
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Fighter') {
                var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(enemy){
                    if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemy);
                    }
                }
            }
        })
    }
}

module.exports = General;