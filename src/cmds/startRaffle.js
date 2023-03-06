const { SharedNameAndDescription, EmbedBuilder } = require('discord.js');
const { promises: fs } = require('fs');

const userdataPath = 'data/userdata';

module.exports.cmd = async (msg) => {
    //let data = await fs.readFile(userdataPath);

    // Add parse data into user structure
    // { name, entries, status }
    
    const raffleRole = msg.guild.roles.cache.get('1082350587942817802')

    const Filter = (reaction, user) => user.id == msg.author.id

    const Embed = new EmbedBuilder()
        .setDescription(`React here to enter the raffle!`)

    const reactionMessage = await msg.channel.send(Embed)

    await reactionMessage.react(':white_check_mark:')

    // Time is measured in ms
    reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
       
        const reaction = collected.first();
        
        switch (reaction.emoji.name) {
            case ":white_check_mark:":
                // Checking if the member already has the role.
                if (msg.member.roles.cache.has(Role1.id)) {return msg.channel.send("You already have the role.")};
                // Adding the role.
                msg.member.roles.add(Role1).then(msg.channel.send("Role added!"));
                // Breaking the switch statement to make sure no other cases are executed.
                break
        }
    })
}