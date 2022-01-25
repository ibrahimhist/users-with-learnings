import { UserComponents } from './user/user.index';
import { LearningComponents } from './learning/learning.index';

export const ProjectRelatedComponents = [
  ...UserComponents,
  ...LearningComponents,
];

export * from './user/user.index';
export * from './learning/learning.index';
