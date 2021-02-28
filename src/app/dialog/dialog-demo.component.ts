import {
  Component,
  OnInit
} from '@angular/core';
import { FrDialogContext, FrDialogService } from 'francette';
import { Observer } from 'rxjs';

/* tslint:disable component-selector */
@Component({
    selector: 'dialog-demo',
    template: `
<h2>Dialog</h2>
  <button class="fr-btn fr-btn--primary" frRipple (click)="showDialog()">open dialog</button>
  <button class="fr-btn fr-btn--primary" frRipple (click)="popDialog()">pop dialog</button>
  <span>Result: {{result}}</span>
<fr-dialog-entry></fr-dialog-entry>
    `,
    providers: [ FrDialogService ]
})
export class DialogDemoComponent {

  public result = '';

  constructor (private dialogService: FrDialogService) {}

  public showDialog(): void {
    const dialogObserver: Observer<any> = {
      next:     val    => {
        this.result = JSON.stringify(val);
        console.log('onNext: ', val);
      },
      error:    reason => console.log('onError:', reason),
      complete: ()     => console.log('onComplete')
    };
    const extraParams = { title: 'Hi! I\'m a dialog!' };
    (this.dialogService as FrDialogService).open<any>(DialogDummyComponent, extraParams).subscribe(dialogObserver);
  }

  public popDialog(): void {
    const extraParams = { title: 'Hi! I\'m a dialog!' };
    this.dialogService.pop<any>(PopupDummyComponent, extraParams);
  }

  public dialogAction(event: Readonly<Event>): void {
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
      <button fr-flat-button (click)="ng()">NG</button>
      <button fr-flat-button (click)="ok()">OK</button>
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

@Component({
  selector: 'popup-dummy',
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
  `],
  template: `
  <div class="dummy-component">
    <div class="header">{{title}}</div>
  </div>
  `
})
export class PopupDummyComponent {
  constructor (private dialogContext: FrDialogContext<any>) {}

  get title(): string {
    return this.dialogContext.params.title;
  }

}
