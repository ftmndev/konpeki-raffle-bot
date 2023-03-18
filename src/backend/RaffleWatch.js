const wait = require('timers/promises').setTimeout;
const Util = require('./Util');
const RollWinner = require('./RollWinner');

const userdataPath = 'data/userdata';

module.exports.raffleRunning = false;

module.exports = async (role, timeMin, msg) => {
    module.exports.raffleRunning = true;

    var udata = await Util.GetUData(userdataPath);

    await watchRaffle(udata, role, timeMin, msg);
}

async function watchRaffle(udata, role, timeMin, msg) {
    var raffleTime = timeMin * 60000;
    var endDate = Date.now() + raffleTime;

    console.log(`Raffle started at ${Date.now()}.\nRaffle ends at ${endDate}\nRaffle lasts for ${timeMin}min.`);

    const update = async () => {
        while(Date.now() <= endDate) {
            module.exports.udata = udata;
            await wait(2000);
            await msg.guild.members.fetch();
            let enteredUsers = role.members.map(m=>m);

            enteredUsers.forEach(async (member) => {
                var index = Util.FindUData(member.user.id, udata);

                member = await member.fetch();
                var memberRoles = member.roles.cache;

                if (index != null && !udata[index].participating) {
                    udata[index].entries += GetEntriesByRole(memberRoles);
                    
                    udata[index].participating = true;
                }
                else if (index == null) {
                    udata.push({
                        tag: member.user.id,
                        entries: GetEntriesByRole(memberRoles),
                        lastRaffle: false,
                        participating: true
                    });
                }
            });

            udata = await Util.SortUData(udata);
        }
    }

    const end = async () => {
        module.exports.raffleRunning = false;

        msg.channel.send('The raffle has ended. Picking winner...');
        console.log('Raffle ended');

        await msg.guild.roles.fetch();
        msg.guild.roles.delete(role, 'Raffle Ended')
            .then(() => console.log('Raffle Role Removed'))
            .catch(console.error);

        var winner = RollWinner(udata);

        udata = Util.MarkWinner(winner, udata);

        console.log(`Winner: ${winner}`);
        try {
            msg.channel.send(`The winner is <@${winner}>!`);
        }
        catch (e) {
            msg.channel.send(`The winner is ${winner}!`);
            console.log(`Error setting @\n${e}`)
        }

        console.log('Sorting UData');
        udata = await Util.SortUData(udata);

        udata = Util.MarkFinished(udata);
        console.log('Saving UData');
        await Util.SetUData(userdataPath, udata);

        console.log('UData Saved. Closing Raffle');
    }

    await update();

    await end();
}

function GetEntriesByRole(memberRoles) {
    var entries = 0;

    Util.roles.forEach((role) => {
        entries += (memberRoles.find(frole => frole.id === role.id)?role.entries:0);
    });

    return entries;
}