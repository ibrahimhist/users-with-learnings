import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CreateUserDialogComponent } from '@app/project-related/project-related-components.index';
import { MessageHandlingService } from '@app/shared/services/message-handling.service';
import { UserService } from '@app/shared/services/user/user.service';
import { IUser } from '@app/shared/models/user.model';

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
    public dialog: MatDialog,
    private messageHandlingService: MessageHandlingService
  ) {}

  ngOnInit(): void {
    this.searchFields = ['first_name', 'last_name', 'email'];
    this.pageSize = 10;
    this.pageIndex = 0;

    // used untilDestroyed for destroying subscription
    this.userService
      .getUsersAsObservable()
      .pipe(untilDestroyed(this))
      .subscribe((users: IUser[]) => {
        this.users = users;
        this.pageSizeOptions = [5, 10, 25, 50, users.length];
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

  onClickedOpen(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {});

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: { success: boolean }) => {
        if (result.success) {
          this.messageHandlingService.showSuccessMessage(
            'User successfully created!',
            '',
            true
          );
        }
      });
  }
}
