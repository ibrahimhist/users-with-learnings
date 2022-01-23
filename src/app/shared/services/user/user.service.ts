import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { IUser } from '@app/shared/models/user.model';
import { LoadingService } from '../loading.service';
import { MessageHandlingService } from '../message-handling.service';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  apiUrl = 'https://random-data-api.com/api';

  constructor(
    private http: HttpClient,
    private messageHandlingService: MessageHandlingService,
    private loadingService: LoadingService
  ) {}

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageHandlingService.showErrorMessage(
        `${operation} failed: ${error.message}`
      );
      this.loadingService.hideLoading();
      return of(result as T);
    };
  }
}
