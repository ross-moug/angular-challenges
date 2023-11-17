import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private readonly cities: BehaviorSubject<City[]> = new BehaviorSubject<
    City[]
  >([]);
  readonly cities$: Observable<City[]> = this.cities.asObservable();

  addAll(cities: City[]): void {
    this.cities.next(cities);
  }

  addOne(city: City): void {
    this.cities.next([...this.cities.value, city]);
  }

  deleteOne(id: number): void {
    this.cities.next(this.cities.value.filter((t) => t.id !== id));
  }
}
