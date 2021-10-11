import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
 @Input() recipes: RecipeModel[]

  constructor(private recipeservice: RecipeService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeservice.getrecipes()
    this.recipeservice.recipeschanged.subscribe((recipes:RecipeModel[])=>{
      this.recipes = recipes
    })
  }
  newrecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
  }

}
