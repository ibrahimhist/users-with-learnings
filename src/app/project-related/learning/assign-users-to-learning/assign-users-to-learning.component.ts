import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { LearningService } from '@app/shared/services/learning/learning.service';
import { UserService } from '@app/shared/services/user/user.service';

import { ILearning } from '@app/shared/models/learning.model';
import { IUser } from '@app/shared/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-assign-users-to-learning',
  templateUrl: './assign-users-to-learning.component.html',
  styleUrls: ['./assign-users-to-learning.component.scss'],
})
// I should name it AssignUsersToLearningComponentDialog my mistake
export class AssignUsersToLearningComponent implements OnInit {
  users: IUser[];
  selectedUsers: number[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ILearning,
    @Optional() public dialogRef: MatDialogRef<AssignUsersToLearningComponent>,
    private learningService: LearningService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.selectedUsers = this.data?.assignedUsers || [];

    // used untilDestroyed for destroying subscription
    this.userService
      .getUsersAsObservable()
      .pipe(untilDestroyed(this))
      .subscribe((users: IUser[]) => {
        this.users = users;
      });
  }

  onClickedClose(): void {
    this.dialogRef.close();
  }

  onClickedAssign(): void {
    this.learningService
      .assignUsersToLearning(this.data.id, this.selectedUsers)
      .subscribe((response) => {
        this.dialogRef.close({ success: true });
      });
  }
}
