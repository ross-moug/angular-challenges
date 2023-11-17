import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
      [list]="teachers"
      [template]="template"
      class="bg-light-red"
      (added)="handleAdd()"
      (deleted)="handleDelete($event)">
      <img ngSrc="assets/img/teacher.png" height="200" width="200" />
    </app-card>
    <ng-template #template let-item>{{ item?.firstname }}</ng-template>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((teachers) =>
      this.store.addAll(teachers)
    );

    this.store.teachers$.subscribe((teachers) => (this.teachers = teachers));
  }

  handleAdd(): void {
    this.store.addOne(randTeacher());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
