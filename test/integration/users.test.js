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

test("POST /api/v1/users/signup", async() => {
    const data = {
        name: "mamang capron",
        email: "iniemailsaya1@gmail.com",
        password: "password"
    };
    const status = {
        status: "Success"
    }
    await supertest(app)
        .post("/api/v1/users/signup")
        .send(data)
        .then((res) => {
            console.log(res.body)
            expect(res.body.status).toBe(status.status);
        });
})

test("POST /api/v1/users/login", async() => {
    const data = {
        email: "kuromashiro0123@gmail.com",
        password: "password"
    }
    const status = {
        status: "success"
    }
    await supertest(app)
        .post("/api/v1/users/login")
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status.status)
        })
})

test("GET /api/v1/users/profile/me", async() => {
    const status = "success"

    const token = await supertest(app).post("/api/v1/users/login").send({
        email: "kuromashiro0123@gmail.com",
        password: "password",
    });
    await supertest(app)
        .get("/api/v1/users/profile/me")
        .set("Authorization", "Bearer " + token.body.data)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
})

test("GET /api/v1/users/user/:id", async() => {
    const status = "success"
    await supertest(app)
        .get("/api/v1/users/user/6166e34d04911310aafedac9")
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe(status);
        });
})

// test("PUT /api/v1/users/likecategories", async() => {
//     const status = "Success"
//     const data = {
//         categoryId: ["6166eec398472010a2d7e97c"]
//     }

//     const token = await supertest(app).post("/api/v1/users/login").send({
//         email: "kuromashiro0123@gmail.com",
//         password: "password",
//     })

//     await supertest(app)
//         .put("/api/v1/users/likecategories")
//         .set("Authorization", "Bearer " + token.body.data)
//         .send(data)
//         .expect(200)
//         .then((res) => {
//             expect(res.body.status).toBe(status)
//         })

// })