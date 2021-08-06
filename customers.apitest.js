// The following are automated tests for the /customers Shopify API endpoint
// Tests are ran against my Shopify development store: mattsgoods.com

// Load modules and libraries
require('dotenv').config();
const request = require("supertest")("https://matts-goods-demo.myshopify.com/admin/api/2021-07");
const expect = require("chai").expect;
const crypto = require("crypto");

// Use a known customer ID for GET test
const customerId = "5389784547526";

// email and phone must be unique in Shopify so generate those using crypto and Math, respectively
const randomEmailAddress = crypto.randomBytes(10).toString('hex') + "@example.com";
const randomPhoneNumber = "+1314" + Math.floor(1000000 + Math.random() * 9000000);  // Shopify requires phone numbers in E.164 format and does validation against the area code
const simpleCustomer = {
    "customer": {
        "first_name": "Jay",
        "last_name": "Testerman",
        "email": randomEmailAddress,
        "phone": randomPhoneNumber,
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
const customerFraudNote = {
    "customer": {
        "id": customerId,
        "note": "Customer is suspected of placing fraudulent orders."
    }
}

describe("GET /customers", function () {

    it("requires authentication", async function(){
        const response = await request
        .get("/customers.json")
        // .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(401);
        expect(response.body.errors).to.eql("[API] Invalid API key or access token (unrecognized login or wrong password)")
    });

    it("returns all customers", async function () {
        const response = await request
        .get("/customers.json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);
    });

    it("returns a customer by id", async function () {
        const response = await request
        .get("/customers/" + customerId + ".json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);

        const customer = response.body.customer;
        expect(customer).to.include.keys("addresses", "currency", "email", "first_name", "last_name", "orders_count", "phone", "verified_email");
        expect(customer.first_name).to.eql("John");
        expect(customer.last_name).to.eql("Smith");
        expect(customer.verified_email).to.eql(true);
    });
});


describe("POST /customers", function () {

    it("requires authentication", async function(){
        const response = await request
        .post("/customers.json")
        // .set('X-Shopify-Access-Token', process.env.API_KEY)
        .send(simpleCustomer);
  
        expect(response.status).to.eql(401);
        expect(response.body.errors).to.eql("[API] Invalid API key or access token (unrecognized login or wrong password)")
    });

    it("creates a new customer", async function () {
        const response = await request
        .post("/customers.json")
        .set('X-Shopify-Access-Token', process.env.API_KEY)
        .send(simpleCustomer);
        
        expect(response.status).to.eql(201);

        const customer = response.body.customer;
        expect(customer).to.include.keys("addresses", "currency", "email", "first_name", "last_name", "orders_count", "phone", "verified_email");
        expect(customer.first_name).to.eql("Jay");
        expect(customer.last_name).to.eql("Testerman");
        expect(customer.email).to.eql(randomEmailAddress);
        expect(customer.phone).to.eql(randomPhoneNumber);
        expect(customer.verified_email).to.eql(true);
    });

  });

describe("PUT /customers", function () {

    it("requires authentication", async function(){
        const response = await request
        .put("/customers/" + customerId + ".json")
        // .set('X-Shopify-Access-Token', process.env.API_KEY)
        .send(customerFraudNote);
  
        expect(response.status).to.eql(401);
        expect(response.body.errors).to.eql("[API] Invalid API key or access token (unrecognized login or wrong password)")
    });

    it("Updates an existing customer to have a fraud note", async function () {
        const response = await request
        .put("/customers/" + customerId + ".json")
        .set('X-Shopify-Access-Token', process.env.API_KEY)
        .send(customerFraudNote);
        
        expect(response.status).to.eql(200);

        const customer = response.body.customer;
        expect(customer).to.include.keys("addresses", "currency", "email", "first_name", "last_name", "orders_count", "phone", "verified_email");
        expect(customer.note).to.eql("Customer is suspected of placing fraudulent orders.");
    });

});