import { Component } from '@angular/core';

/* tslint:disable component-selector */
@Component({
  selector: 'develop-area',
  template: `
  <h1>Progress demo</h1>
  <h2>Spinner</h2>
  <fr-progress-spinner></fr-progress-spinner>
  <h2>Bar</h2>
  <fr-progress-bar></fr-progress-bar>
  `
})
export class ProgressDemoComponent {
}
