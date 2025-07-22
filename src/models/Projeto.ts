import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProjetoCreationAttributes extends Optional<ProjetoAttributes, "id"> { }

interface ProjetoAttributes {
  id: number;
  nome: string;
  descricao: string;
  status: "to do" | "in progress" | "done";
  dataInicio: Date;
  prazo: Date;
  criadorId: number;
}

export class Projeto extends Model<ProjetoAttributes, ProjetoCreationAttributes> implements ProjetoAttributes {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public status!: "to do" | "in progress" | "done";
  public dataInicio!: Date;
  public prazo!: Date;
  public criadorId!: number;
}

Projeto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("to do", "in progress", "done"),
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prazo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    criadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "projetos",
    timestamps: false,
  }
);