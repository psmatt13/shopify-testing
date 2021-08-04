// Load modules
require('dotenv').config();
const fetch = require('node-fetch');

// Initialize consts
const apiVersion = '2021-07';
const shopifyStoreUrl = 'https://matts-goods-demo.myshopify.com/admin/api/';


// Generic GET function to call the Shopify API
async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.API_KEY
        } 
    });
    return response.json()
}

// Generic POST function to call the Shopify API
async function postData(url = '', postBody = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.API_KEY
        } ,
        body: JSON.stringify(postBody)
    });
    return response.json()
}

// GET all customers
function getCustomers() {
    var customerURL = shopifyStoreUrl + apiVersion + "/customers.json";
    getData(customerURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// GET a single customer by id
function getCustomerById(customerId) {
    var singleCustomerURL = shopifyStoreUrl + apiVersion + "/customers/" + customerId + ".json";
    getData(singleCustomerURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// GET all products
function getProducts() {
    var productURL = shopifyStoreUrl + apiVersion + "/products.json";
    getData(productURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// GET a single product by id
function getProductById(productId) {
    var singleProductURL = shopifyStoreUrl + apiVersion + "/products/" + productId + ".json";
    getData(singleProductURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// GET all orders
function getOrders() {
    var ordersURL = shopifyStoreUrl + apiVersion + "/orders.json?status=any";
    getData(ordersURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// GET a single order by id
function getOrderById(orderId) {
    var singleOrderURL = shopifyStoreUrl + apiVersion + "/orders/" + orderId + ".json";
    getData(singleOrderURL)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// POST a new order
function createNewOrder(newOrder) {
    var createOrderURL = shopifyStoreUrl + apiVersion + "/orders.json";
    postData(createOrderURL, newOrder)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// POST a new customer
function createNewCustomer(newCustomer) {
    var createCustomerURL = shopifyStoreUrl + apiVersion + "/customers.json";
    postData(createCustomerURL, newCustomer)
        .then(data => console.log(JSON.stringify(data, null, 2)))
}

// getCustomers();
// getCustomerById(5389784547526);
// getProducts();
// getProductById(6785029996742);
// getOrders();
// getOrderById(3944970911942);


let simpleOrder = {
    "order": {
        "line_items": [{
            "variant_id": 40249421922502,
            "quantity": 1
        }]
    }  
};

// createNewOrder(simpleOrder);

let simpleCustomer = {
    "customer": {
        "first_name": "Jay",
        "last_name": "Testerman",
        "email": "jay.testerman@example.com",
        "phone": "+18888888889",
        "verified_email": true,
        "addresses": [{
            "address1": "123 Pine St",
            "city": "Ottawa",
            "province": "ON",
            "phone": "555-1212",
            "zip": "123 ABC",
            "last_name": "Testerman",
            "first_name": "Jay",
            "country": "CA"
        }]
    }
}

createNewCustomer(simpleCustomer);