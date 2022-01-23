import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningsComponent } from './learnings.component';

describe('LearningsComponent', () => {
  let component: LearningsComponent;
  let fixture: ComponentFixture<LearningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
