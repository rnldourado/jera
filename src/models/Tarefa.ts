import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface TarefaAttributes {
    id: number;
    nome: string;
    descricao: string;
    status: "to do" | "in progress" | "done";
    prioridade: "low" | "medium" | "high";
    dataCriacao: Date;
    dataConclusao?: Date;
    responsavelId: number;
    sprintId: number;
    projetoId: number;
}
export interface TarefaCreationAttributes extends Optional<TarefaAttributes, "id" | "dataConclusao"> { }

export class Tarefa extends Model<TarefaAttributes, TarefaCreationAttributes> implements TarefaAttributes {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public status!: "to do" | "in progress" | "done";
    public prioridade!: "low" | "medium" | "high";
    public dataCriacao!: Date;
    public dataConclusao?: Date;
    public responsavelId!: number;
    public sprintId!: number;
    public projetoId!: number;
}

Tarefa.init(
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
        prioridade: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
        },
        dataCriacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dataConclusao: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        responsavelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sprintId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        projetoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tarefas",
    }
);