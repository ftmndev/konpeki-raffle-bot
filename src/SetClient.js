const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds|GatewayIntentBits.GuildMembers|GatewayIntentBits.GuildScheduledEvents] });

const startRaffle = require('./cmds/StartRaffle');
const reroll = require('./cmds/Reroll');
const setPreset = require('./cmds/SetPreset');
const ping = require('./cmds/Ping');
const listPresets = require('./cmds/ListPresets');
const entries = require('./cmds/Entries');
const removePreset = require('./cmds/RemovePreset');
const setRole = require('./cmds/SetRole');
const removeRole = require('./cmds/RemoveRole');
const listUserEntries = require('./cmds/ListUserEntries');
const endRaffle = require('./cmds/EndRaffle');

const RaffleWatch = require('./backend/RaffleWatch');

function ActivateClient(TOKEN) {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.on(Events.InteractionCreate, async (msg) => {
        if (!msg.isChatInputCommand()) return;

        // Commands for everyone
        switch (msg.commandName) {
            case 'ping':
                ping.cmd(msg, client);
                break;
            case 'entries':
                entries.cmd(msg);
                break;
        }

        if (!msg.member.permissions.has('8')) {
            await msg.reply('You dont have the permissions to do that.');
            return;
        }
        
        // Commands for admins or higher
        switch (msg.commandName) {
            case 'start-raffle':
                startRaffle.cmd(msg, client);
                break;
            case 'reroll':
                reroll.cmd(msg);
                break;
            case 'set-preset':
                setPreset.cmd(msg);
                break;
            case 'list-presets':
                listPresets.cmd(msg);
                break;
            case 'remove-preset':
                removePreset.cmd(msg);
                break;
            case 'set-role':
                setRole.cmd(msg);
                break;
            case 'remove-role':
                removeRole.cmd(msg);
                break;
            case 'list-user-entries':
                listUserEntries.cmd(msg);
                break;
            case 'end-raffle':
                endRaffle.cmd(msg);
                break;
        }
    });

    client.on(Events.InteractionCreate, async (msg) => {
        if (!msg.isButton()) return;
        if (!RaffleWatch.raffleRunning) {
            await msg.reply({
                content: 'The raffle is over.',
                ephemeral: true
            });
            return;
        }
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