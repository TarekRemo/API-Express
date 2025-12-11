import {db} from './database.js';
import {users, questions} from './schema.js';
import bcrypt from 'bcrypt';

const seed = async () => {
    console.log('Starting database seeding...'); 

    try{
        await db.delete(users); 
        await db.delete(questions); 
        
        const password = await bcrypt.hash('password', 12);
        
        const SeedUsers = [
            {
                email: 'tata@gmail.com',
                username: 'tata',
                password: password,
            },
            {
                email: 'toto@gmail.com',
                username: 'toto',
                password: password,
            },
            {
                email: 'titi@gmail.com',
                username: 'titi',
                password: password,
            },
        ]; 
        const result = await db.insert(users).values(SeedUsers).returning();

        const SeedQuestions = [
            {
                questionText: 'Quelle est la cpaitale de la France?',
                answer: 'Paris',
                difficulty: 'easy',
                createdBy: result[0].id
            },
            {
                questionText: 'Quel est le plus grand océan du monde?',
                answer: "L'océan Pacifique",
                difficulty: 'medium',
                createdBy: result[1].id
            },
            {
                questionText: 'Qui a écrit "Les Misérables"?',
                answer: 'Victor Hugo',
                difficulty: 'difficult',
                createdBy: result[2].id
            },
        ]; 
        await db.insert(questions).values(SeedQuestions);

        console.log('Database seeded successfully'); 
        console.log('email : ' + result[0].email); 
        console.log('username : ' + result[0].username); 
        console.log('username : password'); 
    }   
    catch(error){
        console.log(error);
    }
}


seed();