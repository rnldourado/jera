import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


interface UserAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users", 
    timestamps: false,
  }
);
