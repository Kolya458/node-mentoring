// eslint-disable-next-line no-unused-vars
import { Request } from 'express';
import * as UserController from './controller';
import mockResponse from '../../mocks/response.mock';
import mockNext from '../../mocks/next.mock';
import mockError from '../../mocks/error.mock';
import UserService from './service';
import { RefreshToken } from '../../database/models/RefreshToken';

jest.mock('./service.ts');

const mockSeqOpts = { include: [RefreshToken] };

describe('UserController', () => {
    beforeEach(() => {
        jest.spyOn(mockResponse, 'json');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        const mockRequest = {} as Request;
        const entities: any[] = [];

        it('Should successfully response with all entities', async () => {
            jest
                .spyOn(UserService, 'findAll')
                .mockResolvedValue(entities);
            await UserController.findAll(mockRequest, mockResponse, mockNext);
            expect(UserService.findAll).toHaveBeenCalledTimes(1);
            expect(UserService.findAll).toHaveBeenCalledWith(mockSeqOpts);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entities);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'findAll')
                .mockRejectedValue(mockError);

            await UserController.findAll(mockRequest, mockResponse, mockNext);

            expect(UserService.findAll).toHaveBeenCalledTimes(1);
            expect(UserService.findAll).toHaveBeenCalledWith(mockSeqOpts);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe('findById', () => {
        const id = 1;
        const mockRequest = ({ params: { id } } as unknown) as Request;
        const entity = { id: 1, value: 'test' };

        it('Should successfully response with found entity or with {}, if it not exists', async () => {
            jest
                .spyOn(UserService, 'findById')
                .mockResolvedValue(entity);

            await UserController.findById(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.findById).toHaveBeenCalledTimes(1);
            expect(UserService.findById).toHaveBeenCalledWith(id);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entity);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'findById')
                .mockRejectedValue(mockError);

            await UserController.findById(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.findById).toHaveBeenCalledTimes(1);
            expect(UserService.findById).toHaveBeenCalledWith(id);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });


    describe('create', () => {
        const body = { entity: 'test' };
        const mockRequest = { body } as Request;

        it('Should successfully response with created entity', async () => {
            jest.spyOn(UserService, 'create').mockResolvedValue(body);

            await UserController.create(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.create).toHaveBeenCalledTimes(1);
            expect(UserService.create).toHaveBeenCalledWith(body);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(body);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'create')
                .mockRejectedValue(mockError);

            await UserController.create(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.create).toHaveBeenCalledTimes(1);
            expect(UserService.create).toHaveBeenCalledWith(body);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe('update', () => {
        const body = { entity: 'test' };
        const id = 1;
        const mockRequest = {
            body,
            params: {
                id
            }
        } as unknown as Request;

        it('Should successfully response with updated entity', async () => {
            jest.spyOn(UserService, 'update').mockResolvedValue(body);

            await UserController.update(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.update).toHaveBeenCalledTimes(1);
            expect(UserService.update).toHaveBeenCalledWith(body);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(body);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'update')
                .mockRejectedValue(mockError);

            await UserController.update(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.update).toHaveBeenCalledTimes(1);
            expect(UserService.update).toHaveBeenCalledWith(body);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe('delete', () => {
        const id = 1;
        const mockRequest = ({ params: { id } } as unknown) as Request;
        const entities = { status: 'success' };

        it('Should successfully response with refreshed list of all entities', async () => {
            jest
                .spyOn(UserService, 'delete')
                .mockResolvedValue(entities);

            await UserController.deleteUser(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.delete).toHaveBeenCalledTimes(1);
            expect(UserService.delete).toHaveBeenCalledWith(id);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entities);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'delete')
                .mockRejectedValue(mockError);

            await UserController.deleteUser(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(UserService.delete).toHaveBeenCalledTimes(1);
            expect(UserService.delete).toHaveBeenCalledWith(id);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe('getAutoSuggestUsers', () => {
        const loginSubstring = 'test';
        const limit = 2;
        const mockRequest = { body: { loginSubstring, limit } } as Request;
        const users: any[] = [{ user: 'user' }];

        it('Should successfully response with suggested user entities list or with []', async () => {
            jest
                .spyOn(UserService, 'getAutoSuggestUsers')
                .mockResolvedValue(users);

            await UserController.getAutoSuggestUsers(
                mockRequest,
                mockResponse,
                mockNext
            );

            expect.assertions(4);
            expect(UserService.getAutoSuggestUsers).toHaveBeenCalledTimes(1);
            expect(UserService.getAutoSuggestUsers).toHaveBeenCalledWith({ loginSubstring, limit });
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(users);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(UserService, 'getAutoSuggestUsers')
                .mockRejectedValue(mockError);

            await UserController.getAutoSuggestUsers(
                mockRequest,
                mockResponse,
                mockNext
            );

            expect.assertions(4);
            expect(UserService.getAutoSuggestUsers).toHaveBeenCalledTimes(1);
            expect(UserService.getAutoSuggestUsers).toHaveBeenCalledWith({ loginSubstring, limit });
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});
