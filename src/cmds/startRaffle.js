const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');
const { promises: fs } = require('fs');
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
    const raffleRole = await msg.guild.roles.create({ name: "Raffle", reason: "Creating Raffle Role" });
    
    // The Raffle Annoucement Embed
    const reactEmbed = new EmbedBuilder()
        .setTitle('VOD REVIEW RAFFLE')
        .setDescription('React here to enter the raffle!');

    // Raffle Annoucement Embed Button
    const reactButton = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Enter Raffle')
            .setStyle(ButtonStyle.Primary)
        );
    
    // Button Click Event
    client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isButton()) return;
        if (msg.member.roles.cache.find(role => role.name === 'Verified Member') == undefined) {
            interaction.reply({ content: 'You must be a verified member to enter the raffle.', ephemeral: true });
            return;
        }

        msg.member.roles.add(raffleRole);
        interaction.reply({ content: 'You entered the raffle.', ephemeral: true });
    });

    await msg.channel.send({ embeds: [reactEmbed], components: [reactButton] });

    msg.reply({ content: 'Started Raffle', ephemeral: true });

    console.log('Started Raffle');

    RaffleWatch(users, raffleRole, Presets.preset1, msg);
}