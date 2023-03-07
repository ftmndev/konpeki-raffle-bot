module.exports = (udata, role) => {
    return new Promise((res) => watchRaffle(() => res('resolved'), udata, role))
}

function watchRaffle(res, udata, role) {
    
}