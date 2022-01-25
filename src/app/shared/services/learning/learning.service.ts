import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { LoadingService } from '../loading.service';
import { MessageHandlingService } from '../message-handling.service';

import { ILearning } from '@app/shared/models/learning.model';

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
                assignedUser: [],
                avatar: 'https://picsum.photos/200/300?random=' + (index + 1),
              } as ILearning)
          );
        }),
        catchError(this.handleError<ILearning[]>(`getLearnings`))
      );
  }

  createLearning(learning: ILearning) {
    return of(learning).pipe(
      map((x) => {
        x.id = Date.now();
        this.setLearnings([x, ...this.learningsSubject.getValue()]);
        return x;
      }),
      catchError(this.handleError<ILearning[]>(`createUsers`))
    );
  }

  deleteLearning(learningId: number): Observable<{ success: boolean }> {
    return of({ success: true }).pipe(
      map((x) => {
        const learnings = this.learningsSubject.getValue();
        this.setLearnings(learnings.filter((x) => x.id !== learningId));
        return x;
      }),
      catchError(this.handleError(`deleteUsers`))
    ) as any;
  }

  getAndSetLearnings(): void {
    this.getLearnings().subscribe((response) => {
      if (response) {
        console.log(response);
        this.setLearnings(response);
      }
    });
  }
}
