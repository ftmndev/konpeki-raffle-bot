module.exports.cmd = async (msg) => {
    await msg.reply({
        content: 'Help',
        ephemeral: true
    });
}