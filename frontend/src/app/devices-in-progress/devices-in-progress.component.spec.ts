import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesInProgressComponent } from './devices-in-progress.component';

describe('DevicesInProgressComponent', () => {
  let component: DevicesInProgressComponent;
  let fixture: ComponentFixture<DevicesInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
