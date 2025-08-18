import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AdministratorCreationAttributes extends Optional<AdministratorAttributes, 'id'> {}

interface AdministratorAttributes {
  id: number;
  userId: number;
  level: 'super' | 'moderator' | 'support';
  permissions: string[];
  activationDate: Date;
  active: boolean;
}

export class Administrator extends Model<AdministratorAttributes, AdministratorCreationAttributes> implements AdministratorAttributes {
  public id!: number;
  public userId!: number;
  public level!: 'super' | 'moderator' | 'support';
  public permissions!: string[];
  public activationDate!: Date;
  public active!: boolean;
}

Administrator.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    level: {
      type: DataTypes.ENUM('super', 'moderator', 'support'),
      allowNull: false,
      defaultValue: 'support',
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    activationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "administrators",
    timestamps: false,
  }
);

export default Administrator;
