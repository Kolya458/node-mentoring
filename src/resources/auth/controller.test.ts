// eslint-disable-next-line no-unused-vars
import { Request } from 'express';
import * as AuthController from './controller';
import mockResponse from '../../mocks/response.mock';
import mockNext from '../../mocks/next.mock';
import mockError from '../../mocks/error.mock';
import AuthService from './service';

jest.mock('./service.ts');

const mockTokens = {
    token: 'token',
    refreshToken: 'refresh'
};

describe('AuthController', () => {
    beforeEach(() => {
        jest.spyOn(mockResponse, 'json');
        jest.spyOn(mockResponse, 'status');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('signIn', () => {
        const login = 'test';
        const password = 'test';
        const mockRequest = {
            body: { login, password }
        } as Request;

        it('Should successfully response with generated tokens', async () => {
            jest
                .spyOn(AuthService, 'signIn')
                .mockResolvedValue(mockTokens);

            await AuthController.signIn(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(AuthService.signIn).toHaveBeenCalledTimes(1);
            expect(AuthService.signIn).toHaveBeenCalledWith(
                login,
                password
            );
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTokens);
        });

        it('Should failed with response status 403 and error message', async () => {
            jest.spyOn(AuthService, 'signIn').mockRejectedValue(mockError);

            await AuthController.signIn(mockRequest, mockResponse, mockNext);
            expect(AuthService.signIn).toHaveBeenCalledTimes(1);
            expect(AuthService.signIn).toHaveBeenCalledWith(
                login,
                password
            );
            expect(mockNext).toHaveBeenCalledTimes(1);
        });
    });

    describe('signOut', () => {
        const userId = 'user';
        const mockRequest = {
            body: { userId }
        } as Request;

        it('Should successfully response with message', async () => {
            const message = {
                status: 'success'
            };
            jest.spyOn(AuthService, 'signOut').mockResolvedValue();

            await AuthController.signOut(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(AuthService.signOut).toHaveBeenCalledTimes(1);
            expect(AuthService.signOut).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(message);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(AuthService, 'signOut')
                .mockRejectedValue(mockError);

            await AuthController.signOut(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(AuthService.signOut).toHaveBeenCalledTimes(1);
            expect(AuthService.signOut).toHaveBeenCalledWith(userId);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe('refresh', () => {
        const refreshToken = 'refreshToken';
        const mockRequest = {
            body: { refreshToken }
        } as Request;

        it('Should successfully response with new pair of tokens', async () => {
            jest
                .spyOn(AuthService, 'refresh')
                .mockResolvedValue(mockTokens);

            await AuthController.refresh(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(AuthService.refresh).toHaveBeenCalledTimes(1);
            expect(AuthService.refresh).toHaveBeenCalledWith(refreshToken);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(mockTokens);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(AuthService, 'refresh')
                .mockRejectedValue(mockError);

            await AuthController.refresh(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(AuthService.refresh).toHaveBeenCalledTimes(1);
            expect(AuthService.refresh).toHaveBeenCalledWith(refreshToken);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});
