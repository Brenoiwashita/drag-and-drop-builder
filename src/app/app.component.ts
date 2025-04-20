import { Component } from '@angular/core';
import { BuilderComponent } from './components/builder/builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BuilderComponent],
  template: `<app-builder />`,
})
export class AppComponent {}