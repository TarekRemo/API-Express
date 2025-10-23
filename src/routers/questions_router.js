import {Router} from 'express';
import {getAllQuestions, postQuestions, deleteQuestion} from '../controllers/questions_controller.js'
import { createQuestionSchema, questionIDSchema } from '../models/question.js';
import { validateBody, validateParams } from '../middlewares/validation.js';

const router = Router();

router.get('/', getAllQuestions);
router.post('/', validateBody(createQuestionSchema), postQuestions);
router.delete('/:id', validateParams(questionIDSchema),deleteQuestion);

export default router;
