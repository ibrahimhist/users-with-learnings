import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CoreModule } from '@app/core/core.module';
import { ILearning } from '@app/shared/models/learning.model';
import { SearchPipe } from '@app/shared/pipes/search.pipe';
import { LearningService } from '@app/shared/services/learning/learning.service';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { of } from 'rxjs';

import { LearningsComponent } from './learnings.component';

const dumyLearnings: ILearning[] = [
  {
    id: 1,
    name: 'history',
    status: 'active',
    assignedUsers: [1, 2, 3],
    avatar: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: 2,
    name: 'math',
    status: 'archived',
    assignedUsers: [],
    avatar: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: 3,
    name: 'math2',
    status: 'active',
    assignedUsers: [],
    avatar: 'https://picsum.photos/200/300?random=3',
  },
];

describe('LearningsComponent', () => {
  let component: LearningsComponent;
  let fixture: ComponentFixture<LearningsComponent>;
  let learningService: LearningService;
  let messageHandlingService: MessageHandlingService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningsComponent, SearchPipe],
      imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [MessageHandlingService, LearningService],
    }).compileComponents();

    learningService = TestBed.inject(LearningService);
    messageHandlingService = TestBed.inject(MessageHandlingService);
    matDialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list learnings', () => {
    // Arrange
    component.learnings = dumyLearnings;
    //  Act
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(
      By.css(`[data-testid="learning-list-item"]`)
    );
    //  Assertion
    expect(listItems.length).toBe(dumyLearnings.length);
  });

  it('should search learnings', () => {
    // Arrange
    component.learnings = dumyLearnings;
    component.searchValue = 'math';
    //  Act
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(
      By.css(`[data-testid="learning-list-item"]`)
    );
    //  Assertion
    expect(listItems.length).toBe(
      dumyLearnings.filter((x) => x.name.includes(component.searchValue)).length
    );
  });

  it('should display 25 per page when onPagination event fired via Items perPage select', () => {
    // Arrange
    const newDummyLearnings = [];
    for (let index = 0; index < 100; index++) {
      const newLearning = { ...dumyLearnings[0], id: index };
      newDummyLearnings.push(newLearning);
    }
    component.learnings = newDummyLearnings;
    //  Act
    component.onPagination({ pageIndex: 0, pageSize: 25 } as any);

    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(
      By.css(`[data-testid="learning-list-item"]`)
    );
    //  Assertion
    expect(listItems.length).toBe(25);
  });

  it('should display next page when onPagination event fired via  next page button', () => {
    // Arrange
    const newDummyLearnings = [];
    for (let index = 0; index < 12; index++) {
      const newLearning = { ...dumyLearnings[0], id: index };
      newDummyLearnings.push(newLearning);
    }
    component.learnings = newDummyLearnings;
    //  Act
    component.onPagination({ pageIndex: 1, pageSize: 10 } as any);

    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(
      By.css(`[data-testid="learning-list-item"]`)
    );
    //  Assertion
    expect(listItems.length).toBe(2);
  });

  it('should open create learning dialog when create learning clicked, and give success message after being success', () => {
    // Arrange
    const dialogSpy = spyOn(matDialog, 'open').and.callFake(
      () =>
        ({
          afterClosed: () => {
            return of({ success: true } as any);
          },
        } as any)
    );
    const messageHandlingSpy = spyOn(
      messageHandlingService,
      'showSuccessMessage'
    );

    //  Act
    component.onClickCreateLearning();

    //  Assertion
    expect(dialogSpy).toHaveBeenCalled();
    expect(messageHandlingSpy).toHaveBeenCalled();
  });

  it('should show confirmation after click delete button, and yes should call deleteLearning', () => {
    // Arrange
    const messageHandlingSpy = spyOn(
      messageHandlingService,
      'showConfirm'
    ).and.callFake(() => of({ isConfirmed: true } as any));

    const deleteLearningSpy = spyOn(component, 'deleteLearning');
    // Act
    component.onClickRemove(dumyLearnings[0]);
    fixture.detectChanges();
    // Assertion
    expect(messageHandlingSpy).toHaveBeenCalled();
    expect(deleteLearningSpy).toHaveBeenCalled();
  });

  // it('should change learning status when clicked status button', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should open  assigned users dialog', () => {
  //   expect(component).toBeTruthy();
  // });
});
