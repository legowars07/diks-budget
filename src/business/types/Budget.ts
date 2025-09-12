export type Budget = {
  id: string;
  teamId: string;
  amount: number;
  remaining: number;
  validFrom: Date;
  validTo: Date;
};