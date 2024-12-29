import { Injectable } from '@angular/core';
import { delay, Observable, of, tap, throwError } from 'rxjs';

import {
  ITask,
  TCreateTask,
  TEditTask,
} from '../intefaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  saveNewTask$(newTask: TCreateTask): Observable<number> {
    const tasks = this.getTasksFromLocalStorage();

    const taskId = Date.now();
    const taskToSave = { ...newTask, id: Date.now() };

    return of(taskId).pipe(
      delay(150),
      tap(() => {
        localStorage.setItem('tasks', JSON.stringify([taskToSave, ...tasks]));
      }),
    );
  }

  editTask$(task: TEditTask): Observable<{ ok: boolean }> {
    const tasks = this.getTasksFromLocalStorage();

    let taskIndex = tasks.findIndex((task_) => task_.id === task.id);

    return of({ ok: true }).pipe(
      delay(150),
      tap(() => {
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...tasks[taskIndex], ...task.data };

          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }),
    );
  }

  removeTask$(id: number): Observable<{ ok: boolean }> {
    const tasks = this.getTasksFromLocalStorage();

    let taskIndex = tasks.findIndex((task) => task.id === id);

    return of({ ok: true }).pipe(
      delay(150),
      tap(() => {
        if (taskIndex !== -1) {
          localStorage.setItem(
            'tasks',
            JSON.stringify(tasks.filter((task) => task.id !== id)),
          );
        }
      }),
    );
  }

  getTasks$(): Observable<ITask[]> {
    return of(this.getTasksFromLocalStorage()).pipe(delay(300));
  }

  getTaskById(id: number): Observable<ITask> {
    const filteredTasks = this.getTasksFromLocalStorage().filter(
      (task) => task.id === id,
    );

    if (filteredTasks?.length) {
      return of(filteredTasks[0]).pipe(delay(200));
    } else {
      return throwError(() => console.error(`Task with id ${id} not found`));
    }
  }

  private getTasksFromLocalStorage(): ITask[] {
    const tasksFromDB = localStorage.getItem('tasks');
    return tasksFromDB ? JSON.parse(tasksFromDB) : [];
  }
}
