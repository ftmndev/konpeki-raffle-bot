const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { promises: fs } = require('fs');
const Util = require('../backend/Util');

const userdataPath = 'data/userdata';

module.exports.cmd = async (msg, client) => {
    var users;
    try { 
        let data = await fs.readFile(userdataPath);
        users = JSON.parse(data);
    }
    catch(e) { users = null }
    
    const verifiedMember = msg.guild.roles.cache.get('954586301972217917')
    const raffleRole = msg.guild.roles.create({ name: "Raffle", reason: "Creating Raffle Role" })

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
    
    //Button Click
    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isButton()) return;
        let raffRole = msg.guild.roles.cache.find(role => role.name === 'Raffle')
        msg.member.roles.add(raffRole)
        interaction.reply('Added To Raffle')
    })

    const reactionMessage = await msg.channel.send({ embeds: [reactEmbed], components: [reactButton]})
}