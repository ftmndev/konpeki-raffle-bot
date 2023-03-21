const Util = require('../backend/Util');
const RaffleWatch = require('../backend/RaffleWatch');

module.exports.cmd = (msg) => {
    RaffleWatch.raffleRunning = false;
    
    msg.reply({
        content: 'Ended Raffle',
        ephemeral: true
    });
}