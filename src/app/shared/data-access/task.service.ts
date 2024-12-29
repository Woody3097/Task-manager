import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { ITask, TCreateTask } from '../intefaces/task.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);

  private destroy$: Subject<void> = new Subject<void>();

  // state
  private taskState$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    [],
  );
  tasks$: Observable<ITask[]> = this.taskState$.asObservable();

  // sources
  private loadTasks$: Observable<ITask[]> = this.apiService.getTasks$();
  add$: Subject<TCreateTask> = new Subject<TCreateTask>();

  constructor() {
    this.loadTasks$.pipe(take(1)).subscribe((tasks) => {
      this.taskState$.next(tasks);
    });

    // reducers
    this.add$
      .pipe(
        switchMap((newTask) => {
          return this.apiService.saveNewTask$(newTask).pipe(
            tap((id) => {
              this.addTask({ ...newTask, id });
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.router.navigateByUrl('task-list'));
  }

  private addTask(task: ITask): void {
    this.taskState$.next([task, ...this.taskState$.getValue()]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
