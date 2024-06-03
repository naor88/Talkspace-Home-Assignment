import { Request, Response } from 'express';
import { createBooking, getBookings, getBookingHistory, getStats } from '../services/bookingService';
import { getErrorMessage } from '../utils/errorHandler';

export async function createBookingHandler(req: Request, res: Response) {
  const { time, patient, provider } = req.body;

  try {
    const booking = await createBooking(new Date(time), patient, provider);
    res.status(201).json({ message: 'Booking created successfully', booking: booking.toJSON() });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
}

export async function getBookingsHandler(req: Request, res: Response) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID must be provided as a query parameter.' });
  }

  try {
    const bookings = await getBookings(userId.toString());
    const stats = await getStats(userId.toString());
    res.status(200).json({ bookings, stats });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
}

export async function getBookingHistoryHandler(req: Request, res: Response) {
  const { bookingId } = req.params;

  try {
    const history = await getBookingHistory(bookingId);
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
}
