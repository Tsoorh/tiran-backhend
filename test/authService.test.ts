// import { authService } from '../api/auth/auth.service';
// import { convertUserToMiniUser, userService } from '../api/user/user.service';
// import bcrypt from 'bcrypt';

// jest.mock('../api/user/user.service')
// jest.mock('bcrypt')

// describe('Login Function - Mock test', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     it('should login successfully with correct credentials', async () => {
//         const mockUser = {
//             _id: 'u101',
//             username: 'testuser',
//             password: 'hashed_password',
//             fullname: 'Test User'
//         };
//         const miniMock = {
//             _id: 'u101',
//             username: 'testuser',
//             fullname: 'Test User'
//         };
//         (userService.getByUsername as jest.Mock).mockResolvedValue(mockUser);
//         (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//         (convertUserToMiniUser as jest.Mock).mockResolvedValue(miniMock)

//         const result = await authService.login('testuser', 'plain_password');

//         expect(result).toHaveProperty('username', 'testuser');
//         expect(result).toHaveProperty('_id', 'u101');
//         expect(result).toHaveProperty('fullname', 'Test User');
//     });

//     it('should throw error if username does not exist', async () => {
//         (userService.getByUsername as jest.Mock).mockResolvedValue(null);

//         await expect(authService.login('unknown', '123')).rejects.toThrow("Username doesn't exist");
//     });

//     it('should throw error if password does not match', async () => {
//         const mockUser = { username: 'testuser', password: 'hashed_password' };
//         (userService.getByUsername as jest.Mock).mockResolvedValue(mockUser);

//         (bcrypt.compare as jest.Mock).mockResolvedValue(false);

//         await expect(authService.login('testuser', 'wrong_password')).rejects.toThrow("Username or password is incorrect");
//     });
// });



// describe('Login Function - Integration Test - No Mock', () => {
//     beforeEach(() => {
//         jest.clearAllMocks(); 
//     });

//     it('should login successfully with correct credentials', async () => {
//         const testUser = {
//             username: 'testuser',
//             password: await bcrypt.hash('plain_password', 10), 
//             fullname: 'Test User'
//         };
        
//         await userService.add(testUser);
        

//         const result = await authService.login('testuser', 'plain_password');
        
//         expect(result).toBeDefined();
//         expect(result.username).toBe('testuser');
//         expect(result._id).toBe('u101');
//         expect(result.fullname).toBe('Test User');
        
        
//         await userService.remove('testuser');
//     });
// });