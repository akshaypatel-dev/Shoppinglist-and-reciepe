import {EventEmitter, Injectable} from '@angular/core';
import {RecipeModel} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeselected = new EventEmitter<RecipeModel>()
  recipes: RecipeModel[] = [
    {
      name: 'Paneer Butter',
      description: 'very good reciepe',
      imagepath: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
      ingrediant_name:'Paneer',
      amount:12
      },
    {
      name: 'Paneer Butter masala',
      description: 'very good reciepe',
      imagepath: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg',
      ingrediant_name:'Butter',
      amount:230

    },
    {
      name: 'Tikka masala',
      description: 'very good reciepe',
      imagepath: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-tikka-masala-recipe-1.jpg',
      ingrediant_name:'chicken',
      amount:120
    },

  ]

  getrecipes() {
    return this.recipes.slice()
  }

  constructor() {
  }

}
