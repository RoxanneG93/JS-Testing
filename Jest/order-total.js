function orderTotal(fetch, order) {
    if (order.country) {
        return fetch('https://api.exchangeratesapi.io/latest?base=' + order.country)
            .then(res => res.json())
            .then(data => data.rates.USD)
            .then(rate => order.items.reduce((prev, cur) => cur.price * (cur.quantity || 1) + prev, 0) * rate)
    }
    return Promise.resolve(order.items.reduce((prev, cur) => cur.price * (cur.quantity || 1) + prev, 0));
}

module.exports = orderTotal;