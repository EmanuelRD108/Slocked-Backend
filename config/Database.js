import { Sequelize } from "sequelize";

const db = new Sequelize("rfid", "postgres", "teste123", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
