import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true
  isLoading = false
  error: string = null

  // find first element with placeholder directives
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective

  closeSub: Subscription


  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {

  }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const email = form.value.email
    const password = form.value.password

    this.isLoading = true

    let authObs: Observable<AuthResponseData>

    if (this.isLoginMode) {
      // TODO
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)

    }

    authObs.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      errorMsg => {
        console.log(errorMsg)
        this.isLoading = false
        this.error = errorMsg
        this.showErrorAlert(errorMsg)
      }
    )

    form.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(msg: string) {
    // componentFactoryResolver is deprecated
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
    componentRef.instance.message = msg
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }
}
