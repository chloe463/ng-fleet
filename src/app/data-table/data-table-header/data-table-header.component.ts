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

  private _title: string;
  private _otherActions: Array<IFrOtherAction> = [];

  @Input()
  set title(title) {
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  @Input()
  set otherActions(otherActions) {
    this._otherActions = otherActions;
  }

  get otherActions(): Array<IFrOtherAction> {
    return this._otherActions;
  }

  constructor() { }

  ngOnInit() {
  }

  public invokeUpdateAction(event: IFrUpdateAction) {
    this.updateAction.emit(event);
  }

}
