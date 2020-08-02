import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Observer } from "rxjs";
import {
  FrButtonModule,
  FrDialogContext,
  FrDialogModule,
  FrDialogService,
  FrFormsModule
} from "../src/app";

/* tslint:disable component-selector */
@Component({
  selector: "dialog-demo",
  template: `
<button class="fr-btn fr-btn--primary" frRipple (click)="showDialog()">open dialog</button>
<span *ngIf="hasResult">Result: {{result}}</span>
<fr-dialog-entry></fr-dialog-entry>
    `,
  providers: [FrDialogService],
})
class DialogDemoComponent1 {
  result: string;

  constructor(private dialogService: FrDialogService) { }

  get hasResult(): boolean {
    return this.result && Object.keys(this.result).length > 0;
  }

  public showDialog(): void {
    const dialogObserver: Observer<any> = {
      next: (val) => {
        this.result = JSON.stringify(val);
        console.log("onNext: ", val);
      },
      error: (reason) => console.log("onError:", reason),
      complete: () => console.log("onComplete"),
    };
    const extraParams = { title: "Hi! I'm a dialog!" };
    this.dialogService.open<any>(DialogDummyComponent, extraParams).subscribe(
      dialogObserver,
    );
  }
}

/* tslint:disable component-selector */
@Component({
  selector: "dialog-demo",
  template: `
<button class="fr-btn fr-btn--primary" frRipple (click)="popDialog()">pop dialog</button>
<fr-dialog-entry></fr-dialog-entry>
    `,
  providers: [FrDialogService],
})
class DialogDemoComponent2 {
  result: string;

  constructor(private dialogService: FrDialogService) { }

  public popDialog(): void {
    const extraParams = { title: "Hi! I'm a dialog!" };
    this.dialogService.pop<any>(PopupDummyComponent, extraParams);
  }
}

@Component({
  selector: "dialog-dummy",
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
  `,
})
class DialogDummyComponent implements OnInit {
  constructor(private dialogContext: FrDialogContext<any>) { }

  public text = "";
  public title = "";

  ngOnInit() {
    this.title = this.dialogContext.params.title;
  }

  ok(): void {
    this.dialogContext.next({ message: "ok", text: this.text });
  }
  ng(): void {
    this.dialogContext.error({ message: "ng", text: this.text });
  }
}

@Component({
  selector: "popup-dummy",
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
  `,
})
class PopupDummyComponent {
  constructor(private dialogContext: FrDialogContext<any>) { }

  get title(): string {
    return this.dialogContext.params.title;
  }
}

export default {
  title: "DialogService",
};

const moduleMetadata = {
  declarations: [
    DialogDummyComponent,
    PopupDummyComponent,
  ],
  entryComponents: [
    DialogDummyComponent,
    PopupDummyComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FrDialogModule,
    FrButtonModule,
    FrFormsModule,
  ],
};

export const open = () => ({
  component: DialogDemoComponent1,
  moduleMetadata,
});

export const pop = () => ({
  component: DialogDemoComponent2,
  moduleMetadata,
});
