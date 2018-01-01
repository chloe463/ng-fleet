import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  HostListener,
  EventEmitter
} from '@angular/core';
import {
  animate,
  trigger,
  style,
  state,
  transition
} from '@angular/animations';
import { timer } from 'rxjs/observable/timer';

export interface IFrDialogActionKey {
  label: string;
  value: any;
};

@Component({
  selector: 'fr-dialog',
  templateUrl: './dialog.component.html',
  exportAs: 'frDialog',
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
    console.warn('fr-dialog is is deprecated. Use FrDialogService instead.');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dialogState = this.show ? 'shown' : 'hidden';
  }

  public emit(actionValue): void {
    this.action.emit(actionValue);
    this.dismiss();
  }

  public dismiss(): void {
    this.dialogState = 'hidden';
    timer(300).subscribe(() => {
      this.show = false;
    })
  }

  @HostListener('window:keydown', ['$event'])
  public dismissOneEscape(event): void {
    if (event.key === 'Escape' && event.code === "Escape") {
      this.dismiss();
    }
  }

  public open(): void {
    this.show = true;
  }
  public close(): void {
    this.show = false;
  }
}
