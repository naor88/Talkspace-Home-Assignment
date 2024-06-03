import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Credit from './Credit';
import BookingStatusHistory from './BookingStatusHistory';

interface BookingAttributes {
  id: number;
  time: Date;
  patient: string | null;
  provider: string;
  status: string;
  CreditId?: number;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'patient' | 'status'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public time!: Date;
  public patient!: string | null;
  public provider!: string;
  public status!: string;
  public CreditId?: number;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      },
    },
    patient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'bookings',
  }
);

Booking.belongsTo(Credit);
Credit.hasOne(Booking);

Booking.hasMany(BookingStatusHistory);
BookingStatusHistory.belongsTo(Booking);

export default Booking;
