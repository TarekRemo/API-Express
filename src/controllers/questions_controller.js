import {db} from "../db/database.js"; 
import {questions} from "../db/schema.js"
import { request, response } from 'express'
import {eq} from 'drizzle-orm';

export const getAllQuestions = async (req, res) => {
    try{
        const result = await db
            .select()
            .from(questions)
            .orderBy('created_at', 'desc')

        res.status(200).json(result);
    }
    catch(err){
        res.status(500).send({
            error: 'Failed to query questions'
        });
    }
}; 

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const createQuestion = async (req, res)=>{
    const { questionText, answer, difficulty } = req.body // destructuration, on récupère les champs plutot que l'objet

    if(!questionText || !answer){
        return res.status(400).send({ error: "question and answer are required" })
    }

    try {
        const [newQuestion] = await db.insert(questions).values({
            questionText,
            answer,
            difficulty,
        }).returning()

        res.status(201).json({
            message: 'Question created',
            data: newQuestion,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: 'Failed to create question'
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const deleteQuestion = async (req, res) => {
    const {id} = req.params;
     try{

        const [deleted] = await db.delete(questions).where(eq(questions.id, id)).returning();
        if(!deleted){
            return res.status(404).json({
                message: 'Question not found',
                data: deleted,
            });
        }

        return res.status(200).json({
            message: 'Question created',
            data: result,
        });
        
    }
    catch(err){
        res.status(500).send({
            error: err.message
        });
    }   
}