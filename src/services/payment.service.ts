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

    public async FindById(id: number) {
        const payment = this.paymentRepository.findById(id);

        if(!payment) {
            throw new Error('No found payment')
        }

        return payment;
    }
}