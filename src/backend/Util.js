const { promises: fs } = require('fs');

module.exports.FindUData = (utag, udata) => {
    // Binary search for tag
    utag = utag.toUpperCase();

    let l = 0,
        r = udata.length;

    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        let a = udata[m].tag.toUpperCase();

        if (a < utag) l = m + 1;
        else if (a > utag) r = m - 1;
        else return m;
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

module.exports.GetPresets = async (path) => {
    var pdata;
    
    try {
        let data = await fs.readFile(path);
        pdata = JSON.parse(data);
    }
    catch (e) {
        pdata = null;
        console.log(e);
    }

    if (pdata == null) pdata = {};

    return pdata;
}

module.exports.GetPresetTime = (presetName) => {
    
}

module.exports.RandomInt = (max) => {
    return Math.floor(Math.random() * max);
}