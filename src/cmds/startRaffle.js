const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { promises: fs } = require('fs');
const Util = require('../backend/Util');
const RaffleWatch = require('../backend/RaffleWatch');
const Presets = require('./SetPreset');

const userdataPath = 'data/userdata';

module.exports.cmd = async (msg, client) => {
    var users;
    try { 
        let data = await fs.readFile(userdataPath);
        users = JSON.parse(data);
    }
    catch(e) { users = null }

    // Creates Raffle Role
    msg.guild.roles.create({ name: "Raffle", reason: "Creating Raffle Role" });
    
    // Get Roles
    const verifiedMember = msg.guild.roles.cache.find(role => role.name === 'Verified Member');
    const raffleRole = msg.guild.roles.cache.find(role => role.name === 'Raffle');

    const Filter = (reaction, user) => user.id == msg.author.id
    
    // The Raffle Annoucement Embed
    const reactEmbed = new EmbedBuilder()
        .setTitle('VOD REVIEW RAFFLE')
        .setDescription('React here to enter the raffle!')

    // Raffle Annoucement Embed Button
    const reactButton = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Enter Raffle')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(!verifiedMember)
        )
    
    // Button Click Event
    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isButton()) return;
        let raffRole = msg.guild.roles.cache.find(role => role.name === 'Raffle')
        msg.member.roles.add(raffRole)
        interaction.reply('Added To Raffle')
    })

    await msg.channel.send({ embeds: [reactEmbed], components: [reactButton]})

    msg.reply('Started Raffle.');

    console.log('Started Raffle');

    RaffleWatch(users, raffleRole, Presets.preset1);
}