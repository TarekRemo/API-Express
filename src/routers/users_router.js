import { Router } from 'express';
import { getAllUsers } from '../controllers/users_controller.js';


const router = Router();

router.get('/', getAllUsers);


export default router;