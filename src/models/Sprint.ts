import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface SprintCreationAttributes extends Optional<SprintAtributes, "id"> { }

interface SprintAtributes {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    status: "planning" | "in_progress" | "ended";
    projetoId: number;
}

export class Sprint extends Model<SprintAtributes, SprintCreationAttributes> implements SprintAtributes {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public dataInicio!: Date;
    public dataFim!: Date;
    public status!: "planning" | "in_progress" | "ended";
    public projetoId!: number;
}

Sprint.init(
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
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dataFim: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("planning", "in_progress", "ended"),
            allowNull: false,
        },
        projetoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "projetos",
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "sprints",
        timestamps: false
    }
);

