import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '@core/services/auth';
import { GlobalDataService } from '@core/services/common';
import { PROFILE } from '@models/auth';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let globalDataService: GlobalDataService;
  let userInfo = {
    email: 'admin@mail.com',
    fullName: 'Admin',
    id: 15,
    role: 2,
    userId: 'b692129e-ef7f-4f5c-996e-8df976c6fccb',
  };
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj(AuthService, ['logOut']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authSpy,
        },
      ],
    }).compileComponents();
    globalDataService = TestBed.inject(GlobalDataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the name of the user', fakeAsync(() => {
    let userData: PROFILE | null;
    globalDataService.currentUser$.next(userInfo);
    component.currentUser$.subscribe((item) => {
      userData = item;
      expect(userData?.fullName).toBeTruthy();
    });
    tick();
  }));
});
