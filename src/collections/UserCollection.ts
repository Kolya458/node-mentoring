import { User } from '../models/User';
import { UserException } from '../types/UserException';

export class UsersCollection {
    private collection: User[];

    constructor(collection: User[]) {
        this.collection = collection;
    }

    public findById(id:string): User | undefined {
        const user: User | undefined = this.collection.find(el => el.getId() === id);
        return user;
    }

    public findAll(): User[] {
        const existingUsers = this.collection.filter(el => el.getStatus() === false);
        return existingUsers;
    }

    public append(user: User): void {
        this.collection.push(user);
    }

    public delete(id: string) {
        const user = this.findById(id);
        if (user) {
            user.delete();
        } else {
            throw new UserException(400, 'can\'t delete');
        }
    }

    public update(id:string, login:string, password: string, age:number) {
        const user = this.findById(id);
        if (user) {
            user.update(login, password, age);
        } else {
            throw new UserException(400, 'can\'t update');
        }
    }

    public findBySubstr(substr: string, limit: number): User[] {
        const smallSubstr = substr.toLowerCase();
        const matches = this.collection.filter(el => el.getLogin().toLowerCase().includes(smallSubstr));
        matches.length = limit;
        return matches;
    }
}

export const usersArray: User[] = [
    new User('Serg', 'asd', 20),
    new User('Nick', 'asd', 20),
    new User('Misha', 'asd', 20),
    new User('Ivan', 'asd', 20),
    new User('Kirill', 'asd', 20)
];

export const users: UsersCollection = new UsersCollection(usersArray);
