module.exports.cmd = async (msg, client) => {
    await msg.reply({ content: 'Pong🏓\n', ephemeral: true }).then((m) => {
        msg.editReply({
            content: `Pong🏓\nAPI Latency is ${Math.round(client.ws.ping)}ms`,
            ephemeral: true
        }); //Latency is ${m.client.readyTimestamp - msg.createdTimestamp}ms. 
    });
}