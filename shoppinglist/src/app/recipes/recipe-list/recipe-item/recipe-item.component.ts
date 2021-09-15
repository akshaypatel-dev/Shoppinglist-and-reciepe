import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipes : RecipeModel;
 @Output() recipeselect = new EventEmitter<void>();
  constructor(){}
  ngOnInit() {
  }
  onselect(){
  this.recipeselect.emit()
  }
}
