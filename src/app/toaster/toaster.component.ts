import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  animate,
  trigger,
  state,
  style,
  transition,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'fr-toaster',
  templateUrl: './toaster.component.html',
  animations: [
    trigger('toastState', [
      state('hidden', style({
        transform: 'translate3d(0, 100%, 0)'
      })),
      state('shown', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('* => *', [
        animate('400ms ease')
      ])
    ])
  ]
})
export class FrToasterComponent implements OnInit, OnChanges {

  private _show = false;
  public toastState: string = 'hidden';

  @Input() actionKey: string;

  @Output() showChange = new EventEmitter();
  @Output() action = new EventEmitter();

  @ViewChild('toast') toastElement;
  public size: any;

  constructor() { }

  @Input()
  get show() {
    return this._show;
  }

  set show(newValue) {
    this._show = newValue;
    this.showChange.emit(this._show);
  }

  ngOnInit() {
    this.size = {
      width: this.toastElement.nativeElement.clientWidth,
      height: this.toastElement.nativeElement.clientHeight
    };
  }

  ngOnChanges() {
    this.toastState = this.show ? 'shown' : 'hidden';
    if (this.show) {
      setTimeout(() => {
        this.toastState = 'hidden';
        this.show       = false;
      }, 5000);
    }
  }

  public getStyle() {
    const windowWidth = window.innerWidth;
    const left = window.pageXOffset + ((windowWidth / 2) - (this.size.width / 2)) + 'px';
    return { left };
  }

  public emitAction(): void {
    this.action.emit(this.actionKey);
  }

}
