import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
// SERVICES
import { GlobalDataService } from '@core/services/common';
import { AuthService } from '@core/services/auth';
// MODELS
import { PROFILE } from '@models/auth';
// ENV
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly userRoles: string[] = environment.userRoles;
  currentUser$: Observable<PROFILE | null> =
    this.globalData.currentUser$.asObservable();
  constructor(
    private globalData: GlobalDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.authService.logOut();
  }
}
