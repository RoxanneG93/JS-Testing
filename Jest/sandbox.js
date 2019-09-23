const fetch = require('node-fetch');
const orderTotal = require('./order-total');

const result = orderTotal(fetch, {
    country: 'USD',
    items: [
        { name: 'Dragon waffles', price: 20, quantity: 2 }
    ]
})
console.log(result);
// const result = fetch('https://api.exchangeratesapi.io/latest').then(res => res.json())
//     .then(json => console.log(json));
