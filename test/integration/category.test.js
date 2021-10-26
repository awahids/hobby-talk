const app = require("../../server");
const mongoose = require("mongoose");
const supertest = require('supertest')

beforeEach((done) => {
    mongoose.connect(
        "mongodb+srv://hobbytalks:hobbies@cluster0.b9ly9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    );
});

afterEach((done) => {
    mongoose.connection.close(() => done());
});

test("GET /api/v1/category", async() => {
    await supertest(app)
        .get("/api/v1/category")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("PUT /api/v1/category/:id", async() => {
    const updateData = {
        name: "Foods",
    };
    const status = "succses"

    await supertest(app)
        .put("/api/v1/category/6172d7ef0f79346bbb9db5ca")
        .send(updateData)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });

})

test("DELETE /api/v1/category/:id", async() => {
    const data = {
        name: "Mantab"
    };
    const createCategories = await supertest(app)
        .post("/api/v1/category/")
        .send(data)

    await supertest(app)
        .delete("/api/v1/category/" + createCategories.body.data._id)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe("object");
        });
});