const Util = require('../backend/Util');
const RaffleWatch = require('../backend/RaffleWatch');

module.exports.cmd = (msg) => {
    var udata = RaffleWatch.udata;
    var uid = msg.options.getString('user-id');
    var index = Util.FindUData(uid, udata);
    var username = msg.guild.members.cache.find(user => user.id === uid).user.tag;

    if (index == null || !udata[index].participating) {
        msg.reply({
            content: 'The user has not entered in the raffle.',
            ephemeral: true
        });
        return;
    }
    
    msg.reply({
        content: `The user ${username} have ${udata[index].entries} entries.`,
        ephemeral: true
    });
}