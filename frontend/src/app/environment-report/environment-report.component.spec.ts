import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentReportComponent } from './environment-report.component';

describe('EnvironmentReportComponent', () => {
  let component: EnvironmentReportComponent;
  let fixture: ComponentFixture<EnvironmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
