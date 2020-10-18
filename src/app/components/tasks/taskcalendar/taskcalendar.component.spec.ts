import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcalendarComponent } from './taskcalendar.component';

describe('TaskcalendarComponent', () => {
  let component: TaskcalendarComponent;
  let fixture: ComponentFixture<TaskcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
