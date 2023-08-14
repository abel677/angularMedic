import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'appointmentsMedicalApp';

  // constructor(public loader: LoaderService) {}
  // ngOnInit(): void {
  //   this.loader.IsSetLoader = true;
  //   //this.loader.IsSetLoader = false;
  // }
}
