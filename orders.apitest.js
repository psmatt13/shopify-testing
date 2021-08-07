// The following are automated tests for the /orders Shopify API endpoint
// Tests are ran against my Shopify development store: mattsgoods.com

// Load modules and libraries
require('dotenv').config();
const request = require("supertest")("https://matts-goods-demo.myshopify.com/admin/api/2021-07");
const expect = require("chai").expect;

// Use a known order ID for GET test
const orderId = "3944970911942";



describe("GET /orders", function () {

    it("requires authentication", async function(){
        const response = await request
        .get("/orders.json")
        // .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(401);
        expect(response.body.errors).to.eql("[API] Invalid API key or access token (unrecognized login or wrong password)")
    });

    it("returns all orders", async function () {
        const response = await request
        .get("/orders.json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);
    });

    it("returns a order by id", async function () {
        const response = await request
        .get("/orders/" + orderId + ".json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);

        const order = response.body.order;
        expect(order).to.include.keys("browser_ip", "client_details", "financial_status", "fulfillment_status", "gateway", "note", "order_number");
        expect(order.financial_status).to.eql("paid");
        expect(order.fulfillment_status).to.eql("fulfilled");
        expect(order.gateway).to.eql("bogus");
        expect(order.order_number).to.eql(1001);
    });
});