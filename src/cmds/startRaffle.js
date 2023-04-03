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
    var raffleDesc = msg.options.getString('raffle-desc') ?? 'Hey! Once you press the button below, you will be entered into a raffle where you will have a chance to be vod reviewed by one of our PROFESSIONAL Coaches! Please be sure you have read all the rules and that your games are appropriate for picking! We will begin a mass drawing everyday!';
    var coachName = msg.options.getString('coach-name');

    var raffleVal = '';

    Util.SortRoles();

    Util.roles.forEach((role) => {
        raffleVal += `<@&${role.id}> - ${role.entries}\n`;
    });

    // The Raffle Annoucement Embed
    var reactEmbed = new EmbedBuilder()
        .setTitle(raffleName)
        .setColor(0x00FFFF)
        .setURL('https://discord.gg/fX2GSskgEC')
        .setDescription(raffleDesc)
        .addFields(
            { name: 'Role Entries', value: raffleVal },
            { name: '\u200B', value: '\u200B' },
            { name: 'Coach:', value: coachName, inline: true },
            { name: 'Duration:', value: `${Math.round((presetTime/60) * 1000) / 1000} hour(s)`, inline: true },
        )
        .setImage('https://cdn.discordapp.com/attachments/1001641185615564933/1091452653978013796/general_Rules1.png')
        .setTimestamp()
        .setFooter({ text: 'Raffle tickets will be carried over into the next giveaway until you win.', iconURL: 'https://cdn.discordapp.com/attachments/1031732433789390848/1084974750075457556/konpeki_logo_small.png' });

    // Raffle Annoucement Embed Button
    var reactButton = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Enter Raffle')
            .setStyle(ButtonStyle.Primary)
        );
    
    // Button Click Event

    await msg.channel.send({ embeds: [reactEmbed], components: [reactButton] });

    await msg.reply({ content: 'Started Raffle', ephemeral: true });

    console.log('Started Raffle');

    RaffleWatch(module.exports.raffleRole, presetTime, msg);
}