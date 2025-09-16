import type { Team } from './types/Team';
import type { Budget } from './types/Budget';

export const teams: Team[] = [
  {
    id: 'rubberduck',
    name: 'Rubberduck',
    members: [
      { id: 'a.feather', name: 'A. Feather', teamId: 'rubberduck' },
      { id: 'b.quack', name: 'B. Quack', teamId: 'rubberduck' },
    ],
  },
];

export const budgets: Budget[] = [
  {
    id: '2025',
    teamId: 'rubberduck',
    amount: 200,
    remaining: 200,
    validFrom: new Date('2025-01-01'),
    validTo: new Date('2025-12-31'),
  },
  {
    id: 'summer2025',
    teamId: 'rubberduck',
    amount: 100,
    remaining: 100,
    validFrom: new Date('2025-06-01'),
    validTo: new Date('2025-08-31'),
  },
];