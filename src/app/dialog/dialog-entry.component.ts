import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ComponentRef,
  Component,
  Directive,
  ViewChild,
  OnChanges,
  AfterViewInit,
  animate,
  trigger,
  style,
  state,
  transition,
  HostListener
} from '@angular/core';
import { FrDialogService } from './dialog.service';

@Directive({
  selector: '[fr-dialog-inner]'
})
export class FrDialogInnerDirective {
  constructor (public vcr: ViewContainerRef) { }
}

@Component({
  selector: 'fr-dialog-entry',
  template: `
<div class="fr-dialog" [hidden]="!isShow()">
  <div class="fr-dialog__body" [ngStyle]="getStyle()" [@dialogState]="dialogState" fr-dialog-inner>
  </div>
  <div class="fr-dialog__backdrop" (click)="dialog.close()"></div>
</div>
  `,
  animations: [
    trigger('dialogState', [
      state('void', style({ opacity: 0, transform: 'scale(.9)' })),
      transition(':enter', [
        style({ opacity: 1, transform: 'scale(.9)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(.9)' }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class FrDialogEntryComponent implements AfterViewInit {
  @ViewChild(FrDialogInnerDirective) private inner: FrDialogInnerDirective;

  private _dialogState: string = 'void';

  get dialogState(): string {
    return this.dialog.isShow() ? 'active' : 'void';
  }
  set dialogState(newState: string) {
    this._dialogState = newState;
  }

  constructor (private dialog: FrDialogService) {}

  ngAfterViewInit() {
    this.dialog.vcr = this.inner.vcr;
  }

  public isShow(): boolean {
    return this.dialog.isShow();
  }

  public getStyle() {
    const windowWidth   = window.innerWidth;
    const windowHeight  = window.innerHeight;
    const contentWidth  = this.dialog.size.width;
    const contentHeight = this.dialog.size.height;

    const top  = window.pageYOffset + ((windowHeight / 2) - (contentHeight / 2)) + 'px';
    const left = window.pageXOffset + ((windowWidth/ 2) - (contentWidth / 2)) + 'px';

    return {
      top,
      left,
      width: contentWidth + 'px',
      height: contentHeight + 'px'
    };
  }

  @HostListener('window:keydown', ['$event'])
  public dismissOnEscape(event): void {
    if (event.key === 'Escape' && event.code === "Escape") {
      this.dialog.close();
    }
  }
}
