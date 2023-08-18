import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRoles } from 'src/app/interfaces/IAut';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() email: string = '';
  @Input() role: IRoles[] = [];
  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  click() {
    this.onClick.emit(true);
  }
}
