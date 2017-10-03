# Dialog

## Usage

### Example1 (Use FrDialogService)

```ts
@Component({
    selector: 'dialog-demo',
    template: `
<button class="fr-btn fr-btn--primary" frRipple (click)="showDialog()">SHOW DIALOG</button>
<fr-dialog-entry></fr-dialog-entry>
    `,
    providers: [ FrDialogService ]
})
export class DialogDemoComponent {

  constructor (private dialogService: FrDialogService) {}

  public showDialog(): void {
    const dialogObserver: Observer<any> = {
      next:     val    => console.log('onNext: ', val),
      error:    reason => console.log('onError:', reason),
      complete: ()     => console.log('onComplete')
    };
    this.dialogService.open<any>(DialogDummyComponent).subscribe(dialogObserver);
  }
}

// You must put this component to `entryComponents` of NgModule
@Component({
  selector: 'dialog-dummy-component',
  template: `Template within the dialog goes here`,
})
export class DialogDummyComponent {
  constructor (private _context: FrDialogContext<any>) { }

  onNext(): void {
    this._context.next({ message: 'onNext' });
  }

  onError(): void {
    this._context.error({ message: 'onError' });
  }
}
```


### Example2 (Deprecated way)

```ts
@Component({
    selector: 'dialog-demo',
    template: `
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
```
