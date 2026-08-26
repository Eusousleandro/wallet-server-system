import express from 'express';

import { PaymentController } from '../controllers/payment.controller'

const router = express.Router();

const pay = new PaymentController();

router.get('/checkout', pay.getAll());
router.get('/checkout/:id', pay.getById());
router.post('/checkout'pay.create());
router.put('/checkout/:id'pay.update());
router.delete('/checkout/:id'pay.delete())

export { router };