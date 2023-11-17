import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  Item,
  ListItemComponent,
  TemplateContext,
} from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<E extends Item> {
  @Input() list: E[] | null = null;
  @Input() customClass = '';
  @Input() template!: TemplateRef<TemplateContext<E>>;

  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  addNewItem() {
    this.added.emit();
  }

  handleDelete(id: number): void {
    this.deleted.emit(id);
  }
}
