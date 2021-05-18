// Main script for Screeps1.0

var Mayor = require('mayor');
var HarvesterSyndicate = require('harvester_syndicate');


module.exports.loop = function() {
    Mayor.work();
    HarvesterSyndicate.work();
}