import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count: number = 0
  constructor() { }

  addCount() {
    this.count += 1
    console.log(`count= ${this.count}`)
  }
}
