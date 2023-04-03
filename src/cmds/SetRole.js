const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var roleID = msg.options.getString('role-id');
    var roleEntries = msg.options.getInteger('entries');

    await Util.SetRole(roleID, roleEntries);

    await msg.reply({
        content: `Added ${roleID}.`,
        ephemeral: true
    });
}