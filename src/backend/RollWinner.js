const Util = require('./Util');

module.exports = (udata) => {
    var basket = ShuffleEntries(udata);

    console.log(`Basket:\n${basket}`);

    return basket[Util.RandomInt(basket.length)];
}

function ShuffleEntries(udata) {
    var basket = Util.GetBasket(udata);

    for (let i = basket.length-1; i > 0; i--) {
        let r = Util.RandomInt(i-1);
        [basket[r], basket[i]] = [basket[i], basket[r]];
    }

    return basket;
}