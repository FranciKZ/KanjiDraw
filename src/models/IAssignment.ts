import { IBase } from './IBase';

export interface IAssignmentData {
  created_at: string;
  subject_id: number;
  subject_type: string;
  srs_stage: number;
  unlocked_at: string;
  started_at: string;
  passed_at: string;
  burned_at: string;
  available_at: string;
  resurrected_at: string;
}

export interface IAssignment extends IBase {
  data: IAssignmentData;
}
