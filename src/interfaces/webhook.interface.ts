export interface IWebHookPayload {
    transintionId: string;
    userId: number;
    amount: number;
    status: 'PAID' | 'PENDING' | 'FALIED';

}

export interface ITrasintion {
    id: string;
    userId: number;
    amount: number;
    status: 'PAID' | 'PENDING'| 'FALIED';
    createdAt?: Date;
}