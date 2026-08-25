import { connection } from '../config/database/data.connection';
import { ResultSetHeader, RowDataPacket} from 'mysql2'
import { IWebHookPayload, ITrasintion } from "../interfaces/webhook.interface";

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

    async create(webhook: IWebHookPayload, transition: ITrasintion) {
        const time = new Date().toLocaleTimeString('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [newPayment] = await this.connection.promise().query<ResultSetHeader>(
            [webhook, transition, time]
        ) 

        return {
            webhook: webhook,
            transition: transition,
            time: time
        }

    }
}