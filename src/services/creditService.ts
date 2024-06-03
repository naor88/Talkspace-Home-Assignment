import Credit from '../models/Credit';
import Booking from '../models/Booking';

export async function getCreditsUsedStats(patientId: string) {
  const totalCreditsQuery = await Credit.sum('type', {
    where: {
      BookingId: null,
    },
  });

  const stats = await Booking.findAll({
    attributes: [
      [Booking.sequelize!.fn('SUM', Booking.sequelize!.literal('CASE WHEN "Booking"."status" = "confirmed" THEN "Credit"."type" END')), 'totalCreditsUsed'],
      [Booking.sequelize!.fn('MONTH', Booking.sequelize!.col('"Booking"."time"')), 'month'],
      [Booking.sequelize!.fn('YEAR', Booking.sequelize!.col('"Booking"."time"')), 'year'],
    ],
    include: [
      {
        model: Credit,
        attributes: [],
        where: {
          BookingId: Booking.sequelize!.literal('"Booking"."id"'),
        },
      },
    ],
    where: {
      patient: patientId,
      status: 'confirmed',
    },
    group: ['month', 'year'],
  });

  const result = stats.map((row) => ({
    totalCreditsUsed: row.getDataValue('totalCreditsUsed') || 0,
    month: row.getDataValue('month'),
    year: row.getDataValue('year'),
  }));

  const totalCreditsAvailable = totalCreditsQuery || 1;
  const monthlyStatsWithPercentage = result.map((row) => ({
    ...row,
    percentageCreditsUsed: (row.totalCreditsUsed / totalCreditsAvailable) * 100,
  }));

  return monthlyStatsWithPercentage;
}
