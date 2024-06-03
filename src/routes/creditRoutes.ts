import { Router } from 'express';
import { getCreditsHandler } from '../controllers/creditController';

const router = Router();

router.get('/credits/:patientId', getCreditsHandler);

export default router;
