import { TestBed } from '@angular/core/testing';

import { SnackMessageService } from './snack-message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SnackMessageService', () => {
  let service: SnackMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule],
      // providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(SnackMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
