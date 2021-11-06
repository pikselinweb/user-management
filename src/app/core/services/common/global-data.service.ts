import { Injectable } from '@angular/core';
// RXJS
import { BehaviorSubject } from 'rxjs';
// MODELS
import { USER } from '@models/auth';
@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  currentUser$ = new BehaviorSubject<USER | null>(null);
  constructor() { }
}
