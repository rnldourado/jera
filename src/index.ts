import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());

// Registrar todas as rotas
app.use("/api", routes);

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});


