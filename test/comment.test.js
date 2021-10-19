const app = require("../server");
const mongoose = require("mongoose");
const supertest = require('supertest')
const Comments = require('../models/Comment')

beforeEach((done) => {
    mongoose.connect(
        "mongodb+srv://hobbytalks:hobbies@cluster0.b9ly9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    );
});

afterEach((done) => {
    mongoose.connection.close(() => done());
});


test("GET /api/v1/comments/616a814e2d9ef9e211bb0328", async() => {
    await supertest(app)
        .get("/api/v1/comments/616a814e2d9ef9e211bb0328")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});