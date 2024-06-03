import { Request, Response } from 'express';
import Credit from '../models/Credit';
import { getCreditsUsedStats } from '../services/creditService';
import { getErrorMessage } from '../utils/errorHandler';

export async function getCreditsHandler(req: Request, res: Response) {
  const { patientId } = req.params;

  try {
    const credits = await Credit.findAll({
      where: {
        patient: patientId,
      },
    });
    const stats = await getCreditsUsedStats(patientId);
    res.status(200).json({ credits, stats });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
}
