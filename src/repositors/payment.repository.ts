import { connection } from '../config/database/data.connection';
import { ResultSetHeader, RowDataPacket} from 'mysql2'
import { IWebHookPayload, ITransaction } from "../interfaces/payment.interface";

export class PaymentRepository {
    async getAll() {
        const [payments] = await connection.promise().query<RowDataPacket[]>(
           'SELECT * FROM payments'
        );

        return payments;
    }
;
    async getById(transactionId: string) {
        const [payment] = await connection.promise().query(
            'SELECT * FROM payments WHERE id=?',
            [transactionId]
        )

        return payment;

    }

    async create(transaction: ITransaction) {
        const time = new Date().toLocaleTimeString('pt-br', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [payment] = await connection.promise().query<ResultSetHeader>(
            'INSERT INTO payments (userId, amount, status, time) VALUES (?, ?, ?, ?)',
            [transaction.userId, transaction.amount, transaction.status, time]
        ) 

        return {
            id: payment.insertId,
            userId: transaction.userId,
            amount: transaction.amount,
            status: transaction.status,
            time: time
        }
    }

    async update(transactionId: string, webhook: IWebHookPayload) {
        const [up_payment] = await connection.promise().query(
            'UPDATE payments SET transactionId=?, userId=?, amount=?, status=? WHERE transintionId=?',
            [transactionId, webhook.transactionId, webhook.userId, webhook.amount, webhook.status, webhook.transactionId]
        )

        return up_payment;
    }

    async delete(transactionId: string) {
        const [cancel] = await connection.promise().query(
            'DELETE FROM payments WHERE transactionId=?',
            [transactionId]
        )

        return cancel;
    }

}