import {
  Component,
  Directive,
  Inject,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  OnInit,
  OnChanges,
  AfterViewInit,
  animate,
  trigger,
  style,
  state,
  transition,
  HostListener
} from '@angular/core';
import { FrToasterService, FrToasterContext } from './toaster.service';

@Directive({
  selector: '[fr-toaster-inner]'
})
export class FrToasterInnerDirective {
  constructor (public vcr: ViewContainerRef) { }
}

@Component({
  selector: 'fr-toaster-entry',
  template: `
<div class="fr-toaster__container">
  <div fr-toaster-inner></div>
</div>
  `,
  styles: [`
  .fr-toaster__container {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: center;
  }
  [fr-toaster-inner] {
    color: #FFFFFF;
    border-radius: 2px;
  }
  `],
  animations: []
})
export class FrToasterEntryComponent implements AfterViewInit {
  @ViewChild(FrToasterInnerDirective) public inner: FrToasterInnerDirective;

  private _toasterState: string = 'void';

  get toasterState(): string {
    return this.toaster.isShow() ? 'active' : 'void';
  }

  set toasterState(newState) {
    this._toasterState = newState;
  }

  constructor (@Inject(forwardRef(() => FrToasterService)) public toaster: FrToasterService) {}

  ngAfterViewInit() {
    this.toaster.vcr = this.inner.vcr;
  }

  public isShow(): boolean {
    return this.toaster.isShow();
  }
}

@Component({
  selector: 'fr-toaster-content',
  template: `
<div class="fr-toaster__content-wrapper" [@toasterState]="toasterState">
  <div class="fr-toaster__content">
    {{text}}
  </div>
  <div class="fr-toaster__action" (click)="emitAction()">
    {{action}}
  </div>
</div>
  `,
  styles: [`
  .fr-toaster__content-wrapper {
    background: #323232;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    min-width: 288px;
    max-width: 568px;
  }
  `],
  animations: [
    trigger('toasterState', [
      state('void', style({
        transform: 'translateY(100%)'
      })),
      state('active', style({
        transform: 'translateY(0%)'
      })),
      transition('* => *', [
        animate('300ms ease-out')
      ]),
    ])
  ]
})
export class FrToasterContentComponent<T> implements OnInit {
  public text: string = '';
  public action: string = '';
  public timeout: number = 500;
  public closed: boolean = false;
  public toasterState = 'void';
  constructor (@Inject(forwardRef(() => FrToasterContext)) private _context: FrToasterContext<T>) {
    this.text    = this._context.text;
    this.action  = this._context.action;
    this.timeout = this._context.timeout;
  }

  public emitAction(): void {
    this.closed = true;
    this._context.next();
  }

  ngOnInit() {
    this.toasterState = 'active';

    // This is for animation
    setTimeout(() => {
      if (!this.closed) {
        this.toasterState = 'void';
      }
    }, this.timeout - 300);

    // Close toaster after `timeout` milliseconds
    setTimeout(() => {
      if (!this.closed) {
        this._context.complete();
      }
    }, this.timeout);
  }
}
