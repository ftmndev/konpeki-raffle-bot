const { EmbedBuilder } = require('discord.js')
const Util = require('../backend/Util');

const presetdataPath = 'data/presets';

module.exports.cmd = (msg) => {
    var presets = Util.GetPresets('data/presets');
}