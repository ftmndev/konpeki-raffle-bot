const wait = require('timers/promises').setTimeout;
const Util = require('./Util');
const RoleID = require('./RoleIDs');
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
    var tudata = udata;

    console.log(`Raffle started at ${Date.now()}.\nRaffle ends at ${endDate}\nRaffle lasts for ${timeMin}min.`);

    const update = async () => {
        while(Date.now() <= endDate) {
            // Sort in background
            Util.SortUData(udata)
                .then((ret) => { tudata = ret })
                .catch((e) => console.log('Nothing to sort.'));
            
            await wait(2000);
            await msg.guild.members.fetch();
            let enteredUsers = role.members.map(m=>m);

            enteredUsers.forEach(async (member) => {
                var index = Util.FindUData(member.user.tag, udata);

                member = await member.fetch();
                var memberRoles = member.roles.cache;

                if (index != null && !udata[index].participating) {
                    udata[index].entries += GetEntriesByRole(memberRoles);
                    
                    udata[index].participating = true;
                }
                else if (index == null) {
                    udata.push({
                        tag: member.user.tag,
                        entries: GetEntriesByRole(memberRoles),
                        lastRaffle: false,
                        participating: true
                    });
                }
            });

            udata = tudata;
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

        console.log(`Winner: ${winner}`);
        try {
            msg.channel.send(`The winner is <@${msg.guild.members.cache.find(m=>m.user.tag===winner).id}>!`);
        }
        catch (e) {
            msg.channel.send(`The winner is ${winner}!`);
            console.log(`Error setting @\n${e}`)
        }

        console.log('Sorting UData');
        udata = await Util.SortUData(udata);

        udata = Util.MarkFinished(udata);
        console.log('Saving UData');
        await Util.SetUData(userdataPath, udata); // save udata

        console.log('UData Saved. Closing Raffle.');
    }

    await update();

    await end();
}

function GetEntriesByRole(memberRoles) {
    /*
        1 - Verified Member 
        2 - Server Booster
        2 - Tier 1 Sub
        3 - Moderator 
        3 - Tier 2 Sub
        5 - Tier 3 Sub 
    */

    return (memberRoles.find(role => role.id === RoleID.vmid) != undefined
    ?1:0) + (memberRoles.find(role => role.id === RoleID.sbid) != undefined
    ?2:0) + (memberRoles.find(role => role.id === RoleID.t1id) != undefined
    ?2:0) + (memberRoles.find(role => role.id === RoleID.mid) != undefined
    ?3:0) + (memberRoles.find(role => role.id === RoleID.t2id) != undefined
    ?3:0) + (memberRoles.find(role => role.id === RoleID.t3id) != undefined
    ?5:0);
}