import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {RecipeModel} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {userError} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpclient: HttpClient, private recipeservice: RecipeService, private authservice: AuthService) {

  }

  storerecipes() {
    let recipes = this.recipeservice.getrecipes();
    return this.httpclient.put('https://recipe-book-fb764-default-rtdb.firebaseio.com/recipes.json',
      recipes).subscribe(response => {
    })
  }

  fetchrecipes() {
    return this.authservice.user.pipe(take(2),
      exhaustMap(user => {
        return this.httpclient.get<RecipeModel[]>
        ('https://recipe-book-fb764-default-rtdb.firebaseio.com/recipes.json',{})
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
              })
            }),
            tap(recipes => {
              this.recipeservice.setrecipes(recipes)
            }))

      }))
  }
}
