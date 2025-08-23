import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> { }

interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  status: "to do" | "in progress" | "done";
  startDate: Date;
  deadline: Date;
  creatorId: number;
}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: "to do" | "in progress" | "done";
  public startDate!: Date;
  public deadline!: Date;
  public creatorId!: number;
}

Project.init(
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    creatorId: {
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
    tableName: "projects",
    timestamps: false,
  }
);