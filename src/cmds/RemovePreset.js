const Util = require('../backend/Util')

module.exports.cmd = async (msg) => {
    var presetName = msg.options.getString('preset-name');

    if (!await Util.RemovePreset(presetName)) {
        await msg.reply({
            content: `Error: ${presetName}: Does not exist.`,
            ephemeral: true
        });
    }
    else {
        await msg.reply({
            content: `Removed preset ${presetName}.`,
            ephemeral: true
        });
    }
}