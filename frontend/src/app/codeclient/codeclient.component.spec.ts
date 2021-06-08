import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeclientComponent } from './codeclient.component';

describe('CodeclientComponent', () => {
  let component: CodeclientComponent;
  let fixture: ComponentFixture<CodeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
