import type { FinanceSourceModel } from "./financeSourceModel";

export interface TransactionModel {
    id: number,
    financeSource: FinanceSourceModel,
    amountInPennies: number,
    isNegative: boolean
    date: Date
}