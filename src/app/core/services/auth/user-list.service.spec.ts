import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule,MatSnackBarModule],
      providers: [ApiService, SnackMessageService, GlobalDataService],
    });
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
