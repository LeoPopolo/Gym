import { Request, Response } from 'express';
import { User } from '../models/user';
import conn from '../database';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function signup(req: Request, res: Response) {
    
    const user = new User();
    
    const tmp_pass = await user.encryptPassword(req.body.password);
    if (tmp_pass) {
        user.password = (tmp_pass as any);
    }
    user.dni = req.body.dni;
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.password = tmp_pass

    console.log(user);

    await conn.query(`SELECT authentication.user('${user.dni}','${user.name}','${user.surname}','${user.email}','${user.password}')`)
    .then(resp => {
        
        console.log(resp as any)

        if ((resp as any).rows) {
            // generating token
            const token = jwt.sign({
                _id: user.dni
            }, process.env.TOKEN_SECRET);
    
            res.status(200).json({
                status: 'OK',
                token: token
            });
        }
    }).catch(err => {
        console.log(err);
        return res.status(400).send(err);
    });
};

export async function signin(req: Request, res: Response) {
    const user = new User();

    await conn.query(`SELECT webapi.authentication_user_login('${req.body.email}')`)
    .then(async resp => {
        
        if ((resp as any).rows) {            

            user.password = (resp as any).rows[0].authentication_user_login.password;
            user.id = (resp as any).rows[0].authentication_user_login.id;
            
            const correctPassword = await user.validatePassword(req.body.password);
    
            if (!correctPassword) {
                return res.status(400).json({
                    error: 'invalid password'
                });
            }

            const token = jwt.sign({
                _id: (resp as any).rows[0].authentication_user_login.id
            }, process.env.TOKEN_SECRET);
    
            res.header('Authorization', token).json({
                data: {
                    status :"ok",
                    id : user.id
                }
            });
        }
    }).catch(err => {
        console.log(err);
        return res.status(400).send(err);
    });
}

// export async function profile(req: Request, res: Response) {

//     let user = new User();

//     await conn.query('SELECT * FROM users WHERE id = ?', [req.userId]) 
//     .catch(err => {
//         return res.status(400).send(err);
//     })
//     .then(resp => {

//         if((resp as any).rows.length === 0 || (resp as any).rows === null || (resp as any).rows === undefined) {
//             return res.status(404).json({
//                 error: 'user not found'
//             });
//         } else {
//             user.id = (resp as any).rows[0].id;
//             user.password = (resp as any).rows[0].password;
//             user.username = (resp as any).rows[0].username;
//             user.email = (resp as any).rows[0].email;
//             user.phone_number = (resp as any).rows[0].phone_number;
//             user.address = (resp as any).rows[0].address;
    
//             res.status(200).json({
//                 data: {
//                     id: user.id,
//                     email: user.email,
//                     username: user.username,
//                     phone_number: user.phone_number,
//                     address: user.address
//                 }
//             }); 
//         }
//     });    
// }

// export async function users(req: Request, res: Response) {
//     var usersArray = [];

//     await conn.query(`SELECT *
//                         FROM authentication.user
//                         WHERE 1=1`)
//     .catch(err => {
//         return res.status(400).send(err);
//     })
//     .then(resp => {

//         if((resp as any).rows.length === 0) {
//             return res.status(404).json({
//                 error: 'No data found'
//             });
//         } else {
    
//             usersArray = (resp as any).rows;
    
//             res.status(200).json({
//                 data: usersArray
//             }); 
//         }
//     });
// }