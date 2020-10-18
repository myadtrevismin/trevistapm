import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionModelComponent } from './discussion-model.component';

describe('DiscussionModelComponent', () => {
  let component: DiscussionModelComponent;
  let fixture: ComponentFixture<DiscussionModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
