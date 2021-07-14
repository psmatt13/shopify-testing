const fetch = require('node-fetch');

const apiPassword = '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';
const apiVersion = '2021-07';
const shopifyStoreUrl = 'https://matts-goods-demo.myshopify.com/admin/api/';


async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': apiPassword 
        } 
    });
    return response.json()
}


function getCustomers() {
    var customerURL = shopifyStoreUrl + apiVersion + "/customers.json";
    getData(customerURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

function getProducts() {
    var productURL = shopifyStoreUrl + apiVersion + "/products.json";
    getData(productURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}


getProducts();



/* fetch("https://matts-goods-demo.myshopify.com/admin/api/2021-07/customers.json", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': apiPassword  
    }
})
    .then(response => response.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
 */
