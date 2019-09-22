const fetch = require('node-fetch');
const result = fetch('https://api.exchangeratesapi.io/latest').then(res => res.json())
    .then(json => console.log(json));
