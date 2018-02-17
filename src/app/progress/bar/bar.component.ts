import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'fr-progress-bar',
  template: `
    <div class="fr-progress-bar">
      <div class="fr-progress-bar__background"></div>
      <div class="fr-progress-bar__first-bar"></div>
      <div class="fr-progress-bar__second-bar"></div>
    </div>
  `
})
export class FrProgressBarComponent implements OnInit {

  @HostBinding('class.fr-progress-bar-host') true;

  constructor() { }

  ngOnInit() {
  }

}
