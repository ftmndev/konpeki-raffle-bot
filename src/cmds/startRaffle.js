const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const RaffleWatch = require('../backend/RaffleWatch');
const Presets = require('./SetPreset');

module.exports.cmd = async (msg, client) => {
    // Creates Raffle Role
    module.exports.raffleRole = await msg.guild.roles.create({ name: "Raffle", reason: "Creating Raffle Role" });
    
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

    await msg.channel.send({ embeds: [reactEmbed], components: [reactButton] });

    msg.reply({ content: 'Started Raffle', ephemeral: true });

    console.log('Started Raffle');

    RaffleWatch(module.exports.raffleRole, Presets.preset1, msg);
}