import { connection } from '../config/database/data.connection';
import { ResultSetHeader, RowDataPacket} from 'mysql2'
import { ITrasintion } from "../interfaces/payment.interface";

export class PaymentRepository {
    async getAll() {
        const [payments] = await connection.promise().query<RowDataPacket>(
           'SELECT * FROM payments'
        );

        return payments;
    }
;
    async getById(id: number) {
        const payment = await connection.promise().query(
            'SELECT * FROM payments WHERE id=?',
            [id]
        )

        return payment;

    }

    async create(transition: ITrasintion) {
        const time = new Date().toLocaleTimeString('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [newPayment] = await this.connection.promise().query<ResultSetHeader>(
            [webhook, transition, time]
        ) 

        return {
            amount: transition.amount,
            status: transition.status
            time: time
        }
    }

}