import { UserService } from '../service/UserService';
import { validate } from '../validation/validation';

export class UserController {
    private userService: UserService;
    private app: any;

    constructor(app: any) {
        this.app = app;
        this.userService = new UserService();
        this.routes();
    }

    public routes() {
        this.app.route('/').get(this.userService.getAllUsers);
        this.app.route('/append-user').post(validate('user-schema'), this.userService.createUser);
        this.app
            .route('/user/:id')
            .get(this.userService.getUserById)
            .delete(this.userService.deleteUser)
            .put(validate('user-schema'), this.userService.updateUser);
        this.app.route('/get-autocomplete').get(this.userService.getAutoSuggestUsers);
    }
}
