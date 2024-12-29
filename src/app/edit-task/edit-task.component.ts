import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';

import { take } from 'rxjs';

import { TaskFormComponent } from '../shared/ui/task-form/task-form.component';
import { TaskForm } from '../shared/abstract/task.abstract.class';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, TaskFormComponent],
  templateUrl: './edit-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent extends TaskForm implements OnInit {
  private route = inject(ActivatedRoute);

  taskId!: number;

  constructor() {
    super();
  }

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe((res) => {
      this.form.patchValue(res['task']);
      this.taskId = res['task'].id;
    });
  }

  editTask(): void {
    this.taskService.edit$.next({
      id: this.taskId,
      data: this.processFormData(),
    });
  }
}
