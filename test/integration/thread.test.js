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

test("GET /api/v1/threads/oldest", async() => {
    await supertest(app)
        .get("/api/v1/threads/oldest")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("PUT /api/v1/threads/edit/:id", async() => {
    const updateData = {
        content: "Aduhai ini mah lagu nasional saya",
    };
    const status = "success"

    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .put("/api/v1/threads/edit/616bc1a915f73f8d5d5bbea4")
        .set("Authorization", "Bearer " + token.body.data)
        .send(updateData)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });

})



test("GET /api/v1/threads/search/:keyword", async() => {
    await supertest(app)
        .get("/api/v1/threads/search/atau")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("GET /api/v1/threads/get/:id", async() => {
    const status = "success"
    await supertest(app)
        .get("/api/v1/threads/get/616bc1a915f73f8d5d5bbea4")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
});

test("GET /api/v1/threads/newest", async() => {
    await supertest(app)
        .get("/api/v1/threads/newest")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("GET /api/v1/threads/more/userId/threadId", async() => {
    const status = "success"
    await supertest(app)
        .get("/api/v1/threads/more/6166e34d04911310aafedac9/616a814e2d9ef9e211bb0328")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
});

test("GET /api/v1/threads/trending", async() => {
    await supertest(app)
        .get("/api/v1/threads/trending")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("GET /api/v1/threads/mostpopular", async() => {
    await supertest(app)
        .get("/api/v1/threads/mostpopular")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test("GET /api/v1/threads/hot", async() => {
    await supertest(app)
        .get("/api/v1/threads/hot")
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});


test("GET /api/v1/threads/mightlike", async() => {
    const status = "success"
    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .get("/api/v1/threads/mightlike")
        .set("Authorization", "Bearer " + token.body.data)
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});


test("GET /api/v1/threads/relatedtopic/:id", async() => {
    const status = "success"
    await supertest(app)
        .get("/api/v1/threads/relatedtopic/616bc1a915f73f8d5d5bbea4")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
});


test("GET /api/v1/threads/threadcategory/:id", async() => {
    const status = "success"
    await supertest(app)
        .get("/api/v1/threads/threadscategory/6166ef8c98472010a2d7e988")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
});