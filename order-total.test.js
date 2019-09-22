
// it('works', () => {
//     expect(1).toBe(2);
// })
const orderTotal = require('./order-total');

const emptyFunction = () => {

}

//GET https://api.exchangeratesapi.io/latest?base=USD 
it('calls api if country code specified', () => {

    //defining a api call simulation and pass the variable to orderTotal function
    let isFakeFetchCalled = false;
    const fakeFetch = (url) => {
        expect(url).toBe('https://api.exchangeratesapi.io/latest?base=USD')
        isFakeFetchedCalled = true;
    }
    orderTotal(fakeFetch, {
        country: 'USD',
        items: [
            { name: 'Dragon waffles', price: 20, quantity: 2 }
        ]
    }).then(result => {
        //
        expect(isFakeFetchCalled).toBe(true);
    })
})


// this would create a pending test
//it('if country code specified')




it('Quantity', () =>
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon candy', price: 2, quantity: 3 }
        ]
    }).then(result => expect(result).toBe(6)))

it('No quantity specified', () =>
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon candy', price: 3 }
        ]
    }).then(result => expect(result).toBe(3)))


it('Happy Path (Example 1)', () =>
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon food', price: 8, quantity: 1 },
            { name: 'Dragon cage (small)', price: 800 }
        ]
    }).then(result => expect(result).toBe(808)))


it('Happy Path (Example 2)', () =>
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon collar', price: 20, quantity: 1 },
            { name: 'Dragon chew toy', price: 40, quantity: 1 }
        ]
    }).then(result => expect(result).toBe(60)))


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