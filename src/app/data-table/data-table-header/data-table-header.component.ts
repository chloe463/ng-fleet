import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

export interface IFrUpdateAction {
  action: string;
  rows: Array<any>;
}

export interface IFrOtherAction {
  key: string;
  label: string;
}

@Component({
  selector: 'fr-data-table-header',
  templateUrl: './data-table-header.component.html'
})
export class FrDataTableHeaderComponent implements OnInit {

  @Output() updateAction = new EventEmitter();
  @Output() otherAction  = new EventEmitter();

  private _title: string;
  private _otherActionKeys: Array<IFrOtherAction> = [];

  @Input()
  set title(title) {
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  @Input()
  set otherActionKeys(otherActionKeys) {
    this._otherActionKeys = otherActionKeys;
  }

  get otherActionKeys(): Array<IFrOtherAction> {
    return this._otherActionKeys;
  }

  constructor() { }

  ngOnInit() {
  }

  public invokeUpdateAction(event: IFrUpdateAction) {
    this.updateAction.emit(event);
  }

  public invokeOtherAction(event: IFrUpdateAction) {
    this.otherAction.emit(event);
  }

}
