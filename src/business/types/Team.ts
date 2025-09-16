import type { TeamMember } from './TeamMember';
export type Team = {
  id: string;
  name: string;
  members: TeamMember[];
};