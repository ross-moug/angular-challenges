import { Item } from '../ui/list-item/list-item.component';

export interface City extends Item {
  id: number;
  name: string;
  country: string;
}
