import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskService } from '../shared/data-access/task.service';
import { ETaskStatus, ITask } from '../shared/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgForOf, NgIf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  readonly tasks$ = this.taskService.tasks$;

  protected readonly ETaskStatus = ETaskStatus;

  removeTask(id: number): void {
    if (confirm('Are you sure to remove?')) {
      this.taskService.remove$.next(id);
    }
  }

  changeTaskStatus(task: ITask, status: ETaskStatus): void {
    this.taskService.edit$.next({ id: task.id, data: { status } });
  }
}
