import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shoppinglist';
  Loadedfeature = 'recipe'
  onfeatureselect(feature:string){
    this.Loadedfeature = feature;
  }
}