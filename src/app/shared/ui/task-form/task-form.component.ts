import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { ETaskStatus } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  taskStatuses: string[] = Object.values(ETaskStatus);

  get titleControl(): AbstractControl {
    return this.formGroup.get('title') as AbstractControl;
  }
}
