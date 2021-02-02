const request = require("supertest")
const app = require('../../server')
const newProduct = require("../data/new-product.json")


test("Post /api/products", async () => {
    const response = await request(app)
            .post("/api/products")
            .send(newProduct);
        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe(newProduct.name),
        expect(response.body.description).toBe(newProduct.description)
})

test("should return 500 on Post /api/products", async () => {
    const response = await request(app)
        .post('/api/products')
        .send({name : "mac"})
    expect(response.statusCode).toBe(500)

    expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required."})
})