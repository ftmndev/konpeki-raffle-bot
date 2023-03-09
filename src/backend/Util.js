const { promises: fs } = require('fs');

module.exports.FindUData = (utag, udata) => {
    // Change from linear search to something more viable for a server with lots of people
    for (let i = 0; i < udata.length; i++) {
        if (udata[i].tag === utag) return i;
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

module.exports.RandomInt = (max) => {
    return Math.floor(Math.random() * max);
}