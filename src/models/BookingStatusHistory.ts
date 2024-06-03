import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BookingStatusHistoryAttributes {
  id: number;
  status: string;
  timestamp: Date;
  BookingId: number;
}

interface BookingStatusHistoryCreationAttributes extends Optional<BookingStatusHistoryAttributes, 'id' | 'timestamp'> {}

class BookingStatusHistory extends Model<BookingStatusHistoryAttributes, BookingStatusHistoryCreationAttributes> implements BookingStatusHistoryAttributes {
  public id!: number;
  public status!: string;
  public timestamp!: Date;
  public BookingId!: number;
}

BookingStatusHistory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    BookingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'booking_status_histories',
  }
);

export default BookingStatusHistory;
