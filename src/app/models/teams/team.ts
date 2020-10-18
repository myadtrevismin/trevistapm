import { UserModel } from '../discussions/discussion';

export class Team {
  id?: string;
  name: string;
  members: UserModel[];
}
