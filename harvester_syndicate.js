// The harvester syndicate is in charge of the harvester creeps behaviour

var WorkersGuild = require('workers_guild');
var EmploymentOffice = WorkersGuild.employmentOffice;
var JobInstructor = WorkersGuild.jobInstructor;

var HarvesterSyndicate = {
    work: function () {
        _.forEach(Game.creeps, function (creep) {
            if (creep.memory.role == 'Harvester') {

                EmploymentOffice.assignJob(creep);

                if (creep.memory.job == "store_energy") {
                    JobInstructor.storeEnergy(creep);
                }
                else if (creep.memory.job == "gather_energy") {
                    JobInstructor.gatherEnergy(creep);
                }
            }
        })
    }
}

module.exports = HarvesterSyndicate;