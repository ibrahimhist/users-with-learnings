export type LearningStatusType = 'active' | 'archived';

export interface ILearning {
  id: number;
  name: string;
  status: LearningStatusType;
  assignedUser: number[];
  avatar: string;
}
