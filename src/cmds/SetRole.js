const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var roleID = msg.options.getString('role-id');
    var roleEntries = msg.options.get.getInteger('entries');

    await Util.SetRole(roleID, roleEntries);

    msg.reply({
        content: `Added ${roleID}.`,
        ephemeral: true
    });
}