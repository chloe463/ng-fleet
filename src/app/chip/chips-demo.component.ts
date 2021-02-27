import { Component } from '@angular/core';

/* tslint:disable component-selector */
@Component({
  selector: 'chips-demo',
  template: `
<div>
  <h2>Chip component</h2>
  <fr-chip *ngFor="let chip of chips; let i = index" (dismiss)="removeChip(i)">
    {{chip.label}}
  </fr-chip>
  <fr-chip [on]="true">readOnly</fr-chip>
</div>
  `
})
export class ChipsDemoComponent {
  chips = [
    { label: 'chip1' },
    { label: 'chip2' },
    { label: 'chip3' },
    { label: 'chip4' },
    { label: 'chip5' }
  ];

  public removeChip(index: number): void {
    this.chips = [
      ...this.chips.slice(0, index),
      ...this.chips.slice(index + 1),
    ];
  }
}
