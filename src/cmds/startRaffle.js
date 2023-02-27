const { promises: fs } = require('fs');

const userdataPath = 'data/userdata';

module.exports.cmd = async (msg) => {
    let data = await fs.readFile(userdataPath);

    // Add parse data into user structure
    // { name, entries, status }

    await msg.reply('Started Raffle');
}