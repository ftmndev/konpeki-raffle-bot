const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const startRaffle = require('./cmds/StartRaffle');
const reroll = require('./cmds/Reroll');
const setPreset = require('./cmds/SetPreset');

function ActivateClient(TOKEN) {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.on('interactionCreate', async (msg) => {
        if (!msg.isChatInputCommand()) return;

        /*if (!msg.member.permissions.has('8')) {
            await msg.reply('You dont have the permissions to do that.');
            return;
        }*/

        switch (msg.commandName)
        {
            case 'ping':
                await ping.cmd(msg)
                break;
            case 'start-raffle':
                await startRaffle.cmd(msg);
                break;
            case 'reroll':
                await reroll.cmd(msg);
                break;
            case 'set-preset':
                await setPreset.cmd(msg);
                break;
        }
    });

    client.login(TOKEN);
}

module.exports = ActivateClient;