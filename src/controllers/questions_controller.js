export const getAllQuestions = (req, res) => {
    res.status(200).send(
        {
            id: "1",
            question: "Quelle est la capitale de la France ?",
            awnser: "Paris"
        }); 
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