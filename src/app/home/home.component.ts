import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { map, Observable } from 'rxjs';

import { TaskService } from '../shared/data-access/task.service';
import { ETaskStatus } from '../shared/interfaces/task.interface';
import { TaskCardComponent } from '../shared/ui/task-card/task-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styles: [
    '.task-card-list {display: flex; gap: 16px; flex-wrap: wrap; justify-content: center}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private taskService = inject(TaskService);

  totalTasks$: Observable<number> = this.taskService.tasks$.pipe(
    map((tasks) => tasks.length),
  );
  pendingTasks$: Observable<number> = this.getTasksNumberByStatus(
    ETaskStatus.pending,
  );
  completedTasks$: Observable<number> = this.getTasksNumberByStatus(
    ETaskStatus.completed,
  );

  private getTasksNumberByStatus(status: ETaskStatus): Observable<number> {
    return this.taskService.tasks$.pipe(
      map((tasks) => tasks.filter((task) => task.status === status).length),
    );
  }
}
