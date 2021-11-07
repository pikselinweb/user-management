import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject } from 'rxjs';
// MODELS
import { PROFILE } from '@models/auth';
@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  currentUser$ = new BehaviorSubject<PROFILE | null>(null);
  constructor() {}
}
