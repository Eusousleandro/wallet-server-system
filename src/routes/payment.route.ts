import express from 'express';

import { PaymentController } from '../controllers/payment.controller'

const router = express.Router();

const pay = new PaymentController();

router.get('/checkout', pay.getAll.bind(pay));
router.get('/checkout/:id', pay.getById.bind(pay));
router.post('/checkout'pay.create.bind(pay));
router.put('/checkout/:id'pay.update.bind(pay));
router.delete('/checkout/:id'pay.delete.bind(pay))

export { router };