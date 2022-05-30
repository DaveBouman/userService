import UserService from '../../services/userService';
import { TestHelper } from '../testhelper';


beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe('Gateway Tests', () => {

    const userService = new UserService();
    test('Should create a new user', async () => {
        const user = await userService.create('testUser', 'testUser');
        expect(user.username).toBe('testUser');
        expect(user.password).not.toBe('testUser');
    });

    test('Should not return a user', async () => {
        const user = await userService.getUserByUsername('testUser');

        await userService.delete(user?.id);
        const user = await userService.getUserByUsername('testUser');

        expect(user).toBeNull();
    });
});