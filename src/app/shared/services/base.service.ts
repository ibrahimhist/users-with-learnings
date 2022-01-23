import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { LoadingService } from './loading.service';
import { MessageHandlingService } from './message-handling.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  apiUrl = 'https://random-data-api.com/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    protected messageHandlingService: MessageHandlingService,
    protected loadingService: LoadingService
  ) {}

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageHandlingService.showErrorMessage(
        `${operation} failed: ${error.message}`
      );
      this.loadingService.hideLoading();
      return of(result as T);
    };
  }
}
