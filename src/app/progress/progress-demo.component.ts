import { Component } from '@angular/core';

/* tslint:disable component-selector */
@Component({
  selector: 'develop-area',
  template: `
<div class="container">
  <h2>Progress demo</h2>

  <h3>Spinner</h3>
  <fr-progress-spinner></fr-progress-spinner>

  <h3>Bar</h3>
  <fr-progress-bar></fr-progress-bar>
  
  <h3>Ripple</h3>
  <fr-progress-ripple size="96" duration="3000"></fr-progress-ripple>
</div>
  `
})
export class ProgressDemoComponent {
}
