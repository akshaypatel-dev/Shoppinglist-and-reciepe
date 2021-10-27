import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent  {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
}
