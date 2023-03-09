const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds|GatewayIntentBits.GuildMembers|GatewayIntentBits.GuildScheduledEvents] });

const startRaffle = require('./cmds/StartRaffle');
const reroll = require('./cmds/Reroll');
const setPreset = require('./cmds/SetPreset');
const ping = require('./cmds/Ping');
const entries = require('./cmds/Entries');
const help = require('./cmds/Help');

function ActivateClient(TOKEN) {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.on(Events.InteractionCreate, async (msg) => {
        if (!msg.isChatInputCommand()) return;

        /*if (!msg.member.permissions.has('8')) {
            await msg.reply('You dont have the permissions to do that.');
            return;
        }*/
        
        switch (msg.commandName) {
            case 'ping':
                ping.cmd(msg, client);
                break;
            case 'start-raffle':
                startRaffle.cmd(msg, client);
                break;
            case 'reroll':
                reroll.cmd(msg);
                break;
            case 'set-preset':
                setPreset.cmd(msg);
                break;
            case 'entries':
                entries.cmd(msg);
                break;
            case 'help':
                help.cmd(msg);
                break;
        }
    });

    client.on(Events.InteractionCreate, async (msg) => {
        if (!msg.isButton()) return;
        if (msg.member.roles.cache.find(role => role.name === 'Verified Member') == undefined) {
            await msg.reply({ 
                content: 'You must be a verified member to enter the raffle.', 
                ephemeral: true
            });
            return;
        }
        if (msg.member.roles.cache.find(role => role.id === startRaffle.raffleRole.id) != undefined) { 
            await msg.reply({
                content: 'You have already joined the raffle.',
                ephemeral: true
            });
            return;
        }

        msg.member.roles.add(startRaffle.raffleRole);
        await msg.reply({ 
            content: 'You entered the raffle.', 
            ephemeral: true 
        });
    });


    client.login(TOKEN);
}

module.exports = ActivateClient;