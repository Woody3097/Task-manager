import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { TaskFormComponent } from '../shared/ui/task-form/task-form.component';
import { TaskForm } from '../shared/abstract/task.abstract.class';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, TaskFormComponent, TaskFormComponent],
  templateUrl: './add-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent extends TaskForm {
  constructor() {
    super();
  }

  saveNewTask(): void {
    this.taskService.add$.next(this.processFormData());
  }
}
