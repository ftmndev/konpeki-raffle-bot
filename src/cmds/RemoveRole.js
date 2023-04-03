const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var roleID = msg.options.getString('role-id');

    if (!await Util.RemoveRole(roleID)) {
        await msg.reply({
            content: `Error: ${roleID}: Does not exist.`,
            ephemeral: true
        });
    }
    else {
        await msg.reply({
            content: `Removed role ${roleID}.`,
            ephemeral: true
        });
    }
}