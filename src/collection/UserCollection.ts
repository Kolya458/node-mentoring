import { User } from '../entity/User';

export class UsersCollection {
    private collection: User[];

    constructor(collection: User[]) {
        this.collection = collection;
    }

    findById(id:string): User | undefined {
        const user: User | undefined = this.collection.find(el => el.getId() === id);
        return user;
    }

    findAll(): User[] {
        const existingUsers = this.collection.filter(el => el.getStatus() === false);
        return existingUsers;
    }

    append(user: User): void {
        this.collection.push(user);
    }

    delete(id: string): Error | undefined {
        const user = this.findById(id);
        try {
            if (user) {
                user.delete();
            } else {
                throw new Error('user doen\'t exist');
            }
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    update(id:string, login:string, password: string, age:number): Error | undefined {
        const user = this.findById(id);
        try {
            if (user) {
                user.update(login, password, age);
            } else {
                throw new Error('user doen\'t exist');
            }
        } catch (e) {
            console.log(e);
            return e;
        }
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
