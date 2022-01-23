export interface ILearning {
  id: number;
  name: string;
  status: 'active' | 'archived';
  assignedUser: number[];
  avatar: string;
}
