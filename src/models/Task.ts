import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface TaskAttributes {
    id: number;
    name: string;
    description: string;
    status: "to do" | "in progress" | "done";
    priority: "low" | "medium" | "high";
    createdAt: Date;
    completedAt?: Date;
    assigneeId: number;
    sprintId: number;
    projectId: number;
}
export interface TaskCreationAttributes extends Optional<TaskAttributes, "id" | "completedAt"> { }

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public status!: "to do" | "in progress" | "done";
    public priority!: "low" | "medium" | "high";
    public createdAt!: Date;
    public completedAt?: Date;
    public assigneeId!: number;
    public sprintId!: number;
    public projectId!: number;
}

Task.init(
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
        status: {
            type: DataTypes.ENUM("to do", "in progress", "done"),
            allowNull: false,
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        assigneeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sprintId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tasks",
    }
);