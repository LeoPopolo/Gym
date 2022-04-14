import bcrypt from 'bcryptjs';

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    phone_number: string;
    address: string;

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