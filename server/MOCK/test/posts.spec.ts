import request from 'supertest'
import makeApp from '../app'
import { jest } from '@jest/globals'

const createPost = jest.fn()

const app = makeApp({
    createPost,
})


describe("test post controllers", () => {

  beforeEach(() => {
    createPost.mockReset()
  })

  describe("Valid post submitted", () => {
    test("Should save the user_id and link to the database", async () => {
      const bodyData = [
        {user_id: 1, link: "<iframe>"},
        {user_id: 2, link: "<iframe>"},
      ]

      for (const body of bodyData) {
        createPost.mockReset()
        await request(app).post("/api/post/create").send(body)
        expect(createPost.mock.calls[0][0]).toBe(body.user_id)
        expect(createPost.mock.calls[0][1]).toBe(body.link)
      }
    })

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/post/create").send({
        user_id: 1,
        link: "<iframe>"
      })
      expect(response.statusCode).toBe(200)
    })

  })

})