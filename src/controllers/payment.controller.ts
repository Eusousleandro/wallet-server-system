import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { IWebHookPayload } from "../interfaces/payment.interface";

export class PaymentController {
    constructor(private paymentServive: PaymentService) {}
    
    public async getAll(request: Request, response: Response) {
        try {
            const payments = await this.paymentServive.findAll()
            return response.status(200).json({
                error: false,
                payment: payments
                
            })
        } catch (error: any) {
            console.error(error)
            return response.status(500).json({
                error: true,
                message: error.message
            })
        }
    }

    public async getById(request: Request, response: Response) {
        try {

            const webhookData: IWebHookPayload = {
                transactionId: request.params.id,
                userId: request.body.userId,
                amount: request.body.amount,
                status: request.body.status
            }

            const payment = await this.paymentServive.findById(webhookData);
            response.status(200).json({
                error: false,
                payment: payment
            })
        } catch (error: any) {
            console.error(error);
            response.status(500).json({
                error: true,
                message: error.message
            })
        }
    }

    public async create(request: Request, response: Response) {
        try {
            const bodyPay = request.body;
            const newPayment = await this.paymentServive.created(bodyPay)
            response.status(200).json({
                error: false,
                newPayment
            });
        } catch(error: any) {
            console.error(error);
            response.status(500).json({
                error: true,
                message: error.message
            })
        }
    }

    public async update(request: Request, response:Response) {
        try {
            const bodyPayment: IWebHookPayload = request.body;
            const payUpdate = await this.paymentServive.updated(bodyPayment);
            response.status(200).json({
                error: false,
                payment: payUpdate
            })
        } catch (error: any) {
            console.error(error);
            response.status(500).json({
                error: true,
                message: error.message
            })
        }
    }

    public async delete(request: Request, response: Response): Promise<void> {
        try {
            
            const webhookData: IWebHookPayload = {
                transactionId: request.params.transintionId,
                userId: request.body.userId,
                amount: request.body.amount,
                status: request.body.status
            }

            const deletePay = await this.paymentServive.deleted(webhookData);
            response.status(200).json({
                error: false,
                payment: deletePay
            })
        } catch (error: any) {
            console.error(error);
            response.status(500).json({
                error: true,
                message: error.message
            });
        }
    }
}