import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningListDialogComponent } from './learning-list-dialog.component';

xdescribe('LearningListDialogComponent', () => {
  let component: LearningListDialogComponent;
  let fixture: ComponentFixture<LearningListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningListDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
