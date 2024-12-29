import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskService } from '../shared/data-access/task.service';
import { ETaskStatus } from '../shared/intefaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgForOf, NgIf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly tasks$ = inject(TaskService).tasks$;

  protected readonly ETaskStatus = ETaskStatus;
}
