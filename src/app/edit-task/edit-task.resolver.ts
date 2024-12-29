import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { catchError, EMPTY, Observable } from 'rxjs';

import { ITask } from '../shared/interfaces/task.interface';
import { TaskService } from '../shared/data-access/task.service';

@Injectable({
  providedIn: 'root',
})
export class EditTaskResolver implements Resolve<ITask> {
  private taskService = inject(TaskService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<ITask> {
    const task = this.taskService.getTaskById(+route.params['taskId']);

    return task.pipe(
      catchError(() => {
        this.router.navigateByUrl('');
        return EMPTY;
      }),
    );
  }
}
