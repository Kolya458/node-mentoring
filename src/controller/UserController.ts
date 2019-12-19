import { UserService } from '../service/UserService';

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
        this.app.route('/append-user').post(this.userService.createUser);
        this.app
            .route('/user/:id')
            .get(this.userService.getUserById)
            .delete(this.userService.deleteUser)
            .put(this.userService.updateUser);
        this.app.route('/get-autocomplete').get(this.userService.getAutoSuggestUsers);
    }
}
