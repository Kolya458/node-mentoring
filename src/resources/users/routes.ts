import { Router } from 'express';
import { UserService } from './service';
import { validate } from '../../validation/validation';

export class UserRoutes {
    private userService: UserService;
    public router: Router

    constructor() {
        this.userService = new UserService();
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', this.userService.getAllUsers);
        this.router.post('/', validate('user-schema'), this.userService.createUser);
        this.router.get('/auto', this.userService.getAutoSuggestUsers);
        this.router
            .route('/:id')
            .get(this.userService.getUserById)
            .delete(this.userService.deleteUser)
            .put(validate('user-schema'), this.userService.updateUser);
    }
}
export default new UserRoutes().router;
