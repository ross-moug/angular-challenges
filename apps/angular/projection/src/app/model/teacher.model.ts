import { Item } from '../ui/list-item/list-item.component';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export interface Teacher extends Item {
  id: number;
  firstname: string;
  lastname: string;
  subject: Subject;
}
