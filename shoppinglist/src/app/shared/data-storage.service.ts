import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {RecipeModel} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpclient: HttpClient, private recipeservice: RecipeService) {

  }

  storerecipes() {
    let recipes = this.recipeservice.getrecipes();
    return this.httpclient.put('https://recipe-book-fb764-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response)
    })
  }

  fetchrecipes() {
    this.httpclient.get<RecipeModel[]>
    ('https://recipe-book-fb764-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipe => {
      return recipe.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    })).subscribe(recipes => {
      this.recipeservice.setrecipes(recipes)
    })
  }
}
