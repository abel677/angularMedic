import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() color: string = '';

}
