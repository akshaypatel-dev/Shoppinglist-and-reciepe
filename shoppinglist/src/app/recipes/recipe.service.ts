import {Injectable, OnInit} from '@angular/core';
import {RecipeModel} from "./recipe.model";
import {ShoppinglistService} from "../shopping-list/shoppinglist.service";
import {IngrediantsModel} from "../shared/ingrediants.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  // recipes: RecipeModel[] = [
  //   {
  //     name: 'paneer tikka masala',
  //     description: 'Paneer tikka masala is an Indian ' +
  //       'dish of marinated paneer cheese served in a spiced gravy.' +
  //       ' It is a vegetarian alternative to chicken tikka masala.',
  //     imagepath: 'https://www.bing.com/th?id=ATOOLE2EFC70278FE618BD08C39CA67CB85F5824582EC66DF369C4D817FE37D5CD117&w=472&h=280&c=13&rs=2&o=6&pid=SANGAM',
  //     ingredients: [
  //       {ingredients_name: 'Oil', amount: 1},
  //       {ingredients_name: 'paneer', amount: 200},
  //       {ingredients_name: 'Onion', amount: 2}]
  //   },
  //   {
  //     name: 'Butter Chicken',
  //     description: 'Butter chicken or murgh makhani is a curry of chicken in a spiced tomato, butter and cream sauce.' +
  //       ' It originated in the Indian subcontinent as a curry. It is similar to chicken tikka masala, which uses a tomato paste.',
  //     imagepath: 'https://www.bing.com/th?id=ATOOLEF15B3CC14DBF04B98721F9808721045C46C7AADBBC49B2110E3B41475644DCF&w=472&h=280&c=13&rs=2&o=6&pid=SANGAM',
  //     ingredients: [{ingredients_name: 'Butter', amount: 12,},{ingredients_name: 'Chicken', amount: 3},{ingredients_name: 'Onions', amount: 5}]
  //   },
  //   {
  //     name: 'Paneer Handi',
  //     description: 'very good reciepe',
  //     imagepath: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
  //     ingredients: [{ingredients_name: 'Paneer', amount: 12}]
  //   },
  //   {
  //     name: 'Chicken & Brown Butter Rice with Corn & Tomatoes',
  //     description: 'This simple, seasonal recipe teams up seared chicken and brown rice,' +
  //       ' loaded with late-summer vegetables. We???re tossing the grains with toasty brown butter???simply butter heated in a pan for a couple of minutes???and a quick saut?? of sweet corn.' +
  //       ' Juicy tomatoes (yours may be red or yellow) and basil seeds marinated in vinegar top off the rice with pops of delicious brightness.' +
  //       ' (Chefs, your basil seeds will turn white when marinated!)',
  //     imagepath: 'https://media.blueapron.com/recipes/2483/square_newsletter_images/1504215337-7-0069-3214/911_2PP_Seared-Chicken_85442_WEB_SQ.jpg?quality=80&width=850',
  //     ingredients: [{ingredients_name: 'Boneless, Skinless Chicken Breasts', amount: 3,},{ingredients_name: 'Cherry or Charm Tomatoes', amount: 4}]
  //   },
  // ]
  private recipes:RecipeModel[] = [];
  recipeschanged = new Subject<RecipeModel[]>()

  ngOnInit(): void {
     this.recipes
  }

  constructor(private slservice: ShoppinglistService) {
  }

  getrecipes() {
    return this.recipes.slice()
  }
setrecipes(recipes:RecipeModel[]){
    this.recipes = recipes;
    this.recipeschanged.next(this.recipes.slice())
}
  ingrediantaddtoshoppinglist(ingredients: IngrediantsModel[]) {
    this.slservice.addingrediants(ingredients)
  }

  getRecipe(index: number) {
     return this.recipes.slice()[index]

  }

  updaterecipe(index: number, newrecipe: RecipeModel) {
    this.recipes[index] = newrecipe;
    this.recipeschanged.next(this.recipes.slice())
      }
  addrecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipeschanged.next(this.recipes.slice());

  }
  deletereceipe(index:number){
    this.recipes.splice(index,1);
    this.recipeschanged.next(this.recipes.slice());

  }
}
