import { ITransaction, IWebHookPayload } from '../interfaces/payment.interface';
import { PaymentRepository } from '../repositors/payment.repository'

export class PaymentService {
     
    constructor(private paymentRepository: PaymentRepository) {}

    public async findAll() {
        const payments = await this.paymentRepository.getAll();
                                  
        if(!payments) {
            throw new Error('No found payments')
        }

        return payments;
    }

    public async findById(webhook: IWebHookPayload) {
        const payment = await this.paymentRepository.getById(webhook);

        if(!payment) {
            throw new Error('No found payment')
        }

        return payment;
    }

    public async created(transaction: ITransaction) {
        if(!transaction.amount || transaction.amount <= 0) {
            throw new Error('Invalid payment amount')
        }
        const newPayment = await this.paymentRepository.create(transaction)

        if (!newPayment) {
            throw new Error('Payment create to FALID');
        }

        return {'message': 'Payment created carried out with sucessfully'};
    }

    public async updated(webhook: IWebHookPayload) {
        const update_pay = await this.paymentRepository.update(webhook)

        if(!update_pay) {
           throw new Error('Paymemt to update not found')
        }

        return {'message': 'Payment update corried out with sucessfully'}
    } 
    
    public async deleted(webhook: IWebHookPayload) {
        const delete_pay = await this.paymentRepository.delete(webhook);

        if(!delete_pay) {
            throw new Error('Payment to delete not found')
        }

        return {'message': 'Payment to delete carried with sucessfully'}
    }
}