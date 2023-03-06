const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { promises: fs } = require('fs');
const Util = require('../backend/Util');

const userdataPath = 'data/userdata';

module.exports.cmd = async (msg) => {
    var users;
    try { 
        let data = await fs.readFile(userdataPath);
        users = JSON.parse(data);
    }
    catch(e) { users = null }

    

    // Add parse data into user structure
    // { name, entries, status }
    
    const raffleRole = msg.guild.roles.cache.get('954586301972217917')
    const verifiedMember = msg.guild.roles.cache.get('954586301972217917')

    const Filter = (reaction, user) => user.id == msg.author.id

    const reactEmbed = new EmbedBuilder()
        .setTitle('VOD REVIEW RAFFLE')
        .setDescription('React here to enter the raffle!')

    const reactButton = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Enter Raffle')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(!msg.member.roles.cache.some(role => role.id === '954586301972217917'))
        )

    const reactionMessage = await msg.channel.send({ embeds: [reactEmbed], components: [reactButton]})

    await reactionMessage.react(':white_check_mark:')

    // // Time is measured in ms
    // reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
       
    //     const reaction = collected.first();
        
    //     switch (reaction.emoji.name) {
    //         case ":white_check_mark:":
    //             // Checking if the member already has the role.
    //             if (msg.member.roles.cache.has(raffleRole.id)) {return msg.channel.send("You already have the role.")};
    //             // Adding the role.
    //             msg.member.roles.add(Role1).then(msg.channel.send("Role added!"));
    //             // Breaking the switch statement to make sure no other cases are executed.
    //             break
    //     }
    // })
}