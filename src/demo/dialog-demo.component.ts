import {
  Component,
  OnInit,
  OnDestroy,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/core';
import { FrDialogService, FrDialogContext } from './../app/dialog/dialog.service';

@Component({
    selector: 'dialog-demo',
    template: `
<h1>Dialog</h1>
<button class="fr-btn fr-btn--primary" frRipple (click)="d.open()">test</button>
<button class="fr-btn fr-btn--primary" frRipple (click)="toggleDialog()">toggle dialog</button>
<button class="fr-btn fr-btn--primary" frRipple (click)="toggleDialogWithService()">toggle dialog with service</button>
  <div style="display:block;width:100%;height:1080px"></div>
<fr-dialog-entry></fr-dialog-entry>
<fr-dialog
  [(show)]="showDialog"
  [size]="dialogSize"
  [actionKeys]="actionKeys"
  (action)="dialogAction($event)"
  #d="frDialog">
  <div style="margin: 15px">Dialog Content</div>
</fr-dialog>
    `,
    providers: [ FrDialogService ]
})
export class DialogDemoComponent implements OnInit {

  showDialog = false;
  dialogSize = { width: 500, height: 300 };
  actionKeys = [
    { label: 'NG', value: 'ng' },
    { label: 'OK', value: 'ok' }
  ];

  constructor (private dialogService: FrDialogService) {}

  ngOnInit() {
    console.log(this);
  }

  public toggleDialog(): void {
    this.showDialog = !this.showDialog;
  }

  public toggleDialogWithService(): void {
    const dialogSize = { width: 300, height: 300 };
    this.dialogService.open<any>(DialogDummyComponent, dialogSize).then((v) => {
      console.log(v);
    }).catch((v) => {
      console.log(v);
    });
  }

  public dialogAction(event): void {
    console.log(event);
  }

}

@Component({
  selector: 'dialog-dummy',
  styles: [`
    .dummy-component {
      display: block;
      margin: auto;
      background: #FFFFFF;
    }
    .header {
      font-size: 18px;
      padding: 20px;
    }
    .content {
      width: 80%;
      margin: 15px auto;
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  `],
  template: `
  <div class="dummy-component">
    <div class="header">Hi! I am a dialog!</div>
    <div class="content">
      <fr-input-text-container>
        <input frInput placeholder="name" type="text" [(ngModel)]="text">
      </fr-input-text-container>
    </div>
    <div class="buttons">
      <button fr-flat-button (click)="ok()">OK</button>
      <button fr-flat-button (click)="ng()">NG</button>
    </div>
  </div>
  `
})
export class DialogDummyComponent {
  constructor (private dialogContext: FrDialogContext) {}

  public text: string = '';

  ok(): void {
    this.dialogContext.resolve({ message: 'ok', text: this.text });
  }
  ng(): void {
    this.dialogContext.reject('ng');
  }
}
