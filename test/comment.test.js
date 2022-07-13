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

// test("POST /api/v1/comments/616a814e2d9ef9e211bb0328", async() => {
//     const data = {
//         content: "wahh mantep nih"
//     };
//     const status = {
//         status: "success"
//     }
//     const token = await supertest(app).post("/api/v1/users/login").send({
//         email: "kuromashiro0123@gmail.com",
//         password: "password",
//     });
//     await supertest(app)
//         .post("/api/v1/comments/616a814e2d9ef9e211bb0328")
//         .set("Authorization", "Bearer " + token.body.data)
//         .send(data)
//         .expect(201)
//         .then((res) => {
//             expect(res.body.status).toBe(status.status);
//         });
// })


test("PUT /api/v1/comments/:id", async() => {
    const updateData = {
        content: "update comment ahh",
    };
    const status = "success"

    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .put("/api/v1/comments/616e540895d02383ce454957")
        .set("Authorization", "Bearer " + token.body.data)
        .send(updateData)
        .expect(201)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });

})


test("DELETE /api/v1/comment/:id", async() => {
    const data = {
        content: "ini adalah comment"
    };
    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    const createComment = await supertest(app)
        .post("/api/v1/comments/616a814e2d9ef9e211bb0328")
        .set("Authorization", "Bearer " + token.body.data)
        .send(data)

    await supertest(app)
        .delete("/api/v1/comments/" + createComment.body.data._id)
        .set("Authorization", "Bearer " + token.body.data)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe("object");
        });
});