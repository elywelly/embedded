import request from 'supertest'
import makeApp from '../app'
import { jest } from '@jest/globals'

const createUser = jest.fn()

const app = makeApp({
  createUser,
})


describe("test user controllers", () => {

  beforeEach(() => {
    createUser.mockReset()
  })

  describe("Valid username, email and password", () => {
    test("Should save the username, email and password to the database", async () => {
      const bodyData = [
        {username: "username1", email: "username1@test.com", password: "password1"},
        {username: "username2", email: "username2@test.com", password: "password2"},
        {username: "username3", email: "username3@test.com", password: "password3"},
      ]
      for (const body of bodyData) {
        createUser.mockReset()
        await request(app).post("/api/users/create").send(body)
        expect(createUser.mock.calls[0][0]).toBe(body.username)
        expect(createUser.mock.calls[0][1]).toBe(body.email)
        expect(createUser.mock.calls[0][2]).toBe(body.password)
      }
    })

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/users/create").send({
        username: "username",
        email: 'email@test.com',
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })

  })

  describe("when the username, email and/or password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {email: '' },
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/api/users/create").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})