module.exports.cmd = async (msg, client) => {
    await msg.reply('Pong🏓\n').then((m) => {
        msg.editReply(`Pong🏓\nAPI Latency is ${Math.round(client.ws.ping)}ms`) //Latency is ${m.client.readyTimestamp - msg.createdTimestamp}ms. 
    });
}