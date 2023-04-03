const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var presetName = msg.options.getString('preset-name');
    var presetTime = msg.options.getNumber('duration');

    await Util.SetPreset(presetName, presetTime);

    await msg.reply({
        content: `Set the preset: ${presetName} to ${presetTime}min${presetTime>1?'s':''}`,
        ephemeral: true
    });
}