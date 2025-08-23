import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface SprintCreationAttributes extends Optional<SprintAttributes, "id"> { }

interface SprintAttributes {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: "planning" | "in_progress" | "ended";
    projectId: number;
}

export class Sprint extends Model<SprintAttributes, SprintCreationAttributes> implements SprintAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public startDate!: Date;
    public endDate!: Date;
    public status!: "planning" | "in_progress" | "ended";
    public projectId!: number;
}

Sprint.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("planning", "in_progress", "ended"),
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "projects",
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

