import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ILearning } from '@app/shared/models/learning.model';
import { LearningService } from '@app/shared/services/learning/learning.service';

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

  constructor(private learningService: LearningService) {}

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

  onClickRemove(): void {
    console.log(this.pageSize);
    console.log(this.pageIndex);
  }

  onChangeSearchInput(): void {
    this.paginator.firstPage();
  }

  onPagination(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
