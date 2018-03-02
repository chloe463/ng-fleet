import {
  Component
} from '@angular/core';

@Component({
  selector: 'tooltip-demo',
  template: `
<div class="tooltip-demo">
  <span frTooltip
    class="tooltip"
    [message]="tooltipMessage"
    [position]="toolTipPosition">
    I have tooltip!
  </span>
  <fr-select
    [placeholder]="'Tooltip position'"
    [browserNative]="false"
    [(ngModel)]="toolTipPosition"
    style="display:inline-block;width: 240px;">
    <fr-option *ngFor="let position of positions" [value]="position" [label]="position"></fr-option>
  </fr-select>
</div>
  `,
  styles: [`
  .tooltip-demo {
    margin-left: 50px;
  }
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

  // public updatePosition(event): void {
  //   this.toolTipPosition = event.value;
  // }
}
