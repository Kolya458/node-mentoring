export class User {
    static count: number = 0;

    private id: string;
    private login: string;
    private password: string;
    private age: number;
    private isDeleted: boolean;

    constructor(login:string, password:string, age:number) {
        this.id = User.count.toString();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
        User.count++;
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
        this.login = login || this.login;
        this.password = password || this.password;
        this.age = age || this.age;
    }

    public delete() {
        this.isDeleted = true;
    }
}
