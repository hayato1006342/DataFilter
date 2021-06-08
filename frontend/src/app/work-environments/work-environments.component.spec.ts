import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEnvironmentsComponent } from './work-environments.component';

describe('WorkEnvironmentsComponent', () => {
  let component: WorkEnvironmentsComponent;
  let fixture: ComponentFixture<WorkEnvironmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkEnvironmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
