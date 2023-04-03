const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var winner = await Util.RerollWinner();

    await msg.reply({
        content: `The winner is <@${winner}>`,
        ephemeral: true
    });
}