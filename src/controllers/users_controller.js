import {db} from "../db/database.js"; 
import {users} from "../db/schema.js"
import { request, response } from 'express'
import {eq} from 'drizzle-orm';

export const getAllUsers = async (req, res) => {
    try{
        const result = await db.select().from(users).orderBy('created_at', 'desc');
        return res.status(200).json(result);
    }
    catch(e){
        return res.status(500).send({
            error: e.message
        });
    }
}