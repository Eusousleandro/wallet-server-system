export interface IWebHookPayload {
    transactionId: string;
    userId: number;
    amount: number;
    status: 'PAID' | 'PENDING' | 'FALIED';

}

export interface ITransaction {
    id: string;
    userId: number;
    amount: number;
    status: 'PAID' | 'PENDING'| 'FALIED';
    createdAt?: Date;
}