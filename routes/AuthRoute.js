import express from "express";
import {Login, logOut, Me} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me,);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;

// É UMA ROTA QUE PEGA O CONTROLADO DE AUTH E VERIFICA SE O USUARIO ESTA LOGADO PARA QUEM TA AUTENTICADO

// VAI DESEPENHA O PAPEL DE LOUGUT TBM