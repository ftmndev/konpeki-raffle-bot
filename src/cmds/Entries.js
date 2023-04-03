const Util = require('../backend/Util');
const RaffleWatch = require('../backend/RaffleWatch');

module.exports.cmd = async (msg) => {
    var udata = RaffleWatch.udata;
    var index = Util.FindUData(msg.member.id, udata);

    if (index == null || !udata[index].participating) {
        await msg.reply({
            content: 'You have not entered in the raffle.',
            ephemeral: true
        });
        return;
    }
    
    await msg.reply({
        content: `You have ${udata[index].entries} entries.`,
        ephemeral: true
    });
}