import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammodComponent } from './teammod.component';

describe('TeammodComponent', () => {
  let component: TeammodComponent;
  let fixture: ComponentFixture<TeammodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
