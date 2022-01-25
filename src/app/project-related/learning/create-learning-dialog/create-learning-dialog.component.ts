import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LearningService } from '@app/shared/services/learning/learning.service';

@Component({
  selector: 'app-create-learning-dialog',
  templateUrl: './create-learning-dialog.component.html',
  styleUrls: ['./create-learning-dialog.component.scss'],
})
export class CreateLearningDialogComponent implements OnInit {
  createLearningForm: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<CreateLearningDialogComponent>,
    private fb: FormBuilder,
    private learningService: LearningService
  ) {}

  ngOnInit(): void {
    this.createLearningForm = this.fb.group({
      name: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      avatar: [''],
    });
  }

  onClickedClose(): void {
    this.dialogRef.close();
  }

  onClickedCreate(): void {
    if (this.createLearningForm.valid) {
      this.learningService
        .createLearning(this.createLearningForm.value)
        .subscribe((response) => {
          this.dialogRef.close({ success: true });
        });
    }
  }
}
