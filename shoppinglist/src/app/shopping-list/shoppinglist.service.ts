import {EventEmitter, Injectable} from '@angular/core';
import {IngrediantsModel} from "../shared/ingrediants.model";
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingrediantschnages = new Subject<IngrediantsModel[]>()
  startedediting = new Subject<number>()
    private ingredients: IngrediantsModel[] = [
    {ingredients_name: 'Paneer', amount: 20},
    {ingredients_name: 'Cheese', amount: 300},
    {ingredients_name: 'sugar', amount: 20}
  ];
  constructor() { }
  getingrediant(){
    return this.ingredients;
  }
  getIngrediants(index:number){
return this.ingredients[index];
  }
  addIngrediant(ingrediant:IngrediantsModel){
    this.ingredients.push(ingrediant);
    this.ingrediantschnages.next(this.ingredients.slice());

  }
  addingrediants(ingrediants:IngrediantsModel[]) {
     this.ingredients.push(...ingrediants);
     this.ingrediantschnages.next(this.ingredients.slice());

  }
  updateIngrediant(index:number,ingredint:IngrediantsModel){
    this.ingrediantschnages.next(this.ingredients.slice())
    return this.ingredients[index] = ingredint;
  }
  deleteIngrediant(index:number){
   this.ingredients.splice(index,1);
    this.ingrediantschnages.next(this.ingredients.slice());

  }
}
