import { BudgetBusiness } from '../business/BudgetBusiness.js';
import type { Transaction } from '../business/types/Transaction.js';
export declare class BudgetService {
    private readonly business;
    constructor(business: BudgetBusiness);
    /**
   * Retrieves all budgets associated with a given team ID.
   *
   * @param teamId - The unique identifier of the team whose budgets are to be fetched.
   * @returns An array of budgets belonging to the specified team.
   * @throws {ValidationError} If the teamId is missing or not a string.
   * @throws {NotFoundError} If no budgets are found for the given teamId.
   */
    getBudgets(teamId: string): import("../business/types/Budget.js").Budget[];
    /**
   * Executes a transaction for a team member, deducting the specified amount from the optimal budget.
   *
   * @param teamId - The unique identifier of the team.
   * @param amount - The amount to be transacted; must be a positive number.
   * @param memberId - The unique identifier of the team member performing the transaction.
   * @returns A `Transaction` object containing details of the executed transaction.
   * @throws {ValidationError} If any of the parameters are missing or invalid.
   * @throws {NotFoundError} If no suitable budget is available for the transaction.
   */
    executeTransaction(teamId: string, amount: number, memberId: string): Transaction;
}
//# sourceMappingURL=BudgetService.d.ts.map