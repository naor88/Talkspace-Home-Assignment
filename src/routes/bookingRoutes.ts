import { Router } from 'express';
import { createBookingHandler, getBookingsHandler, getBookingHistoryHandler } from '../controllers/bookingController';

const router = Router();

router.post('/bookings', createBookingHandler);
router.get('/bookings', getBookingsHandler);
router.get('/bookings/:bookingId/history', getBookingHistoryHandler);

export default router;
