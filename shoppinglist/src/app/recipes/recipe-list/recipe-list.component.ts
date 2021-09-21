import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[]

  constructor(private recipeservice: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeservice.getrecipes()
  }


}
