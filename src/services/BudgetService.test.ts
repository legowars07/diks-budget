import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetService } from './BudgetService';
import { ValidationError, NotFoundError } from '../business/errors';
import { ERROR_MESSAGES } from '../business/errorMessages';

describe('BudgetService', () => {
  let business: any;
  let service: BudgetService;

  beforeEach(() => {
    business = {
      getAvailableBudgets: vi.fn(),
      findOptimalBudget: vi.fn(),
    };
    service = new BudgetService(business);
  });

  describe('getBudgets', () => {
    it('should return budgets for valid teamId', () => {
      const fakeBudgets = [{ id: '1' }];
      business.getAvailableBudgets.mockReturnValue(fakeBudgets);

      const result = service.getBudgets('rubberduck');
      expect(business.getAvailableBudgets).toHaveBeenCalled();
      expect(result).toBe(fakeBudgets);
    });

    it('should throw ValidationError if teamId is missing', () => {
      expect(() => service.getBudgets(undefined as any)).toThrow(ValidationError);
      expect(() => service.getBudgets(undefined as any)).toThrow(ERROR_MESSAGES.TEAM_ID_REQUIRED);
    });

    it('should throw NotFoundError if no budgets found', () => {
      business.getAvailableBudgets.mockReturnValue([]);
      expect(() => service.getBudgets('rubberduck')).toThrow(NotFoundError);
      expect(() => service.getBudgets('rubberduck')).toThrow(ERROR_MESSAGES.NO_BUDGETS_FOUND);
    });
  });

  describe('executeTransaction', () => {
    it('should return transaction for valid input', () => {
      const fakeBudget = { id: 'b1', remaining: 100 };
      business.findOptimalBudget.mockReturnValue(fakeBudget);

      const result = service.executeTransaction('rubberduck', 10, 'a.feather');
      expect(business.findOptimalBudget).toHaveBeenCalled();
      expect(result).toMatchObject({
        memberId: 'a.feather',
        budgetId: 'b1',
        amount: 10,
      });
      expect(fakeBudget.remaining).toBe(90);
    });

    it('should throw ValidationError if teamId is invalid', () => {
      expect(() => service.executeTransaction(undefined as any, 10, 'a.feather')).toThrow(ValidationError);
      expect(() => service.executeTransaction(undefined as any, 10, 'a.feather')).toThrow(ERROR_MESSAGES.TEAM_ID_REQUIRED);
    });

    it('should throw ValidationError if memberId is invalid', () => {
      expect(() => service.executeTransaction('rubberduck', 10, undefined as any)).toThrow(ValidationError);
      expect(() => service.executeTransaction('rubberduck', 10, undefined as any)).toThrow(ERROR_MESSAGES.MEMBER_ID_REQUIRED);
    });

    it('should throw ValidationError if amount is invalid', () => {
      expect(() => service.executeTransaction('rubberduck', 0, 'a.feather')).toThrow(ValidationError);
      expect(() => service.executeTransaction('rubberduck', 0, 'a.feather')).toThrow(ERROR_MESSAGES.AMOUNT_REQUIRED);
    });

    it('should throw NotFoundError if no suitable budget', () => {
      business.findOptimalBudget.mockReturnValue(null);
      expect(() => service.executeTransaction('rubberduck', 10, 'a.feather')).toThrow(NotFoundError);
      expect(() => service.executeTransaction('rubberduck', 10, 'a.feather')).toThrow(ERROR_MESSAGES.NO_BUDGET_AVAILABLE);
    });
  });
});