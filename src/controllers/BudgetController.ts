import { BudgetService } from '../services/BudgetService';
import type { Request, Response, NextFunction } from 'express';

/**
 * Controller for handling budget-related operations.
 *
 * @remarks
 * This class provides endpoints for retrieving budgets and executing transactions
 * for a specific team. It delegates business logic to the injected `BudgetService`.
 *
 * @example
 * ```typescript
 * const controller = new BudgetController(budgetService);
 * app.get('/budgets/:teamId', controller.getBudgets);
 * app.post('/budgets/transaction', controller.executeTransaction);
 * ```
 *
 * @public
 */
export class BudgetController {
  constructor(private readonly service: BudgetService) {}

  getBudgets = (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamId = req.params.teamId;

      if (!teamId || typeof teamId !== 'string') {
        res.status(400).json({ error: 'teamId parameter is required and must be a string.' });
        return;
      }

      const budgets = this.service.getBudgets(teamId);
      res.json(budgets);
    } catch (err) {
      next(err);
    }
  };

  executeTransaction = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamId, memberId, amount } = req.body;
      const transaction = this.service.executeTransaction(teamId, amount, memberId);
      res.json(transaction);
    } catch (err) {
      next(err);
    }
  };
}