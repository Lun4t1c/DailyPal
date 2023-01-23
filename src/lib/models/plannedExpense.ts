import type { FinanceSourceModel } from "./financeSourceModel";

export interface plannedExpense {
    id: number,
    valueInPennies: number,
    financeSource: FinanceSourceModel | null
}