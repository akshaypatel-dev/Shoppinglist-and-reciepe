import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
 selectedRecipes:RecipeModel;
  constructor(private recipeService:RecipeService) { }
  ngOnInit(): void {
    this.recipeService.recipeselected.subscribe(
      (recipe)=>{this.selectedRecipes=recipe}
    )
  }

}
