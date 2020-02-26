const uuidv1 = require('uuid/v1');

export class User {
    private id: string;
    private login: string;
    private password: string;
    private age: number;
    private isDeleted: boolean;

    constructor(login:string, password:string, age:number) {
        this.id = uuidv1();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }

    public getId(): string {
        return this.id;
    }

    public getStatus(): boolean {
        return this.isDeleted;
    }

    public getLogin(): string {
        return this.login;
    }

    public update(login: string, password: string, age:number) {
        this.login = login;
        this.password = password;
        this.age = age;
    }

    public delete() {
        this.isDeleted = true;
    }
}
