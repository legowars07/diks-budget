import express from 'express';
import { BudgetBusiness } from './business/BudgetBusiness';
import { BudgetService } from './services/BudgetService';
import { BudgetController } from './controllers/BudgetController';
import { budgetRoutes } from './routes/BudgetRoutes';
import type { Request, Response, NextFunction } from 'express';

// Maak de benodigde instanties aan
const budgetBusiness = new BudgetBusiness();
const budgetService = new BudgetService(budgetBusiness);
const budgetController = new BudgetController(budgetService);

const app = express();
app.use(express.json());

// Koppel de routes
app.use('/api', budgetRoutes(budgetController));

// Fallback route
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Centrale error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      code: err.code || err.name || 'ERROR',
      message: err.message || 'Internal Server Error'
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});