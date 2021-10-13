import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 @Input() recipe: RecipeModel;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id)
      })
  }

  shoppinglistadded() {
    this.recipeService.ingrediantaddtoshoppinglist(this.recipe.ingredients);
    alert('shopping list added ');
  }

  editrecipe() {
  this.router.navigate(['edit'],{relativeTo:this.route})
  }
  ondelete(){
    this.recipeService.deletereceipe(this.id)
  }
}

