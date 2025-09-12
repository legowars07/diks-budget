import type { Budget } from './types/Budget.js';
export declare class BudgetBusiness {
    /**
     * Filters and returns the budgets available for a given team on a specific date.
     *
     * @param teamId - The ID of the team to filter budgets for.
     * @param currentDate - The date to check budget validity against.
     * @param budgets - The list of budgets to filter.
     * @returns An array of budgets that are valid for the team and date, and have remaining funds.
     * @throws NoAvailableBudgetError If no available budgets are found for the given criteria.
     */
    getAvailableBudgets(teamId: string, currentDate: Date, budgets: Budget[]): Budget[];
    /**
       * Retrieves a list of available budgets for the specified team and date,
       * filters them to include only those with a remaining balance greater than or equal to the specified amount,
       * and sorts the resulting budgets by their expiration date in ascending order (soonest expiring first).
       *
       * @param teamId - The identifier of the team for which budgets are being retrieved.
       * @param currentDate - The current date used to determine budget validity.
       * @param budgets - The array of budget objects to filter and sort.
       * @param amount - The minimum required remaining balance for a budget to be considered available.
       * @returns An array of budget objects that meet the criteria, sorted by expiration date.
       */
    findOptimalBudget(teamId: string, amount: number, currentDate: Date, budgets: Budget[]): Budget | null;
    applyTransaction(budget: Budget, amount: number): Budget;
}
//# sourceMappingURL=BudgetBusiness.d.ts.map