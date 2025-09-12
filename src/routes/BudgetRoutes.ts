import { Router } from 'express';
import { BudgetController } from '../controllers/BudgetController.js';

export function budgetRoutes(controller: BudgetController): Router {
  return Router()
    .get('/budgets/:teamId', controller.getBudgets)
    .post('/transaction', controller.executeTransaction);
}