import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import { ReactiveFormsModule} from "@angular/forms";
import {ShoppinglistService} from "./shopping-list/shoppinglist.service";
import {RecipeService} from "./recipes/recipe.service";
import {AuthinterceptorService} from "./auth/authinterceptor.service";
import {RecipesRoutingModule} from "./recipes/recipes-routing.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesRoutingModule,
    ShoppingListModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    ShoppinglistService, RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
