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
import { Observer } from 'rxjs/Observer';

/* tslint:disable component-selector */
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
    const dialogObserver: Observer<any> = {
      next:     val    => console.log('onNext: ', val),
      error:    reason => console.log('onError:', reason),
      complete: ()     => console.log('onComplete')
    };
    const extraParams = { title: 'Hi! I\'m a dialog!' };
    this.dialogService.open<any>(DialogDummyComponent, extraParams).subscribe(dialogObserver);
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
    <div class="header">{{title}}</div>
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
export class DialogDummyComponent implements OnInit {
  constructor (private dialogContext: FrDialogContext<any>) {}

  public text = '';
  public title = '';

  ngOnInit() {
    this.title = this.dialogContext.params.title;
  }

  ok(): void {
    this.dialogContext.next({ message: 'ok', text: this.text });
  }
  ng(): void {
    this.dialogContext.error({ message: 'ng', text: this.text });
  }
}
