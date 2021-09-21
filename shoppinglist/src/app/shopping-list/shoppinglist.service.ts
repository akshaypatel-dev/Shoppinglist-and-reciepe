import { Injectable } from '@angular/core';
import {IngrediantsModel} from "../shared/ingrediants.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
   public Ingredient: IngrediantsModel[] = [
    {ingrediant_name: 'Paneer', amount: 20},
    {ingrediant_name: 'Cheese', amount: 300},
    {ingrediant_name: 'sugar', amount: 20}
  ];
  constructor() { }
  getingrediant(){
    return this.Ingredient;
  }
  addIngrediant(ingrediant:IngrediantsModel){
    this.Ingredient.push(ingrediant)
  }
}
