const Util = require('./Util');

module.exports = (basket) => {
    basket = ShuffleEntries(basket);

    console.log(`Basket:\n${basket}`);

    return basket[Util.RandomInt(basket.length)];
}

function ShuffleEntries(basket) {
    for (let i = basket.length-1; i > 0; i--) {
        let r = Util.RandomInt(i-1);
        [basket[r], basket[i]] = [basket[i], basket[r]];
    }

    return basket;
}