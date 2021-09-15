import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedrecepie = new EventEmitter<RecipeModel>();
  recipes: RecipeModel[] = [
    {name:'Paneer Butter',
      description:'very good reciepe',
      imagepath:'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg'},
    {name:'Paneer Butter masala',
      description:'very good reciepe',
      imagepath:'https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg'},
    {name:'Tikka masala',
      description:'very good reciepe',
      imagepath:'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-tikka-masala-recipe-1.jpg'},

  ]
  constructor() {
  }

  ngOnInit(): void {
  }
  onselectrecipes(recipe: RecipeModel) {
    this.selectedrecepie.emit(recipe);
  }
}
