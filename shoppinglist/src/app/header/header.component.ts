import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private datastorageservice: DataStorageService, private authservice: AuthService) {
  }
   usersub:Subscription;
  isAuthenticate = false;
  onsavedata() {
    this.datastorageservice.storerecipes()
  }

  fetchdata() {
    this.datastorageservice.fetchrecipes().subscribe()
  }

  ngOnInit(): void {
    this.usersub =  this.authservice.user.subscribe( user =>{
      this.isAuthenticate = !!user;
    })

  }

  // ngOnDestroy(): void {
  //   this.usersub.unsubscribe()
  // }
  logout(){
    this.authservice.logout()
  }

}

