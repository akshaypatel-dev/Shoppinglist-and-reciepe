import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IngrediantsModel} from "../../shared/ingrediants.model";
import {ShoppinglistService} from "../shoppinglist.service";
import {FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myform: NgForm
  subscription: Subscription;
  editedItem: IngrediantsModel;
  editmode = false
  editedindex: number

  constructor(private slservice: ShoppinglistService) {
  }

  ngOnInit(): void {
    this.subscription = this.slservice.startedediting.subscribe((index: number) => {
      this.editmode = true;
      this.editedindex = index;
      this.editedItem = this.slservice.getIngrediants(index);
      this.myform.setValue({
        name: this.editedItem.ingredients_name, amount: this.editedItem.amount
      })

    })
  }

  adddata(form: NgForm) {
    const value = form.value;
    const newingrediant: IngrediantsModel = {ingredients_name: value.name, amount: value.amount};
    if (this.editmode) {
      this.slservice.updateIngrediant(this.editedindex, newingrediant)
    } else {
      this.slservice.addIngrediant(newingrediant);

    }

  }

  reset() {
    this.myform.reset();
    this.editmode = false;
  }

  delete() {
    this.slservice.deleteIngrediant(this.editedindex);
    this.reset();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
