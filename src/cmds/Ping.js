module.exports.cmd = async (msg, client) => {
    await msg.reply('Pong🏓\n').then((m) => {
        msg.editReply({
            content: `Pong🏓\nAPI Latency is ${Math.round(client.ws.ping)}ms`,
            ephemeral: true
        }); //Latency is ${m.client.readyTimestamp - msg.createdTimestamp}ms. 
    });
}