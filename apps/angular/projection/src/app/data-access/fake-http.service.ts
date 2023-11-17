import { Injectable } from '@angular/core';
import {
  incrementalNumber,
  rand,
  randCity,
  randCountry,
  randFirstName,
  randLastName,
  randNumber,
  randWord,
} from '@ngneat/falso';
import { map, Observable, timer } from 'rxjs';
import { City } from '../model/city.model';
import { Student } from '../model/student.model';
import { subject, Teacher } from '../model/teacher.model';

const factoryTeacher: () => number = incrementalNumber();

export const randTeacher: () => Teacher = (): Teacher => ({
  id: factoryTeacher(),
  firstname: randFirstName(),
  lastname: randLastName(),
  subject: rand(subject),
});

const teachers: Teacher[] = [
  randTeacher(),
  randTeacher(),
  randTeacher(),
  randTeacher(),
];

const factoryStudent: () => number = incrementalNumber();

export const randStudent: () => Student = (): Student => ({
  id: factoryStudent(),
  firstname: randFirstName(),
  lastname: randLastName(),
  mainTeacher: teachers[randNumber({ max: teachers.length - 1 })],
  school: randWord(),
});

const students: Student[] = [
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
  randStudent(),
];

const factoryCity: () => number = incrementalNumber();

export const randomCity: () => City = (): City => ({
  id: factoryCity(),
  name: randCity(),
  country: randCountry(),
});

const cities: City[] = [randomCity(), randomCity(), randomCity()];

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  fetchTeachers$: Observable<Teacher[]> = timer(500).pipe(map(() => teachers));
  fetchStudents$: Observable<Student[]> = timer(500).pipe(map(() => students));
  fetchCities$: Observable<City[]> = timer(500).pipe(map(() => cities));
}
