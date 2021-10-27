import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {Authguard} from "../authguard/authguard.service";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeResolverService} from "./recipe-resolver.service";

const route:Routes =[
  {
    path: "", component: RecipesComponent,
    canActivate:[Authguard],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailsComponent, resolve:[RecipeResolverService]},
      {
        path: ':id/edit', component: RecipeEditComponent, resolve:[RecipeResolverService]
      }
    ]
  },
]
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class RecipesRoutingModule{

}
