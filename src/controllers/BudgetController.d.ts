import { BudgetService } from '../services/BudgetService.js';
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
export declare class BudgetController {
    private readonly service;
    constructor(service: BudgetService);
    getBudgets: (req: Request, res: Response, next: NextFunction) => void;
    executeTransaction: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=BudgetController.d.ts.map