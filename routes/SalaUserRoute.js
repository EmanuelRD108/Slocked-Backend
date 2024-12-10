import express from "express";
import { createSalaUser, createGroupSalaUser, deleteSalaUser, deleteUserSala } from "../controllers/SalaUser.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";


const router = express.Router();

router.post('/salauser',verifyUser, adminOnly, createSalaUser);
router.post('/salauser/group',verifyUser, adminOnly, createGroupSalaUser);
router.delete('/salauser/:id',verifyUser, adminOnly, deleteSalaUser);
router.delete('/usersala/:id',verifyUser, adminOnly, deleteUserSala);

export default router;

// OS USUARIOS QUE TEM ACESSO AQUELAS SALAS SEQUINDO A LOGICA DO SALAROUTE
// O ADMIN PODE ASSOCIAR A SALA AOS USUARIOS E A UM GRUPO DE USUARIOS 