import { Component, Input, OnInit } from '@angular/core';
import { IPageResponse } from 'src/app/interfaces/IPageResponse';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  @Input() pages:IPageResponse [] = []
  
}
