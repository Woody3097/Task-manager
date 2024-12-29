import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
