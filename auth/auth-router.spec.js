const request = require("supertest");
const server = require('../api/server');
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

describe("auth-router.js", () => {
    describe("POST /api/auth/register", () => {

        const user = {
            username: "anthonykawa",
            password: "password"
        }

        beforeEach(async () => {
            await db("users").truncate();
        })

        it("should return status code 201", () => {
            return request(server).post("/api/auth/register").send(user).expect(201);
        });
        it("should return JSON", () => {
            return request(server).post("/api/auth/register").send(user).then(res => {
                expect(res.type).toMatch(/json/);
            })
        });
        it("should create new user in DB and return new user with id", async () => {
            const response = await request(server).post("/api/auth/register").send(user)
            const dbUser = await db("users").where({username: user.username}).first();

            expect(JSON.stringify(response.body)).toEqual(JSON.stringify(dbUser));
        });

        it("should create a hash that can later be validated", async () => {
            await request(server).post("/api/auth/register").send(user)
            const dbUser = await db("users").where({username: user.username}).first();

            expect(bcrypt.compareSync(user.password, dbUser.password)).toEqual(true);
        })
    })

    describe("POST /api/auth/login", () => {
        const user = {
            username: "anthonykawa",
            password: "password"
        }
        beforeEach(async () => {
            await db("users").truncate();
        })

        it("should return status code 200 if user successfully logged in", async () => {
            await request(server).post("/api/auth/register").send(user);

            return request(server).post("/api/auth/login").send(user).expect(200);
        })
        it("should return status code of 401 if user is unsuccessfully logged in", async () => {
            await request(server).post("/api/auth/register").send(user);
            
            return request(server).post("/api/auth/login").send({username:"fred",password:"pass"}).expect(401);
        })
        it("should be including cookie sid in header", async () => {
            await request(server).post("/api/auth/register").send(user);
            
            const response = await request(server).post("/api/auth/login").send(user);
            expect(response.header["set-cookie"][0]).toMatch(/connect.sid/);
        });
    })
})