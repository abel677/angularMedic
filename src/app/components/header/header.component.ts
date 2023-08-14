import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() email: string = '';
  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  click() {
    this.onClick.emit(true);
  }
}
