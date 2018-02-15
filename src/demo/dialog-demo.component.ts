import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FrDialogService, FrDialogContext } from './../app/dialog/dialog.service';
import { Observer } from 'rxjs/Observer';

/* tslint:disable component-selector */
@Component({
    selector: 'dialog-demo',
    template: `
<h1>Dialog</h1>
<button class="fr-btn fr-btn--primary" frRipple (click)="showDialog()">dialog</button>
  <span>Result: {{result}}</span>
<fr-dialog-entry></fr-dialog-entry>
    `,
    providers: [ FrDialogService ]
})
export class DialogDemoComponent {

  result: string;

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
