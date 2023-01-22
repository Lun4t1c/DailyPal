import type { FinanceSourceModel } from "./financeSourceModel";

export interface financeSourceLockModel {
    id: number,
    valueInPennies: number,
    financeSource: FinanceSourceModel | null
}