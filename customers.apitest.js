// Load modules and libraries
require('dotenv').config();
const request = require("supertest")("https://matts-goods-demo.myshopify.com/admin/api/2021-07");
const expect = require("chai").expect;

//Initialize consts
const customerId = '5389784547526';


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
