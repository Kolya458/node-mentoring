// eslint-disable-next-line no-unused-vars
import { Request } from 'express';
import * as GroupController from './controller';
import mockResponse from '../../mocks/response.mock';
import mockNext from '../../mocks/next.mock';
import mockError from '../../mocks/error.mock';
import GroupService from './service';
import { Users } from '../../database/models/User';
// eslint-disable-next-line no-unused-vars
import { Groups } from '../../database/models/Group';

jest.mock('./service.ts');

const mockSeqOpts = { include: [Users] };

describe('GroupController', () => {
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
                .spyOn(GroupService, 'findAll')
                .mockResolvedValue(entities);
            await GroupController.findAll(mockRequest, mockResponse, mockNext);
            expect(GroupService.findAll).toHaveBeenCalledTimes(1);
            expect(GroupService.findAll).toHaveBeenCalledWith(mockSeqOpts);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entities);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'findAll')
                .mockRejectedValue(mockError);

            await GroupController.findAll(mockRequest, mockResponse, mockNext);

            expect(GroupService.findAll).toHaveBeenCalledTimes(1);
            expect(GroupService.findAll).toHaveBeenCalledWith(mockSeqOpts);
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
                .spyOn(GroupService, 'findById')
                .mockResolvedValue(entity);

            await GroupController.findById(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.findById).toHaveBeenCalledTimes(1);
            expect(GroupService.findById).toHaveBeenCalledWith(1, mockSeqOpts);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entity);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'findById')
                .mockRejectedValue(mockError);

            await GroupController.findById(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.findById).toHaveBeenCalledTimes(1);
            expect(GroupService.findById).toHaveBeenCalledWith(1, mockSeqOpts);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });


    describe('create', () => {
        const body = { entity: 'test' };
        const mockRequest = { body } as Request;

        it('Should successfully response with created entity', async () => {
            jest.spyOn(GroupService, 'create').mockResolvedValue(body);

            await GroupController.create(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.create).toHaveBeenCalledTimes(1);
            expect(GroupService.create).toHaveBeenCalledWith(body);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(body);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'create')
                .mockRejectedValue(mockError);

            await GroupController.create(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.create).toHaveBeenCalledTimes(1);
            expect(GroupService.create).toHaveBeenCalledWith(body);
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
            jest.spyOn(GroupService, 'update').mockResolvedValue(body);

            await GroupController.update(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.update).toHaveBeenCalledTimes(1);
            expect(GroupService.update).toHaveBeenCalledWith(body);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(body);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'update')
                .mockRejectedValue(mockError);

            await GroupController.update(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.update).toHaveBeenCalledTimes(1);
            expect(GroupService.update).toHaveBeenCalledWith(body);
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
                .spyOn(GroupService, 'delete')
                .mockResolvedValue(entities);

            await GroupController.deleteGroup(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.delete).toHaveBeenCalledTimes(1);
            expect(GroupService.delete).toHaveBeenCalledWith(id);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(entities);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'delete')
                .mockRejectedValue(mockError);

            await GroupController.deleteGroup(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.delete).toHaveBeenCalledTimes(1);
            expect(GroupService.delete).toHaveBeenCalledWith(id);
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
    describe('addUsers', () => {
        const id = 1;
        const userIds = [1, 2, 3];
        const mockRequest = ({
            params: { id },
            body: { userIds }
        } as unknown) as Request;
        const group = {} as Groups;

        it('Should successfully response with refreshed group data', async () => {
            jest.spyOn(GroupService, 'addUsers').mockResolvedValue(group);

            await GroupController.addUsers(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.addUsers).toHaveBeenCalledTimes(1);
            expect(GroupService.addUsers).toHaveBeenCalledWith(
                id,
                userIds
            );
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(group);
        });

        it("Should failed and execute 'next' function with error", async () => {
            jest
                .spyOn(GroupService, 'addUsers')
                .mockRejectedValue(mockError);

            await GroupController.addUsers(mockRequest, mockResponse, mockNext);

            expect.assertions(4);
            expect(GroupService.addUsers).toHaveBeenCalledTimes(1);
            expect(GroupService.addUsers).toHaveBeenCalledWith(
                id,
                userIds
            );
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});
