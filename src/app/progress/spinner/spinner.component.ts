import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'fr-progress-spinner',
  template: `
<span class="fr-spinner">
  <svg viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg">
    <path class="fr-spinner__arc" d="M 90,0 a 90 90 0 1 1 -12,-45" fill="none"/>
  </svg>
</span>
  `
})
export class FrProgressSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
