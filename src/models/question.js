import {z} from 'zod';

export const createQuestionSchema = z.object({
    question: z.string().min(1).max(255, 'question text must be at most 255 characters long'),
    awnser: z.string().min(1).max(255),
    difficulty: z.enum(['easy', 'medium', 'hard']),
});


export const questionIDSchema = z.object({
    id: z.uuid() //example format : '550e8400-e29b-41d4-a716-446655440000'
});