import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add-task',
    loadComponent: () =>
      import('./add-task/add-task.component').then((m) => m.AddTaskComponent),
  },
];
