import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private activateSub: Subscription
  userActivate = false
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedEmitter.subscribe(
      didActivate => {
        this.userActivate = didActivate
      }
    )
  }

  ngOnDestroy(): void {
    this.activateSub.unsubscribe()
  }
}
