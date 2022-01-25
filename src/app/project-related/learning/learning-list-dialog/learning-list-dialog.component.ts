import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILearning } from '@app/shared/models/learning.model';
import { LearningService } from '@app/shared/services/learning/learning.service';

@Component({
  selector: 'app-learning-list-dialog',
  templateUrl: './learning-list-dialog.component.html',
  styleUrls: ['./learning-list-dialog.component.scss'],
})
export class LearningListDialogComponent implements OnInit {
  learnings: ILearning[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: number[],
    @Optional() public dialogRef: MatDialogRef<LearningListDialogComponent>,
    private learningService: LearningService
  ) {}

  ngOnInit(): void {
    this.learnings = this.learningService.getLearningsFromIdList(this.data);
  }

  onClickedClose(): void {
    this.dialogRef.close();
  }
}
