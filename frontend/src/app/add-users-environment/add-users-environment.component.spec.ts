import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersEnvironmentComponent } from './add-users-environment.component';

describe('AddUsersEnvironmentComponent', () => {
  let component: AddUsersEnvironmentComponent;
  let fixture: ComponentFixture<AddUsersEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersEnvironmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
