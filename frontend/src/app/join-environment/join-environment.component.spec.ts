import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinEnvironmentComponent } from './join-environment.component';

describe('JoinEnvironmentComponent', () => {
  let component: JoinEnvironmentComponent;
  let fixture: ComponentFixture<JoinEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinEnvironmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
