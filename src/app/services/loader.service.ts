import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {


  isLoading$ = new Subject<boolean>();



  show(): void {
    this.isLoading$.next(true);
  }
  close(): void {
    this.isLoading$.next(false);
  }


  constructor() {}
}
