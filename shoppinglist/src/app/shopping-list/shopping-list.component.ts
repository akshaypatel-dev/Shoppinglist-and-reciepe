import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngrediantsModel} from "../shared/ingrediants.model";
import {ShoppinglistService} from "./shoppinglist.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  Ingredient: IngrediantsModel[]
  private igchangesub: Subscription

  constructor(private ingrediantservice: ShoppinglistService) {
  }

  ngOnInit(): void {
    this.Ingredient = this.ingrediantservice.getingrediant();
    this.igchangesub = this.ingrediantservice.ingrediantschnages.subscribe((ingrediants: IngrediantsModel[]) => {
      this.Ingredient = ingrediants;

    })

  }

  onedit(index: number) {
    this.ingrediantservice.startedediting.next(index);

  }


  ngOnDestroy() {
    this.igchangesub.unsubscribe()
  }
}
