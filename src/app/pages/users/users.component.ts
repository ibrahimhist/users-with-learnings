import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  CreateUserDialogComponent,
  LearningListDialogComponent,
} from '@app/project-related/project-related-components.index';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { UserService } from '@app/shared/services/user/user.service';
import { LearningService } from '@app/shared/services/learning/learning.service';
import { IUser } from '@app/shared/models/user.model';
import { map, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  users: IUser[];

  searchValue: string;
  searchFields: string[];
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];

  constructor(
    private userService: UserService,
    private learningService: LearningService,
    public dialog: MatDialog,
    private messageHandlingService: MessageHandlingService
  ) {}

  ngOnInit(): void {
    this.searchFields = ['first_name', 'last_name', 'email'];
    this.pageSize = 10;
    this.pageIndex = 0;

    // used untilDestroyed for destroying subscription
    // normally backend should give me assgned learnings,  but I am handling this way right now :)
    this.userService
      .getUsersAsObservable()
      .pipe(
        switchMap((users) => {
          return this.learningService.getLearningsAsObservable().pipe(
            map((learnings) => {
              users.forEach((user, index) => {
                user.learnings = learnings
                  .filter(
                    (learning) =>
                      learning.assignedUsers.some(
                        (userId) => userId === user.id
                      ) && learning.status !== 'archived'
                  )
                  .map((x) => x.id);

                // first user always full
                // if (
                //   index === 0 &&
                //   learnings?.length &&
                //   !user?.learnings?.length
                // ) {
                //   user.learnings = [...learnings.map((x) => x.id)];
                // }
              });

              return users;
            })
          );
        }),
        untilDestroyed(this)
      )
      .subscribe((users: IUser[]) => {
        this.users = users;
        this.pageSizeOptions = [5, 10, 25, 50, users.length];
      });
  }

  onChangeSearchInput(): void {
    this.paginator.firstPage();
  }

  onPagination(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onClickCreateUser(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {});

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: { success: boolean }) => {
        if (result?.success) {
          this.messageHandlingService.showSuccessMessage(
            'User successfully created!',
            '',
            true
          );
        }
      });
  }

  deleteUser(id: number): void {
    this.userService
      .deleteUser(id)
      .subscribe((result: { success: boolean }) => {
        if (result.success)
          this.messageHandlingService.showSuccessMessage(
            'User successfully deleted!',
            '',
            true
          );
      });
  }

  onClickRemove(user: IUser): void {
    this.messageHandlingService
      .showConfirm(
        'Remove User',
        `Are you sure you want to delete: ${user.first_name}  ${user.last_name}`
      )
      .subscribe((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user.id);
        }
      });
  }

  onClickShowLearnings(user: IUser): void {
    this.dialog.open(LearningListDialogComponent, { data: user.learnings });
  }
}
