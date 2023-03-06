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
}