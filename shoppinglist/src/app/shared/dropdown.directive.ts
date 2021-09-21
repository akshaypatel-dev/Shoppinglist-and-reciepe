import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {
@HostBinding('class.open')toggle = false;
  @HostListener('click')toggleopen(){
  this.toggle=!this.toggle;
}
}
