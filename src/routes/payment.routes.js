import { Router } from 'express'
import {createOrder} from '../controllers/payment.controller.js'

const PaymentRouter = Router();

PaymentRouter.get('/create-order', createOrder)
PaymentRouter.get('/succes', (req, res) => res.send('Succes'))
PaymentRouter.get('/failure', (req, res) => res.send('failure'))
PaymentRouter.get('/pending', (req, res) => res.send('pending'))
PaymentRouter.get('/webhook', (req, res) => res.send())

export default PaymentRouter