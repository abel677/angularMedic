import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoader: boolean = false;

  get IsGetLoader() {
    return this.isLoader;
  }

  set IsSetLoader(value: boolean) {
    this.isLoader = value;
  }

  // private loaderSource = new BehaviorSubject<boolean>(false);
  // show() {
  //   this.loaderSource.next(true);
  // }
  // hide() {
  //   this.loaderSource.next(false);
  // }
  // getLoader() {
  //   return this.loaderSource.asObservable();
  // }

  constructor() {}
}
