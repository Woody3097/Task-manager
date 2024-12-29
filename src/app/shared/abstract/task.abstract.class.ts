import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../utils';
import { ETaskStatus } from '../intefaces/task.interface';
import { inject } from '@angular/core';
import { TaskService } from '../data-access/task.service';

export class TaskForm {
  protected taskService = inject(TaskService);
  protected fb = inject(FormBuilder);

  // Shared group for add/edit
  form: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required, noWhitespaceValidator]],
    description: [''],
    status: [ETaskStatus.pending, Validators.required],
  });

  // To avoid whitespace
  protected processFormData<T>(): T {
    const data = this.form.getRawValue();

    data.title = data.title.trim();
    data.description = data.description.trim();

    return data;
  }
}
