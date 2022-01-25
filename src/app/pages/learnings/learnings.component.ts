import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CreateLearningDialogComponent } from '@app/project-related/project-related-components.index';
import { LearningService } from '@app/shared/services/learning/learning.service';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { ILearning } from '@app/shared/models/learning.model';

@UntilDestroy()
@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  learnings: ILearning[];

  searchValue: string;
  searchFields: string[];
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];

  constructor(
    private learningService: LearningService,
    public dialog: MatDialog,
    private messageHandlingService: MessageHandlingService
  ) {}

  ngOnInit(): void {
    this.searchFields = ['name'];
    this.pageSize = 10;
    this.pageIndex = 0;

    // used untilDestroyed for destroying subscription
    this.learningService
      .getLearningsAsObservable()
      .pipe(untilDestroyed(this))
      .subscribe((learnings: ILearning[]) => {
        this.learnings = learnings;
        this.pageSizeOptions = [5, 10, 25, 50, learnings.length];
      });
  }

  onClickCreateLearning(): void {
    const dialogRef = this.dialog.open(CreateLearningDialogComponent, {});

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: { success: boolean }) => {
        if (result?.success) {
          this.messageHandlingService.showSuccessMessage(
            'Learning successfully created!',
            '',
            true
          );
        }
      });
  }

  onChangeSearchInput(): void {
    this.paginator.firstPage();
  }

  onPagination(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  deleteLearning(id: number): void {
    this.learningService
      .deleteLearning(id)
      .subscribe((result: { success: boolean }) => {
        if (result.success)
          this.messageHandlingService.showSuccessMessage(
            'Learning successfully deleted!',
            '',
            true
          );
      });
  }

  onClickRemove(learning: ILearning): void {
    this.messageHandlingService
      .showConfirm(
        'Remove Learning',
        `Are you sure you want to delete: ${learning.name}`
      )
      .subscribe((result) => {
        if (result.isConfirmed) {
          this.deleteLearning(learning.id);
        }
      });
  }

  onClickChangeStatus(learning: ILearning): void {
    const newStatus = learning.status === 'active' ? 'archived' : 'active';
    this.learningService
      .changeLearningStatus(learning.id, newStatus)
      .subscribe((response) => {
        if (response.success) {
          this.messageHandlingService.showSuccessMessage(
            'Learning successfully status changed!',
            '',
            true
          );
        }
      });
  }
}
