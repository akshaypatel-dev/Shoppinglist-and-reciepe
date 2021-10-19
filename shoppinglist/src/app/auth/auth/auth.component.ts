import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../auth.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy {
  islogin = true;
  isloading = false;
  error: string = null
  sub:Subscription;

  constructor(private authservice: AuthService) {
  }

  ngOnInit(): void {
  }

  loginmode() {

    this.islogin = !this.islogin
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>
    this.isloading = true;
    if (this.islogin) {
      authObs = this.authservice.login(email, password)
    } else {
      authObs = this.authservice.signup(email, password)
    }

   this.sub =  authObs.subscribe(
      resdata => {
        console.log(resdata);
        this.isloading = false;
      },
      defaulter => {
        this.error = defaulter;
        this.isloading = false;

      });
    console.log(form.value);


    form.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}





