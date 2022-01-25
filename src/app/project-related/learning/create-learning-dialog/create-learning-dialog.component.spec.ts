import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningDialogComponent } from './create-learning-dialog.component';

describe('CreateLearningDialogComponent', () => {
  let component: CreateLearningDialogComponent;
  let fixture: ComponentFixture<CreateLearningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLearningDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
