import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipes : RecipeModel;
  constructor( private recipeService:RecipeService){}
  ngOnInit() {

  }
  onselect(){
    this.recipeService.recipeselected.emit(this.recipes)
  }
}
