import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: `<app-card
      [list]="students"
      [template]="template"
      class="bg-light-green"
      (added)="handleAdd()"
      (deleted)="handleDelete($event)">
      <img ngSrc="assets/img/student.webp" height="200" width="200" />
    </app-card>
    <ng-template #template let-item>{{ item?.firstname }}</ng-template>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((students) =>
      this.store.addAll(students)
    );

    this.store.students$.subscribe((students) => (this.students = students));
  }

  handleAdd(): void {
    this.store.addOne(randStudent());
  }

  handleDelete(id: number): void {
    this.store.deleteOne(id);
  }
}
