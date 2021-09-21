import {Component, OnInit} from '@angular/core';
import {IngrediantsModel} from "../shared/ingrediants.model";
import {ShoppinglistService} from "./shoppinglist.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  Ingredient: IngrediantsModel[]

  constructor(private ingrediantservice:ShoppinglistService) {
  }

  ngOnInit(): void {
    this.Ingredient = this.ingrediantservice.getingrediant();
  }


}
