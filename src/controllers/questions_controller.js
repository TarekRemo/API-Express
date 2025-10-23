import {db} from "../db/database.js"; 
import {questions} from "../db/schema.js"

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


export const postQuestions = (req, res) => {

    var questions = req.body;

    if(!Array.isArray(questions)){
        questions = [questions];
    }
    
    var isValid; 
    var validQuestions = [];

    questions.forEach(question => {
        isValid = question.question && question.awnser; 
        if(isValid){
            validQuestions.push(question);
        }
    });

    return res.status(200).send(validQuestions);
}


export const deleteQuestion = (req, res) => {
    const {id} = req.params; 
    
    return res.status(200).send({message: `question ${id} deleted`});
}