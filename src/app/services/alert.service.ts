import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IAlert {
  color: string;
  message: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private show = new BehaviorSubject<boolean>(false);
  private message = new BehaviorSubject<string>('');
  private color = new BehaviorSubject<string>('');

  Close() {
    this.show.next(false);
  }

  Show() {
    this.show.next(true);
  }

  getShow() {
    return this.show.asObservable();
  }

  setMessage(value: string) {
    this.message.next(value);
  }

  getMessage() {
    return this.message.asObservable();
  }

  setColor(value: string) {
    this.color.next(value);
  }

  getColor() {
    return this.color.asObservable();
  }

  constructor() {  
  }
}
