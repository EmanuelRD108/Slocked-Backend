import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Obter todos os usuários (admin somente)
router.get("/users", verifyUser, adminOnly, getUsers);

// Obter um usuário específico por ID (admin somente)
router.get("/users/:id", verifyUser, adminOnly, getUserById);

// Criar um novo usuário (admin somente)
router.post("/users", verifyUser, adminOnly, createUser);

// Atualizar um usuário específico por ID (admin somente)
router.patch("/users/:id", verifyUser, adminOnly, updateUser);

// Excluir um usuário específico por ID (admin somente)
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;

// ROTAS DOS USUARIOS NO GERAL