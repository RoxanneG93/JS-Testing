
// it('works', () => {
//     expect(1).toBe(2);
// })
const orderTotal = require('./order-total');



//GET https://api.exchangeratesapi.io/latest?base=USD 
it('calls api if country code specified', (url, opts) => {

    const fakeProcess = {
        env: {
            API_KEY: 'key123'
        }
    }

    //defining a api call simulation and pass the variable to orderTotal function
    let isFakeFetchCalled = false;

    const fakeFetch = (url) => {
        // if headers with apikey are required
        /*{
            headers: {
                'apikey': process.env.API_KEY
            }
        } */
        //expect(opts.headers.apikey).toBe('key123')
        expect(url).toBe('https://api.exchangeratesapi.io/latest?base=USD')
        isFakeFetchCalled = true;

        return Promise.resolve({
            //data.rates.USD
            json: () => Promise.resolve({
                rates: {
                    USD: 1.0
                }
            })
        })
    }
    // return the promise
    return orderTotal(fakeFetch, {
        country: 'USD',
        items: [
            { name: 'Dragon waffles', price: 20, quantity: 2 }
        ]
    }).then(result => {
        expect(result).toBe(20 * 2 * 1.0)
        expect(isFakeFetchCalled).toBe(true);
    })
})


// this would create a pending test
//it('if country code specified')



// Testing for Quantity Specified
it('Quantity', () =>
    orderTotal(null, {
        items: [
            { name: 'Dragon candy', price: 2, quantity: 3 }
        ]
    }).then(result => expect(result).toBe(6)))

// Testing  for NO Quantity Specified
it('No quantity specified', () =>
    orderTotal(null, {
        items: [
            { name: 'Dragon candy', price: 3 }
        ]
    }).then(result => expect(result).toBe(3)))



// Testing Order Total with multiple line items, some with quantity, some not specified qty
it('Happy Path (Example 1)', () =>
    orderTotal(null, {
        items: [
            { name: 'Dragon food', price: 8, quantity: 1 },
            { name: 'Dragon cage (small)', price: 800 }
        ]
    }).then(result => expect(result).toBe(808)))


// Testing Order Total with multiline items and both have qty
it('Happy Path (Example 2)', () =>
    orderTotal(null, {
        items: [
            { name: 'Dragon collar', price: 20, quantity: 1 },
            { name: 'Dragon chew toy', price: 40, quantity: 1 }
        ]
    }).then(result => expect(result).toBe(60)))




// ===== Testing Example using IF Statment =======
// if (orderTotal({
//     items: [
//         { name: 'Dragon candy', price: 2, quantity: 3 }
//     ]

// }) !== 6) {
//     throw new Error('Check fail: Happy path 3');
// }

// if (orderTotal({
//     items: [
//         { name: 'Dragon food', price: 8, quantity: 1 },
//         { name: 'Dragon cage (small)', price: 800 }
//     ]
// }) !== 808) {
//     throw new Error('Check fail: Happy path 1');
// }


// if (orderTotal({
//     items: [
//         { name: 'Dragon Candy', price: 3 }
//     ]
// }) !== 3) {
//     throw new Error('Check fail: No quantity');
// }