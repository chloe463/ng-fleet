import {
  Component
} from '@angular/core';

@Component({
  /* tslint:disable:component-selector */
  selector: 'tooltip-demo',
  templateUrl: './tooltip-demo.component.html',
  styles: [`
  .tooltip {
    display: inline-block;
    margin: 24px;
    padding: 12px;
  }
  `]
})
export class TooltipDemoComponent {
  public tooltipMessage = 'I\'m tooltip!';
  public positions = [ 'above', 'left', 'below', 'right' ];
  public toolTipPosition = 'above';
}
