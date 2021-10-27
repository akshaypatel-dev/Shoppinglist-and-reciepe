import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {AlertBoxComponent} from "../shared/alert-box/alert-box.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  islogin = true;
  isloading = false;
  error: string = null;
  sub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authservice: AuthService, private componentFactoryResolver: ComponentFactoryResolver,private router:Router) {
  }


  ngOnInit(): void {
  }

  loginmode() {

    this.islogin = !this.islogin;

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
      authObs = this.authservice.login(email, password);
    } else {
      authObs = this.authservice.signup(email, password)
    }

    this.sub = authObs.subscribe(
      resdata => {
        console.log(resdata);
        this.isloading = false;
        this.router.navigate(['recipes'])

      },
      defaulter => {
        this.error = defaulter;
        this.errorAlert(this.error);
        this.isloading = false;

      });
    console.log(form.value);


    form.reset();
  }

  closeMe() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

  private errorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertBoxComponent);
    const hostViewReference = this.alertHost.viewContainerRef;
    hostViewReference.clear()
    const componentref =  hostViewReference.createComponent(alertComponentFactory);
    componentref.instance.message = message;
    this.sub = componentref.instance.close.subscribe(()=>{
      this.sub.unsubscribe();
      hostViewReference.clear()

    })

  }
}





