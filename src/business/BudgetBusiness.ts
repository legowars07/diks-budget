import type { Budget } from './types/Budget.js';
import { NotFoundError } from './errors.js';
import { ERROR_MESSAGES } from './errorMessages.js';

export class BudgetBusiness {
/**
 * Filters and returns the budgets available for a given team on a specific date.
 *
 * @param teamId - The ID of the team to filter budgets for.
 * @param currentDate - The date to check budget validity against.
 * @param budgets - The list of budgets to filter.
 * @returns An array of budgets that are valid for the team and date, and have remaining funds.
 * @throws NoAvailableBudgetError If no available budgets are found for the given criteria.
 */
  getAvailableBudgets(teamId: string, currentDate: Date, budgets: Budget[]): Budget[] {
    const available = budgets.filter(
      b =>
        b.teamId === teamId &&
        b.validFrom <= currentDate &&
        b.validTo >= currentDate &&
        b.remaining > 0
    );
    if (available.length === 0) {
      throw new NotFoundError(ERROR_MESSAGES.NO_BUDGET_AVAILABLE);
    }
    return available;
  }

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
  findOptimalBudget(teamId: string, amount: number, currentDate: Date, budgets: Budget[]): Budget | null {
    const available = this.getAvailableBudgets(teamId, currentDate, budgets)
      .filter(b => b.remaining >= amount)
      .sort((a, b) => a.validTo.getTime() - b.validTo.getTime()); // soonest expiring first
    return available[0] || null;
  }

  applyTransaction(budget: Budget, amount: number): Budget {
    return { ...budget, remaining: budget.remaining - amount };
  }
}