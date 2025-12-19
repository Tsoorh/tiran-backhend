import { userService } from "../api/user/user.service";


describe('user-service test', () => {
    test('Should return user with _id', async () => {
        const newTestUser = {
            username: "testUser",
            password: "testPassword",
            fullname: "testFullname",
            isAdmin: false
        }
        const savedUser = await userService.add(newTestUser)
        expect(savedUser).toBeDefined()
        expect(savedUser).toHaveProperty('_id')
        expect(savedUser.username).toBe(newTestUser.username)
    })
})