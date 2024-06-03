import { Op } from 'sequelize';
import Booking from '../models/Booking';
import Credit from '../models/Credit';
import BookingStatusHistory from '../models/BookingStatusHistory';

export async function createBooking(time: Date, patient: string, provider: string) {
  const credit = await Credit.findOne({
    where: {
      expirationDate: { [Op.gt]: new Date() },
      BookingId: null,
    },
  });

  if (!credit) throw new Error('No unused, non-expired credits found.');

  const booking = await Booking.create({ time, patient, provider, CreditId: credit.id });
  await BookingStatusHistory.create({ status: booking.status, BookingId: booking.id });

  return booking;
}

export async function getBookings(userId: string) {
  const bookings = await Booking.findAll({
    where: { [Op.or]: [{ patient: userId }, { provider: userId }] },
  });
  return bookings;
}

export async function getBookingHistory(bookingId: string) {
  const history = await BookingStatusHistory.findAll({
    where: { BookingId: bookingId },
    order: [['timestamp', 'ASC']],
  });
  return history;
}

export async function getStats(providerId: string) {
  const stats = await Booking.findAll({
    attributes: [
      [Booking.sequelize!.fn('COUNT', Booking.sequelize!.literal('DISTINCT CASE WHEN status = "canceled" THEN id END')), 'canceledBookings'],
      [Booking.sequelize!.fn('COUNT', Booking.sequelize!.literal('DISTINCT CASE WHEN status = "rescheduled" THEN id END')), 'rescheduledBookings'],
    ],
    where: {
      provider: providerId,
      [Op.or]: [{ status: 'canceled' }, { status: 'rescheduled' }],
    },
  });

  const [result] = stats;

  return {
    canceledBookings: result.getDataValue('canceledBookings') || 0,
    rescheduledBookings: result.getDataValue('rescheduledBookings') || 0,
  };
}
