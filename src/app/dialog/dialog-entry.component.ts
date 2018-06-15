import {
  ViewContainerRef,
  Component,
  Directive,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { FrDialogService } from './dialog.service';

@Directive({
  selector: '[frDialogInner]'
})
export class FrDialogInnerDirective {
  constructor (public vcr: ViewContainerRef) { }
}

@Component({
  selector: 'fr-dialog-entry',
  template: `
<div class="fr-dialog">
  <div class="fr-dialog__wrapper">
    <div class="fr-dialog__body" [@dialogState]="dialogState" frDialogInner></div>
    <div class="fr-dialog__backdrop" [hidden]="!isShow()" (click)="dialog.close()"></div>
  </div>
</div>
  `,
  styleUrls: ['./dialog-entry.component.scss'],
  animations: [
    trigger('dialogState', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(15%) scale(.95)'
      })),
      state('active', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => active', [
        animate('300ms ease-out'),
      ]),
      transition('active => void', [
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'translateY(15%) scale(1)'
        }))
      ])
    ])
  ]
})
export class FrDialogEntryComponent implements AfterViewInit {
  @ViewChild(FrDialogInnerDirective) public inner: FrDialogInnerDirective;

  private _dialogState = 'void';

  get dialogState(): string {
    return this.dialog.isShow() ? 'active' : 'void';
  }
  set dialogState(newState: string) {
    this._dialogState = newState;
  }

  constructor (public dialog: FrDialogService) {}

  ngAfterViewInit() {
    this.dialog.vcr = this.inner.vcr;
  }

  public isShow(): boolean {
    return this.dialog.isShow();
  }

  @HostListener('window:mousedown', ['$event'])
  public dismissOnClick(event: Event): void {
    if (this.dialog.isShow() && !this.inner.vcr.element.nativeElement.contains(event.target)) {
      this.dialog.close();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public dismissOnEscape(event): void {
    if (this.dialog.isShow() && event.key === 'Escape' && event.code === 'Escape') {
      this.dialog.close();
    }
  }
}
