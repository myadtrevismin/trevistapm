import { UserModel } from '../discussions/discussion';

export class Task {
  id?: string;
  name: string;
  startDate: any;
  endDate: any;
  status: string;
  assignedTo: UserModel;
  assignmentGroup: string;
  createdBy: UserModel;
  createdDt: Date;
  projectId: string;
  files: any;
  filedata?: any;
  notes: string;
}
