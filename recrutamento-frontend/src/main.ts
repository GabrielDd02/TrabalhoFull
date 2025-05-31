import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Corrigido para importar AppComponent

bootstrapApplication(AppComponent, appConfig) // Corrigido para usar AppComponent
  .catch((err) => console.error(err));

