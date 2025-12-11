import {Router} from 'express';
import {getAllQuestions, deleteQuestion,createQuestion} from '../controllers/questions_controller.js'
import { createQuestionSchema, questionIDSchema } from '../models/question.js';
import { validateBody, validateParams } from '../middlewares/validation.js';

const router = Router();

router.get('/', getAllQuestions);
router.post('/', validateBody(createQuestionSchema),createQuestion );
router.delete('/:id', validateParams(questionIDSchema),deleteQuestion);

export default router;
