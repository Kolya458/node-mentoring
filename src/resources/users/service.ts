/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { users } from '../../collections/UserCollection';
import { User } from '../../models/User';

export class UserService {
    public getAllUsers(req: Request, res: Response) {
        const allUsers: User[] = users.findAll();
        res.json(allUsers);
    }

    public getUserById(req: Request, res: Response) {
        const id:string = req.params.id;
        const user: User | undefined = users.findById(id);
        res.json(user);
    }

    public createUser(req: Request, res: Response) {
        const { login, password, age } = req.body;
        const newUser = new User(login, password, age);
        users.append(newUser);
        res.json(newUser);
    }

    public deleteUser(req: Request, res: Response) {
        const id:string = req.params.id;
        const error: Error | undefined = users.delete(id);
        if (error) {
            res.status(422).json({ status: 'failed' });
        } else {
            res.json({ status: 'success' });
        }
    }

    public updateUser(req: Request, res: Response) {
        const id:string = req.params.id;
        const { login, password, age } = req.body;
        const error: Error | undefined = users.update(id, login, password, age);
        if (error) {
            res.status(422).json({ status: 'failed' });
        } else {
            res.json({ status: 'success' });
        }
    }

    public getAutoSuggestUsers(req: Request, res: Response) {
        const login: string = req.body.login;
        const limit: number = req.body.limit;
        const result: User[] = users.findBySubstr(login, limit);
        res.json(result);
    }
}
