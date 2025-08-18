import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AdministradorCreationAttributes extends Optional<AdministradorAttributes, 'id'> {}

interface AdministradorAttributes {
  id: number;
  userId: number;
  nivel: 'super' | 'moderador' | 'suporte';
  permissoes: string[];
  dataAtivacao: Date;
  ativo: boolean;
}

export class Administrador extends Model<AdministradorAttributes, AdministradorCreationAttributes> implements AdministradorAttributes {
  public id!: number;
  public userId!: number;
  public nivel!: 'super' | 'moderador' | 'suporte';
  public permissoes!: string[];
  public dataAtivacao!: Date;
  public ativo!: boolean;
}

Administrador.init(
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
    nivel: {
      type: DataTypes.ENUM('super', 'moderador', 'suporte'),
      allowNull: false,
      defaultValue: 'suporte',
    },
    permissoes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    dataAtivacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "administradores",
    timestamps: false,
  }
);

export default Administrador;
