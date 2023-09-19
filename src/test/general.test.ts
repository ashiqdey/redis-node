import request from 'supertest';
import axios from 'axios';
import app from '../app'


const url = 'http://127.0.0.1:5000';


describe('GET /', () => {
    test('responds from root url', async () => {
        const res = await axios.get(url)

        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data).toMatch(/^Response from backend at/);
    },20000);
});

describe("POST /orm/validate", () => {
    describe("validate body", () => {
  
      test("should respond status 400", async () => {
        const response = await request(app).post("/orm/validate").send({
            "email":"ashiqdey2@gmail.com",
            "name":"ashique dey",
            "mobile":"123456789", // invalid
            "password":"qwerty@123"
        })
        expect(response.statusCode).toBe(400)
      })
      test("should specify json in the content type header", async () => {
        const response = await request(app).post("/orm/validate").send({
            "email":"ashiqdey2@gmail.com",
            "name":"ashique dey",
            "mobile":"1234567890",
            "password":"qwerty@123"
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
      test("response has key email", async () => {
        const response = await request(app).post("/orm/validate").send({
            "email":"ashiqdey2@gmail.com",
            "name":"ashique dey",
            "mobile":"1234567890",
            "password":"qwerty@123"
        })
        expect(response.body.email).toBeDefined()
      })
    })
  
 
  
  });