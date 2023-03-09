const { setTimeout } = require('timers/promises');

module.exports.raffleRunning = false;
module.exports = async (udata, role, timeMin, msg) => {
    module.exports.raffleRunning = true;
    await watchRaffle(udata, role, timeMin, msg);
}

async function watchRaffle(udata, role, timeMin, msg) {
    let raffleTime = timeMin * 60000;
    let endDate = Date.now() + raffleTime;

    console.log(`Raffle started at ${Date.now()}.\nRaffle ends at ${endDate}`);

    const update = async () => {
        while(Date.now() <= endDate) {
            console.log(msg.guild.roles.cache.get(role.id).members.map(m=>m.users));
            await setTimeout(1000);
        }
    }

    const end = () => {
        module.exports.raffleRunning = false;
        msg.channel.send('The raffle has ended');
    }

    await update();

    end();
}