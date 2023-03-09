module.exports.cmd = async (msg) => {
    await msg.reply({
        content: 'Entries',
        ephemeral: true
    });
}