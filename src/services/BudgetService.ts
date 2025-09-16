import { BudgetBusiness } from '../business/BudgetBusiness';
import { budgets } from '../business/seed';
import type { Transaction } from '../business/types/Transaction';
import { ValidationError, NotFoundError } from '../business/errors';
import { ERROR_MESSAGES } from '../business/errorMessages';

export class BudgetService {
  constructor(private readonly business: BudgetBusiness) {}

  /**
 * Retrieves all budgets associated with a given team ID.
 *
 * @param teamId - The unique identifier of the team whose budgets are to be fetched.
 * @returns An array of budgets belonging to the specified team.
 * @throws {ValidationError} If the teamId is missing or not a string.
 * @throws {NotFoundError} If no budgets are found for the given teamId.
 */
  getBudgets(teamId: string) {
    if (!teamId || typeof teamId !== 'string') {
      throw new ValidationError(ERROR_MESSAGES.TEAM_ID_REQUIRED);
    }

    const currentDate = new Date();
    const teamBudgets = this.business.getAvailableBudgets(teamId, currentDate, budgets);
    if (teamBudgets.length === 0) {
      throw new NotFoundError(ERROR_MESSAGES.NO_BUDGETS_FOUND);
    }

    return teamBudgets;
  }

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
  executeTransaction(teamId: string, amount: number, memberId: string): Transaction {
    if (!teamId || typeof teamId !== 'string') {
      throw new ValidationError(ERROR_MESSAGES.TEAM_ID_REQUIRED);
    }
    if (!memberId || typeof memberId !== 'string') {
      throw new ValidationError(ERROR_MESSAGES.MEMBER_ID_REQUIRED);
    }
    if (typeof amount !== 'number' || amount <= 0) {
      throw new ValidationError(ERROR_MESSAGES.AMOUNT_REQUIRED);
    }

    const currentDate = new Date();
    const optimalBudget = this.business.findOptimalBudget(teamId, amount, currentDate, budgets);

    if (!optimalBudget) {
      throw new NotFoundError(ERROR_MESSAGES.NO_BUDGET_AVAILABLE);
    }

    optimalBudget.remaining -= amount;

    return {
      id: `${Date.now()}`,
      memberId,
      budgetId: optimalBudget.id,
      amount,
      date: currentDate,
    };
  }
}