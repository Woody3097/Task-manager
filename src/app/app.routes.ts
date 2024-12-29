import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add-task',
    loadComponent: () =>
      import('./add-task/add-task.component').then((m) => m.AddTaskComponent),
  },
  {
    path: 'task-list',
    loadComponent: () =>
      import('./task-list/task-list.component').then(
        (m) => m.TaskListComponent,
      ),
  },
];
