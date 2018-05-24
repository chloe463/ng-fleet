import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'fr-progress-bar',
  template: `
    <div class="fr-progress-bar">
      <div class="fr-progress-bar__background"></div>
      <div class="fr-progress-bar__first-bar" [ngStyle]="{'background-color': color}"></div>
      <div class="fr-progress-bar__second-bar" [ngStyle]="{'background-color': color}"></div>
    </div>
  `,
  styleUrls: ['./bar.component.scss']
})
export class FrProgressBarComponent {

  @HostBinding('class.fr-progress-bar-host') true;

  @Input() color = '#4E4F97';

}
