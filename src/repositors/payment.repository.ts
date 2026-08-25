import { connection } from '../config/database/data.connection';
import { ResultSetHeader, RowDataPacket} from 'mysql2'
import { IWebHookPayload, ITrasintion } from "../interfaces/payment.interface";

export class PaymentRepository {
    async getAll() {
        const [payments] = await connection.promise().query<RowDataPacket[]>(
           'SELECT * FROM payments'
        );

        return payments;
    }
;
    async getById(webhook: IWebHookPayload) {
        const [payment] = await connection.promise().query(
            'SELECT * FROM payments WHERE id=?',
            [webhook.transintionId]
        )

        return payment;

    }

    async create(transintion: ITrasintion) {
        const time = new Date().toLocaleTimeString('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [payment] = await connection.promise().query<ResultSetHeader>(
            'INSERT INTO payments (userId, amount, status, time) VALUES (?, ?, ?, ?)',
            [transintion.userId, transintion.amount, transintion.status, time]
        ) 

        return {
            id: payment.insertId,
            userId: transintion.userId,
            amount: transintion.amount,
            status: transintion.status,
            time: time
        }
    }

    async update(webhook: IWebHookPayload) {
        const [up_payment] = await connection.promise().query(
            'UPDATE payments SET transintionId=?, userId=?, amount=?, status=? WHERE transintionId=?',
            [webhook.transintionId, webhook.userId, webhook.amount, webhook.status, webhook.transintionId]
        )

        return up_payment;
    }

    async delete(webhook: IWebHookPayload) {
        const [cancel] = await connection.promise().query(
            'DELETE FROM payments WHERE transintionId=?',
            [webhook.transintionId]
        )

        return cancel;
    }

}