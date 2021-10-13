import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Input() recipes: RecipeModel[];
  subscribe:Subscription;

  constructor(private recipeservice: RecipeService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscribe =  this.recipeservice.recipeschanged.subscribe
    ((recipes : RecipeModel[] ) => {
      this.recipes = recipes
    })
    this.recipes = this.recipeservice.getrecipes()
  }
  newrecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
  }


  ngOnDestroy(): void {
    this.subscribe.unsubscribe()

  }
}
