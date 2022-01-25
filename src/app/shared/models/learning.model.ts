export type LearningStatusType = 'active' | 'archived';

export interface ILearning {
  id: number;
  name: string;
  status: LearningStatusType;
  assignedUsers: number[];
  avatar: string;
}
