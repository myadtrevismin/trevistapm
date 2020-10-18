import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymodalComponent } from './paymodal.component';

describe('PaymodalComponent', () => {
  let component: PaymodalComponent;
  let fixture: ComponentFixture<PaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
