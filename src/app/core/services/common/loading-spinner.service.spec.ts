import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerService } from './loading-spinner.service';
import { Overlay } from '@angular/cdk/overlay';

describe('LoadingSpinnerService', () => {
  let service: LoadingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[Overlay]
    });
    service = TestBed.inject(LoadingSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
