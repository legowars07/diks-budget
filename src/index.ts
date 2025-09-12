import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';
import { BudgetBusiness } from './business/BudgetBusiness.js';
import { BudgetService } from './services/BudgetService.js';
import { BudgetController } from './controllers/BudgetController.js';
import { budgetRoutes } from './routes/BudgetRoutes.js';

const budgetBusiness = new BudgetBusiness();
const budgetService = new BudgetService(budgetBusiness);
const budgetController = new BudgetController(budgetService);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api', budgetRoutes(budgetController));

// Error middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
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