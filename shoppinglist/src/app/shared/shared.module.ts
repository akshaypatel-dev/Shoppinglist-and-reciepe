import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertBoxComponent} from "./alert-box/alert-box.component";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingspinnerComponent} from "./loadingspinner/loadingspinner.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";


@NgModule({
  declarations: [
    AlertBoxComponent,
    DropdownDirective,
    LoadingspinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    AlertBoxComponent,
    DropdownDirective,
    LoadingspinnerComponent,
    PlaceholderDirective

  ]
})
export class SharedModule {
}
