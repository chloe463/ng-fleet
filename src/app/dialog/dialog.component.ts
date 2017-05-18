import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  HostListener,
  EventEmitter,
  animate,
  trigger,
  style,
  state,
  transition
} from '@angular/core';

export interface IFrDialogActionKey {
  label: string;
  value: any;
};

@Component({
  selector: 'fr-dialog',
  templateUrl: './dialog.component.html',
  animations: [
    trigger('dialogState', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(.9)'
      })),
      state('shown', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('* => *', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class FrDialogComponent implements OnInit, OnChanges {

  private _show = false;
  public dialogState: string = 'hidden';

  @Input() actionKeys: Array<IFrDialogActionKey>;
  @Input() size: any;

  @Output() action     = new EventEmitter();
  @Output() showChange = new EventEmitter();

  constructor() { }

  @Input()
  get show(): boolean {
    return this._show;
  }

  set show(newValue) {
    this._show = newValue;
    this.showChange.emit(this._show);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.dialogState = this.show ? 'shown' : 'hidden';
  }

  public getStyle() {
    const windowWidth   = window.innerWidth;
    const windowHeight  = window.innerHeight;
    const contentWidth  = this.size.width;
    const contentHeight = this.size.height;

    const top  = window.pageYOffset + ((windowHeight / 2) - (contentHeight / 2)) + 'px';
    const left = window.pageXOffset + ((windowWidth/ 2) - (contentWidth / 2)) + 'px';

    return {
      top,
      left,
      width: contentWidth + 'px',
      height: contentHeight + 'px'
    };
  }

  public emit(actionValue): void {
    this.action.emit(actionValue);
    this.dismiss();
  }

  public dismiss(): void {
    this.dialogState = 'hidden';
    setTimeout(() => {
      this.show = false;
    }, 300);
  }

  @HostListener('window:keydown', ['$event'])
  public dismissOneEscape(event): void {
    if (event.key === 'Escape' && event.code === "Escape") {
      this.dismiss();
    }
  }
}
