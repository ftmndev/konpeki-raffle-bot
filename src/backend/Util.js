const { promises: fs } = require('fs');
const RollWinner = require('./RollWinner');

const presetPath = 'data/presets';
const userdataPath = 'data/userdata';
const rolePath = 'data/roles';

module.exports.FindUData = (utag, udata) => {
    // Binary search for tag
    utag = utag.toUpperCase();

    let l = 0,
        r = udata.length;

    while (l <= r) {
        try {
        let m = Math.floor((l + r) / 2);
        let a = udata[m].tag.toUpperCase();

        if (a < utag) l = m + 1;
        else if (a > utag) r = m - 1;
        else return m;
        }
        catch (e) { 
            console.log('udata is empty');
            return null;
        }
    }

    return null;
}

module.exports.GetUData = async (path) => {
    var udata;

    try {
        let data = await fs.readFile(path, 'utf8');
        udata = JSON.parse(data);
    }
    catch (e) { 
        udata = null;
        console.log(e);
    }

    if (udata == null) udata = [];

    return udata;
}

module.exports.SetUData = async (path, udata) => {
    try {
        udata = JSON.stringify(udata);
        await fs.writeFile(path, udata, 'utf8');
    }
    catch (e) {
        console.log(`Error saving udata.\nError:\n${e}\n\nRecovered udata:\n${udata.toString()}`);
    }
}

module.exports.SortUData = async (udata) => {
    udata.sort((a, b) => {
        a = a.tag.toUpperCase();
        b = b.tag.toUpperCase();

        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return udata;
}

module.exports.GetBasket = (udata) => {
    var basket = [];

    udata.forEach((user) => {
        if (!user.participating) return;
        for (let i = 0; i < user.entries; i++) basket.push(user.tag);
    });

    return basket;
}

module.exports.RerollWinner = async () => {
    var udata = await this.GetUData(userdataPath);
    var basket = [];

    udata.forEach((user) => {
        if (!user.lastRaffle) return;
        for (let i = 0; i < user.entries; i++) basket.push(user.tag);
    });

    var winner = RollWinner(basket);

    udata = this.MarkWinner(winner, udata);

    console.log('Sorting UData');
    udata = await Util.SortUData(udata);

    udata = Util.MarkFinished(udata);
    console.log('Saving UData');
    await Util.SetUData(userdataPath, udata);

    console.log('UData Saved.');
    return winner;
}

module.exports.MarkWinner = (utag, udata) => {
    var index = this.FindUData(utag, udata);

    if (index == null) return udata;

    udata[index].entries = 0;

    return udata;
}

module.exports.MarkFinished = (udata) => {
    udata.forEach((user) => {
        if (!user.participating) {
            user.lastRaffle = false;
            return;
        }

        user.participating = false;
        user.lastRaffle = true;
    });

    return udata;
}

module.exports.SetPreset = async (presetName, presetTime) => {
    module.exports.presets[presetName] = presetTime;

    try {
        var presets = JSON.stringify(module.exports.presets);
        fs.writeFile(presetPath, presets, 'utf8');
    }
    catch (e) {
        console.log(`Couldn\'t save presets\nError:\n${e}`);
    }
}

module.exports.RemovePreset = async (presetName) => {
    if (module.exports.presets[presetName] == undefined) return false;
    delete module.exports.presets[presetName];

    try {
        var presets = JSON.stringify(module.exports.presets);
        fs.writeFile(presetPath, presets, 'utf8');
    }
    catch (e) {
        console.log(`Couldn\'t save presets\nError:\n${e}`);
    }

    return true;
}

module.exports.LoadPresets = async () => {
    var pdata;
    
    try {
        let data = await fs.readFile(presetPath, 'utf8');
        pdata = JSON.parse(data);
    }
    catch (e) {
        pdata = null;
        console.log(e);
    }

    if (pdata == null) pdata = {};

    module.exports.presets = pdata;
}

module.exports.LoadRoles = async () => {
    var rdata;

    try {
        let data = await fs.readFile(rolePath, 'utf8');
        rdata = JSON.parse(data);
    }
    catch (e) {
        rdata = null;
        console.log(e);
    }

    if (rdata == null) rdata = [];

    module.exports.roles = rdata;
}

module.exports.SetRole = async (roleID, roleEntries) => {
    module.exports.roles.push({ id: roleID, entries: roleEntries })

    try {
        var roles = JSON.stringify(module.exports.roles);
        fs.writeFile(rolePath, roles, 'utf8');
    }
    catch (e) {
        console.log(`Couldn\'t save roles\nError:\n${e}`);
    }
}

module.exports.RemoveRole = async (roleID) => {
    var index = module.exports.roles.findIndex(role => role.id === roleID);

    if (index == -1) return false;

    module.exports.roles.splice(index, 1);

    try {
        var roles = JSON.stringify(module.exports.roles);
        fs.writeFile(rolePath, roles, 'utf8');
    }
    catch (e) {
        console.log(`Couldn\'t save roles\nError:\n${e}`);
    }

    return true;
}

module.exports.RandomInt = (max) => {
    return Math.floor(Math.random() * max);
}