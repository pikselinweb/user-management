import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFromComponent } from './user-from.component';

describe('UserFromComponent', () => {
  let component: UserFromComponent;
  let fixture: ComponentFixture<UserFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
