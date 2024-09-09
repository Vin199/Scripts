import express from 'express';
import Controller from '../controller/controller.js';
const controller = new Controller();
const router = express.Router();

router.get('/moveScreenText', controller.moveScreenText);

export default router;