import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { IUser } from '@app/shared/models/user.model';
import { LoadingService } from '../loading.service';
import { MessageHandlingService } from '../message-handling.service';

import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);

  constructor(
    private http: HttpClient,
    protected messageHandlingService: MessageHandlingService,
    protected loadingService: LoadingService
  ) {
    super(messageHandlingService, loadingService);
  }

  getUsersAsObservable(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(
        `${this.apiUrl}/users/random_user?size=100`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<IUser[]>(`getUsers`)));
  }

  getAndSetUsers(): void {
    this.getUsers().subscribe((response) => {
      if (response) {
        this.setUsers(response);
      }
    });
  }
}
