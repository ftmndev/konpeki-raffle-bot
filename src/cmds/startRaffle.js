const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const RaffleWatch = require('../backend/RaffleWatch');
const Util = require('../backend/Util');

module.exports.cmd = async (msg, client) => {
    var presetName = msg.options.getString('preset');
    var presetTime = Util.presets[presetName];

    if (presetTime == undefined) {
        msg.reply({ 
            content: 'Invalid preset. Raffle did not start. Use "/list-presets" to see all set presets.', 
            ephemeral: true 
        });
        return;
    }

    if (RaffleWatch.raffleRunning) {
        msg.reply({
            content: 'Raffle already running.',
            ephemeral: true
        });
        return;
    }

    // Creates Raffle Role
    module.exports.raffleRole = await msg.guild.roles.create({ name: "Raffle", reason: "Creating Raffle Role" });
    
    var raffleName = msg.options.getString('raffle-name') ?? 'Vod Review Raffle';
    var raffleDesc = msg.options.getString('raffle-desc') ?? 'Enter by clicking the button below!';
    var coachName = msg.options.getString('coach-name');

    // The Raffle Annoucement Embed
    var reactEmbed = new EmbedBuilder()
        .setTitle(raffleName)
        .setColor(0x00FFFF)
        .setURL('https://discord.gg/fX2GSskgEC')
        .setDescription(raffleDesc)
        .addFields(
            { name: 'Role Entries', value: '<@&930277398455402506> - 5\n<@&860451916743573565> -1' },
            { name: '\u200B', value: '\u200B' },
            { name: `Coach: ${coachName}`, value: 'Konpeki', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    // Raffle Annoucement Embed Button
    var reactButton = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Enter Raffle')
            .setStyle(ButtonStyle.Primary)
        );
    
    // Button Click Event

    await msg.channel.send({ embeds: [reactEmbed], components: [reactButton] });

    msg.reply({ content: 'Started Raffle', ephemeral: true });

    console.log('Started Raffle');

    RaffleWatch(module.exports.raffleRole, presetTime, msg);
}