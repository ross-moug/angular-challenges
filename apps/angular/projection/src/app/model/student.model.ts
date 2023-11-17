import { Teacher } from './teacher.model';
import { Item } from '../ui/list-item/list-item.component';

export interface Student extends Item {
  id: number;
  firstname: string;
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
