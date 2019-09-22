function orderTotal(fetch, order) {
    fetch('https://api.exchangeratesapi.io/latest?base=' + order.country)
    return Promise.resolve(order.items.reduce((prev, cur) => cur.price * (cur.quantity || 1) + prev, 0));
}

module.exports = orderTotal;