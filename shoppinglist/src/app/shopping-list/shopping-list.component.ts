import {Component, OnInit} from '@angular/core';
import {IngrediantsModel} from "../shared/ingrediants.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  Ingredient: IngrediantsModel[] = [
    {name: 'Paneer', amount: 20},
    {name: 'Cheese', amount: 300},
    {name: 'sugar', amount: 20}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  oningrediantadded(ingrediantsModel: IngrediantsModel) {
    this.Ingredient.push(ingrediantsModel)
  }

}
