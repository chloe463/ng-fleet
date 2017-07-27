import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FrDataTableEvent } from '../data-table/data-table.component';

export interface IFrOtherAction {
  key: string;
  label: string;
}

@Component({
  selector: 'fr-data-table-header',
  templateUrl: './data-table-header.component.html'
})
export class FrDataTableHeaderComponent {

  @Output() updateAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();
  @Output() otherAction:  EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

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

  public invokeUpdateAction(event: FrDataTableEvent): void {
    this.updateAction.emit(event);
  }

  public invokeOtherAction(event: FrDataTableEvent): void {
    this.otherAction.emit(event);
  }

}
