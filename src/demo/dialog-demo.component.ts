import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dialog-demo',
    template: `
<h1>Dialog</h1>
<fr-dialog
  [(show)]="showDialog"
  [size]="dialogSize"
  [actionKeys]="actionKeys"
  (action)="dialogAction($event)">
  <div style="margin: 15px">Dialog Content</div>
</fr-dialog>
<button class="fr-btn fr-btn--primary" frRipple (click)="toggleDialog()">toggle dialog</button>
    `
})

export class DialogDemoComponent {

  showDialog = false;
  dialogSize = { width: 500, height: 300 };
  actionKeys = [
    { label: 'NG', value: 'ng' },
    { label: 'OK', value: 'ok' }
  ];

  public toggleDialog(): void {
    this.showDialog = !this.showDialog;
  }

  public dialogAction(event): void {
    console.log(event);
  }

}