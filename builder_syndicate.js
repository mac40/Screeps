// The builder syndicate handles the behaviour of worker creeps

var WorkersGuild = require('workers_guild');
var EmploymentOffice = WorkersGuild.employmentOffice;
var JobInstructor = WorkersGuild.jobInstructor;

var BuilderSyndicate = {
    work: function () {
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Builder') {

                EmploymentOffice.assignJob(creep);

                if (creep.memory.job == 'gather_energy') {
                    JobInstructor.gatherEnergy(creep);
                }
                else if (creep.memory.job == 'build') {
                    JobInstructor.build(creep);
                }
                else if (creep.memory.job == 'upgrade_controller') {
                    JobInstructor.upgradeController(creep);
                }
            }
        })
    }
}

module.exports = BuilderSyndicate;