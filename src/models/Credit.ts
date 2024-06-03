import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CreditAttributes {
  id: number;
  type: string;
  expirationDate: Date;
}

interface CreditCreationAttributes extends Optional<CreditAttributes, 'id'> {}

class Credit extends Model<CreditAttributes, CreditCreationAttributes> implements CreditAttributes {
  public id!: number;
  public type!: string;
  public expirationDate!: Date;
}

Credit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      },
    },
  },
  {
    sequelize,
    tableName: 'credits',
  }
);

export default Credit;
