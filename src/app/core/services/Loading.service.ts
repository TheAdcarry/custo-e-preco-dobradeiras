import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loadingSubject.asObservable();

  setLoading(isLoading: boolean): void {
    this._loadingSubject.next(isLoading);
  }
}
