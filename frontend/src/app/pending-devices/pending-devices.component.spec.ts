import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDevicesComponent } from './pending-devices.component';

describe('PendingDevicesComponent', () => {
  let component: PendingDevicesComponent;
  let fixture: ComponentFixture<PendingDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
