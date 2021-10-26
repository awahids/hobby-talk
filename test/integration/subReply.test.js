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

test("GET /api/v1/subReply/616a97e2f8ee71e6330a64b1", async() => {
    await supertest(app)
        .get("/api/v1/subReply/616a97e2f8ee71e6330a64b1")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("PUT /api/v1/subReply/:id", async() => {
    const updateData = {
        content: "update subReply nih",
    };
    const status = "success"

    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .put("/api/v1/subReply/616a9e1e4d2b80ab1083d9b7")
        .set("Authorization", "Bearer " + token.body.data)
        .send(updateData)
        .expect(201)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });

})
test("DELETE /api/v1/reply/:id", async() => {
    const data = {
        content: "ini adalah subReply"
    };
    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    const createSubReply = await supertest(app)
        .post("/api/v1/subReply/616a97e2f8ee71e6330a64b1")
        .set("Authorization", "Bearer " + token.body.data)
        .send(data)
    console.log(createSubReply.body)
    await supertest(app)
        .delete("/api/v1/subReply/" + createSubReply.body.data._id)
        .set("Authorization", "Bearer " + token.body.data)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe("object");
        });
});﻿