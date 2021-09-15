import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IngrediantsModel} from "../../shared/ingrediants.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('nameinput') NameinputRef:ElementRef;
@ViewChild('amountinput') amountinputRef:ElementRef;
@Output() IngrediantsAdded = new EventEmitter<IngrediantsModel>();

  constructor() { }

  ngOnInit(): void {
  }
  adddata(){
    const ingname= this.NameinputRef.nativeElement.value;
    const ingnumber= this.amountinputRef.nativeElement.value;
    const newingrediant:IngrediantsModel={name:ingname,amount:ingnumber};
    this.IngrediantsAdded.emit(newingrediant);

  }

}
