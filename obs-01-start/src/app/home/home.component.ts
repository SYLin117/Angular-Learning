import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription
  private secondObsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    // // subscribe() will return Subscription
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })



    // build Observable by yourself
    // Observable.create is deprecated
    // const customIntervalObservable = Observable.create(observer => {
    const customIntervalObservable = new Observable(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        if (count === 2) {
          observer.complete()
        }
        if (count > 3) {
          observer.error(new Error('count is larger than 3'));
        }
        count++
      }, 1000)
    })

    // this.firstObsSubscription = customIntervalObservable.subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   error => { // error would make observable die
    //     alert(error.message)
    //   },
    //   () => { // complete (IMPORTANT: if error occur then this won't be called)
    //     console.log('completed')
    //   }
    // )

    // Using operator with observable
    // find other operators in https://rxjs.dev/guide/operators
    this.firstObsSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1)
    })).subscribe(
      data => {
        console.log(data)
      },
      error => { // error would make observable die
        alert(error.message)
      },
      () => { // complete (IMPORTANT: if error occur then this won't be called)
        console.log('completed')
      }
    )


    this.secondObsSubscription = customIntervalObservable.pipe(
      filter(data => { // you can use it to filter out data
        return data > 0
      }),
      map((data: number) => {
        return 'Round: ' + (data + 1)
      })).subscribe(
        data => {
          console.log(data)
        },
        error => { // error would make observable die
          alert(error.message)
        },
        () => { // complete (IMPORTANT: if error occur then this won't be called)
          console.log('completed')
        }
      )
  }

  ngOnDestroy(): void {
    //IMPORTANT!! custom observable won't unsubscribe automatically
    this.firstObsSubscription.unsubscribe()
    this.secondObsSubscription.unsubscribe()
  }
}
