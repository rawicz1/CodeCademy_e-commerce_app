const request = require('supertest')
const app = require('./app')


describe("POST /signup", () => {
    describe("given a name, email and password", () => {

        test("should create a new user and return code 200", async () => {
            const response = await request(app).post("/signup").send({
                email: "sample1@sampleemail.com",
                password: "title222", 
                first_name: "my name"                
                })
            expect(response.statusCode).toBe(200)
            })

        test("should confirm that email exists", async () => {
            const response = await request(app).post("/signup").send({
                email: "sample@sampleemail.com",
                password: "title222", 
                first_name: "my name"                
            })
            expect(response.text).toEqual(expect.stringContaining("Key (email)=(sample@sampleemail.com) already exists"))           
            })

        test("should respond with invalid email format error", async () => {
            const response = await request(app).post("/signup").send({
                email: "sample@sample",
                password: "title222", 
                first_name: "my name"                
            })               
            expect(response.text).toEqual(expect.stringContaining("Invalid email format")) 
            })
        
        test("should respond with password too short", async () => {
            const response = await request(app).post("/signup").send({
                email: "sample@sample.com",
                password: "title", 
                first_name: "my name"                
            })
            expect(response.text).toEqual(expect.stringContaining("Password needs to be longer than 6 characters")) 
        })

        test("should respond 400 code password missing", async () => {
            const response = await request(app).post("/signup").send({
                email: "sample@sample.com",
                // password: "title", 
                first_name: "my name"                
            })
            expect(response.statusCode).toBe(400) 
        })
    })
    
})

//-------------------------------Entries

describe("GET /entries/:userEmail", () => {
    describe("should return entries from a user", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/entries/test@test.com")
            expect(response.statusCode).toBe(200)            
        })
    })
    
})

describe("POST /entries", () => {
    describe("given an input should post data to database", () => {       

        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/entries").send({
                user_email: "email",
                title: "title", 
                date: "date", 
                content: "conten111t" 
            })
            expect(response.statusCode).toBe(200)            
        })
          
    })
    
})