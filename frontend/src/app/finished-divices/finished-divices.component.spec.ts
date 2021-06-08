import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedDivicesComponent } from './finished-divices.component';

describe('FinishedDivicesComponent', () => {
  let component: FinishedDivicesComponent;
  let fixture: ComponentFixture<FinishedDivicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedDivicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedDivicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
