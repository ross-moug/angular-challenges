import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';

export interface Item {
  id: number;
}

export interface TemplateContext<E extends Item> {
  $implicit: E;
}

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-container
        *ngTemplateOutlet="template; context: context"></ng-container>
      <button (click)="delete(item.id)">
        <img ngSrc="assets/svg/trash.svg" height="20" width="20" />
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet, NgOptimizedImage],
})
export class ListItemComponent<E extends Item> implements OnInit {
  @Input() item!: E;
  @Input() template!: TemplateRef<TemplateContext<E>>;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  context!: TemplateContext<E>;

  ngOnInit(): void {
    this.context = {
      $implicit: this.item,
    };
  }

  delete(id: number) {
    this.deleted.emit(id);
  }
}
