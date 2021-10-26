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


test("GET /api/v1/comments/616bc1a915f73f8d5d5bbea4", async() => {
    await supertest(app)
        .get("/api/v1/comments/616bc1a915f73f8d5d5bbea4")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("PUT /api/v1/comments/:id", async() => {
    const updateData = {
        content: "Gimana nih, saya gak ada orang tua sama gak ada orang deket :(",
    };
    const status = "success"

    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .put("/api/v1/comments/616a948727abbfa2c1dab890")
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
        .post("/api/v1/comments/616bc1a915f73f8d5d5bbea4")
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