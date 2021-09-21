import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {IngrediantsModel} from "../../shared/ingrediants.model";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
@Input() recipe:RecipeModel;
  constructor() { }

  ngOnInit(): void {
  }

}
