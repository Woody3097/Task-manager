import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { ITask, TCreateTask, TEditTask } from '../interfaces/task.interface';
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
  edit$: Subject<TEditTask> = new Subject<TEditTask>();
  remove$: Subject<ITask['id']> = new Subject<ITask['id']>();

  constructor() {
    // Initial load
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

    this.edit$
      .pipe(
        switchMap((task) => {
          return this.apiService.editTask$(task).pipe(
            tap(() => {
              this.editTask(task);
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.router.navigateByUrl('task-list'));

    this.remove$
      .pipe(
        switchMap((id) => {
          return this.apiService.removeTask$(id).pipe(
            tap(() => {
              this.removeTask(id);
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  getTaskById(id: number): Observable<ITask> {
    const stateTask = this.taskState$.getValue().find((task) => task.id === id);

    if (stateTask) {
      return of(stateTask);
    } else {
      return this.apiService.getTaskById(id);
    }
  }

  private addTask(task: ITask): void {
    this.taskState$.next([task, ...this.taskState$.getValue()]);
  }

  private editTask(task: TEditTask): void {
    const currentTasks = this.taskState$.getValue();

    this.taskState$.next(
      currentTasks.map((task_) => {
        if (task_.id === task.id) {
          return { ...task_, ...task.data };
        } else {
          return task_;
        }
      }),
    );
  }

  private removeTask(id: number): void {
    const currentTasks = this.taskState$.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== id);

    this.taskState$.next(updatedTasks);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
