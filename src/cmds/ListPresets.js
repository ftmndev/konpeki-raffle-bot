const { EmbedBuilder } = require('discord.js')
const Util = require('../backend/Util');

const presetdataPath = 'data/presets';

module.exports.cmd = async (msg) => {
    var presets = Util.presets;
    presets = JSON.stringify(presets)
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll('"', '')
        .replaceAll(':', ': ')
        .replaceAll(',', '\n');

    const embed = new EmbedBuilder()
        .setTitle('Presets: ')
        .setDescription(presets);

    msg.reply({ 
        embeds: [embed], 
        ephemeral: true 
    });
}