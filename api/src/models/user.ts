import bcrypt from 'bcryptjs';

export class User {
    id: number;
    dni: number;
    name: string;
    surname: string;
    email: string;
    password: string;

    constructor() { }

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);

        let response: string = null;

        await bcrypt.hash(password, salt)
        .then(resp => {
            response = resp;            
        });

        if (response) {
            return response;
        }
    }

    async validatePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}