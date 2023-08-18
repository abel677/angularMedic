import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AlertService } from './services/alert.service';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'appointmentsMedicalApp';

  show: boolean = false;
  message: string = '';
  color: string = '';

  constructor(
    public alert: AlertService,
    private changeDetected: ChangeDetectorRef,
    public loader: LoaderService
  ) {}
  ngAfterContentChecked() {
    this.changeDetected.detectChanges();
  }

  ngOnInit(): void {
    this.alert.getShow().subscribe((data) => {
      this.show = data;
      setTimeout(() => {
        this.alert.Close();
      }, 7000);
    });
    this.alert.getMessage().subscribe((message) => (this.message = message));
    this.alert.getColor().subscribe((color) => (this.color = color));

  }
}
