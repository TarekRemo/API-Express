import {db} from './database.js';
import {questions} from './schema.js';


const seed = async () => {
    console.log('Starting database seeding...'); 

    try{
        await db.delete(questions); 
        const SeedQuestions = [
            {
                questionText: 'Quelle est la cpaitale de la France?',
                answer: 'Paris',
                difficulty: 'easy',
            },
            {
                questionText: 'Quel est le plus grand océan du monde?',
                answer: "L'océan Pacifique",
                difficulty: 'medium',
            },
            {
                questionText: 'Qui a écrit "Les Misérables"?',
                answer: 'Victor Hugo',
                difficulty: 'difficult',
            },
        ]; 

        await db.insert(questions).values(SeedQuestions);

        console.log('Database seeded successfully'); 
    }   
    catch(error){
        console.log(error);
    }
}

seed();