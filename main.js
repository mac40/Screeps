var Mayor = require('mayor');
var HarvesterSyndicate = require('harvester_syndicate');
var BuilderSyndicate = require('builder_syndicate');
var General = require('general');

module.exports.loop = function() {
    Mayor.work();
    HarvesterSyndicate.work();
    BuilderSyndicate.work();
    General.work();
}