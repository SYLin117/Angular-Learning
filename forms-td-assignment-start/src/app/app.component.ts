import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = ['Basic', 'Advance', 'Pro']
  selectedSub = 'Advance'
  @ViewChild('signupForm') form: NgForm

  submit() {
    console.log(this.form.value)

  }
}
