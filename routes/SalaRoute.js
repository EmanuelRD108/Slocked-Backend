import express from "express";
import {
    getSalas,
    getSalaById,
    createSala,
    updateSala,
    deleteSala,
    getSalaByUser
} from "../controllers/Salas.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/salas',verifyUser, getSalas);
router.get('/salas/user/:id',verifyUser, getSalaByUser);
router.get('/salas/:id',verifyUser, getSalaById);
router.post('/salas',verifyUser, adminOnly, createSala);
router.patch('/salas/:id',verifyUser, adminOnly, updateSala);
router.delete('/salas/:id',verifyUser, adminOnly, deleteSala);

export default router;

// PARA POSTA CRIAR PROCURA E DELETA SALAS 
// VERIFYUSER PARA VERIFICA SE O USUARIO TA LOGADO, ADMINONLY SOMENTE O ADM PODE EXECUTA