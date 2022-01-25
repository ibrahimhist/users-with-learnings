import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { LoadingService } from '../loading.service';
import { MessageHandlingService } from '../message-handling.service';

import {
  ILearning,
  LearningStatusType,
} from '@app/shared/models/learning.model';

import { BaseService } from '../base.service';
@Injectable({
  providedIn: 'root',
})
export class LearningService extends BaseService {
  private learningsSubject = new BehaviorSubject<ILearning[]>([]);

  constructor(
    private http: HttpClient,
    protected messageHandlingService: MessageHandlingService,
    protected loadingService: LoadingService
  ) {
    super(messageHandlingService, loadingService);
  }

  getLearningsAsObservable(): Observable<ILearning[]> {
    return this.learningsSubject.asObservable();
  }

  setLearnings(learnings: ILearning[]): void {
    this.learningsSubject.next(learnings);
  }

  getLearningsFromIdList(learningIds: number[]) {
    const learnings = this.learningsSubject.getValue();
    return learnings.filter((x) => learningIds.includes(x.id));
  }

  getLearnings(): Observable<ILearning[]> {
    return this.http
      .get<any[]>(
        `${this.apiUrl}/commerce/random_commerce?size=75`,
        this.httpOptions
      )
      .pipe(
        map((random_commerce) => {
          return random_commerce.map(
            (x, index) =>
              ({
                id: x.id,
                name: x.product_name,
                status: 'active',
                assignedUsers: [],
                avatar: 'https://picsum.photos/200/300?random=' + (index + 1),
              } as ILearning)
          );
        }),
        catchError(this.handleError<ILearning[]>(`getLearnings`))
      );
  }

  createLearning(learning: ILearning) {
    return of(learning).pipe(
      tap((x) => {
        x.id = Date.now();
        this.setLearnings([x, ...this.learningsSubject.getValue()]);
      }),
      catchError(this.handleError<ILearning[]>(`createLearning`))
    );
  }

  deleteLearning(id: number): Observable<{ success: boolean }> {
    return of({ success: true }).pipe(
      tap((x) => {
        const learnings = this.learningsSubject.getValue();
        this.setLearnings(learnings.filter((x) => x.id !== id));
      }),
      catchError(this.handleError(`deleteLearning`))
    ) as any;
  }

  changeLearningStatus(
    id: number,
    newStatus: LearningStatusType
  ): Observable<{ success: boolean }> {
    return of({ success: true }).pipe(
      tap((x) => {
        const learnings = this.learningsSubject.getValue();
        const foundLeaning = learnings.find((x) => x.id === id);
        if (foundLeaning) {
          foundLeaning.status = newStatus;
          this.setLearnings(learnings);
        }
      }),
      catchError(this.handleError(`changeLearningStatus`))
    ) as any;
  }

  assignUsersToLearning(
    id: number,
    userIds: number[]
  ): Observable<{ success: boolean }> {
    return of({ success: true }).pipe(
      tap((x) => {
        const learnings = this.learningsSubject.getValue();
        const foundLeaning = learnings.find((x) => x.id === id);
        if (foundLeaning) {
          foundLeaning.assignedUsers = userIds;
          this.setLearnings(learnings);
        }
      }),
      catchError(this.handleError(`changeLearningStatus`))
    ) as any;
  }

  getAndSetLearnings(): void {
    this.getLearnings().subscribe((response) => {
      if (response) {
        this.setLearnings(response);
      }
    });
  }
}
