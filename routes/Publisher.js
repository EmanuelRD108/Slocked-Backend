import express from "express";

import { publishMQTTMessage, getPublisherPage } from "../controllers/Publish.js";

const router = express.Router();

// Publisher Home Route.
router.get("/pub", getPublisherPage);

router.post("/pub", publishMQTTMessage);

export default router;

// ELE DESEPENHA O PAPEL DA ROTA DO MQTT POST VALIDA O USUARIO QUE TA CADASTRADOS NO MQTT
// GET PARA VERIFICA O USUARIO E POST PARA AUTENTICA 