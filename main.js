var Mayor = require('mayor');
var HarvesterSyndicate = require('harvester_syndicate');
var WorkersGuild = require('workers_guild');
var General = require('general');

module.exports.loop = function() {
    Mayor.work();
    HarvesterSyndicate.work();
    WorkersGuild.work();
    General.work();
}