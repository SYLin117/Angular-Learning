import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm
  defaultQuestion = 'pet'
  answer = ''
  genders = ['male', 'female']
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }
  submitted = false

  suggestUserName() {
    const suggestedName = 'Superuser';

    // // this method should apply to all input
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',

    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // })

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    this.submitted = true
    const form = this.signupForm.form
    console.log(form)
    this.user.username = form.value.userData.username
    this.user.email = form.value.userData.email
    this.user.answer = form.value.questionAnswer
    this.user.gender = form.value.gender
    this.user.secret = form.value.secret

    this.signupForm.reset()
  }
}
