import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUsersToLearningComponent } from './assign-users-to-learning.component';

xdescribe('AssignUsersToLearningComponent', () => {
  let component: AssignUsersToLearningComponent;
  let fixture: ComponentFixture<AssignUsersToLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignUsersToLearningComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUsersToLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
