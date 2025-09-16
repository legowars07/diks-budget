import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetController } from './BudgetController';
import type { Request, Response, NextFunction } from 'express';

describe('BudgetController', () => {
  let service: any;
  let controller: BudgetController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    service = {
      getBudgets: vi.fn(),
      executeTransaction: vi.fn(),
    };
    controller = new BudgetController(service as any);
    req = { params: {}, body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it('should return budgets for valid teamId', () => {
    req.params = { teamId: 'rubberduck' };
    service.getBudgets.mockReturnValue([{ id: '1' }]);

    controller.getBudgets(req as Request, res as Response, next);

    expect(service.getBudgets).toHaveBeenCalledWith('rubberduck');
    expect(res.json).toHaveBeenCalledWith([{ id: '1' }]);
  });

  it('should return 400 if teamId is missing', () => {
    req.params = {};
    controller.getBudgets(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'teamId parameter is required and must be a string.' });
  });

  it('should call next with error if service throws', () => {
    req.params = { teamId: 'rubberduck' };
    const error = new Error('fail');
    service.getBudgets.mockImplementation(() => { throw error; });

    controller.getBudgets(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should execute transaction and return result', () => {
    req.body = { teamId: 'rubberduck', memberId: 'a.feather', amount: 10 };
    const transaction = { id: 'tx1' };
    service.executeTransaction.mockReturnValue(transaction);

    controller.executeTransaction(req as Request, res as Response, next);

    expect(service.executeTransaction).toHaveBeenCalledWith('rubberduck', 10, 'a.feather');
    expect(res.json).toHaveBeenCalledWith(transaction);
  });

  it('should call next with error if executeTransaction throws', () => {
    req.body = { teamId: 'rubberduck', memberId: 'a.feather', amount: 10 };
    const error = new Error('fail');
    service.executeTransaction.mockImplementation(() => { throw error; });

    controller.executeTransaction(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});