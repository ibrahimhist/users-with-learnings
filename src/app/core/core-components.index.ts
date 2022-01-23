import { BasicComponents } from './basic-components/basic-components.index';
import { SubjectSpecificComponents } from './subject-specific-components/subject-specific-components.index';

export const CoreComponents = [
  ...BasicComponents,
  ...SubjectSpecificComponents,
];

export * from './basic-components/basic-components.index';
export * from './subject-specific-components/subject-specific-components.index';
