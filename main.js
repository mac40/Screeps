// Main script for Screeps1.0

var Mayor = require('mayor');
var HarvesterSyndicate = require('harvester_syndicate');
var WorkersGuild = require('workers_guild');

module.exports.loop = function() {
    Mayor.work();
    HarvesterSyndicate.work();
    WorkersGuild.work();
}