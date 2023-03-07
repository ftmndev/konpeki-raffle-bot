module.exports = (udata, role, timeMin) => {
    watchRaffle(udata, role, timeMin);
}

function watchRaffle(udata, role, timeMin) {
    let endDate = Date.now() + .5 * 60000;
    let end = false;

    const update = () => {
        if (Date.now() >= endDate) {
            end = true;
            return;
        }
        console.log('time');

        setTimeout(update, 1000);
    }

    update();

    (async()=>{while(!end);})();

    console.log('end');
}

