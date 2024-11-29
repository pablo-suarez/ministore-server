import { environmentMongoUri } from "./environment-mongo-uri";

describe('environmentMongoUri', () => {
    const mockDbUser = 'testUser';
    const mockDbPassword = 'testPassword';
    const mockDbHost = 'localhost:12345';

    afterEach(() => {
        delete process.env.PROJECT_ENV;
    });

    it('should return the correct MongoDB URI when PROJECT_ENV is local', () => {
        process.env.PROJECT_ENV = 'local';
        const result = environmentMongoUri(mockDbUser, mockDbPassword, mockDbHost);
        expect(result).toBe(`mongodb://${mockDbUser}:${mockDbPassword}@${mockDbHost}/?authMechanism=DEFAULT`);
    });
    it('should return an empty string when PROJECT_ENV is not local', () => {
        process.env.PROJECT_ENV = 'prod';

        const result = environmentMongoUri(mockDbUser, mockDbPassword, mockDbHost);
        expect(result).toBe('');
    });

    it('should return an empty string when PROJECT_ENV is not defided', () => {
        const result = environmentMongoUri(mockDbUser, mockDbPassword, mockDbHost);
        expect(result).toBe('');
    })
})