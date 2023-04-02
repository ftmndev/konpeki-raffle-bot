const Util = require('../backend/Util');

module.exports.cmd = async (msg) => {
    var winner = await Util.RerollWinner();

    msg.reply({
        content: `The winner is <@${winner}>`,
        ephemeral: true
    });
}