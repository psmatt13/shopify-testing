// The following are automated tests for the /products Shopify API endpoint
// Tests are ran against my Shopify development store: mattsgoods.com

// Load modules and libraries
require('dotenv').config();
const request = require("supertest")("https://matts-goods-demo.myshopify.com/admin/api/2021-07");
const expect = require("chai").expect;

// Use a known product ID for GET test
const productId = "6785029996742";



describe("GET /products", function () {

    it("requires authentication", async function(){
        const response = await request
        .get("/products.json")
        // .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(401);
        expect(response.body.errors).to.eql("[API] Invalid API key or access token (unrecognized login or wrong password)")
    });

    it("returns all products", async function () {
        const response = await request
        .get("/products.json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);
    });

    it("returns a product by id", async function () {
        const response = await request
        .get("/products/" + productId + ".json")
        .set('X-Shopify-Access-Token', process.env.API_KEY);
  
        expect(response.status).to.eql(200);

        const product = response.body.product;
        expect(product).to.include.keys("vendor", "product_type", "status", "tags", "variants", "options", "images");
        expect(product.vendor).to.eql("Matt's Goods Demo");
        expect(product.product_type).to.eql("Bowling");
        expect(product.status).to.eql("active");
    });
});