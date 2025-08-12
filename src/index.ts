import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import routes from "./routes";
import { swaggerUi, specs } from "./config/swagger";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes);

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});


