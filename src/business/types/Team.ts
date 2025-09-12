import type { TeamMember } from './TeamMember.js';
export type Team = {
  id: string;
  name: string;
  members: TeamMember[];
};