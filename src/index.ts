import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import routes from "./routes";
import { swaggerUi, specs } from "./config/swagger";

dotenv.config();

const app = express();

// Configure CORS - Allow all origins
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes);

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});
