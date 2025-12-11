import {request, response} from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db/database.js';
import {users} from '../db/schema.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
import {eq} from 'drizzle-orm';


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const register = async (req, res) => {
    try{
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const [ newUser ] = await db.insert(users).values({
            username: username, 
            email: email,
            password: hashedPassword
        })
        .returning({
            email: users.email,
            username: users.username,
            id: users.id
        });

        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            message: 'User created',
            userData: newUser,
            token: token
        });
    }
    catch(e){
        return res.status(500).json({
            error: e.message
        });
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const [user] = await db.select().from(users).
                            where(eq(
                                users.email, email
                            )); 

        if(!user){
            return res.status(404).json({
                error: "user not found"
            });
        }
            
        const rightPassword = bcrypt.compareSync(password, user.password);
        if(! rightPassword){
            return res.status(401).json({
                error: "wrong password"
            });
        }

        const token = jwt.sign( {userId: user.id} , process.env.JWT, {expiresIn: '24h'});

        return res.status(200).json({
            message: "Logged in successfully",
            userData: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token: token
        });
    }
    catch(e){
        return res.status(500).json({
            error: e.message
        });
    }
}


