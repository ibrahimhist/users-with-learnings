import { Component, OnInit, ViewChild } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UserService } from '@app/shared/services/user/user.service';
import { IUser } from '@app/shared/models/user.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  constructor(private userService: UserService) {}

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
}
