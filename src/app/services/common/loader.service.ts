// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoaderService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private requestCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  show() {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.loadingSubject.next(false);
      this.requestCount = 0;
    }
  }
}
