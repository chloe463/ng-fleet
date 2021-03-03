import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FrDataTableEvent } from '../data-table/data-table.component';

export interface FrDataTableActionKey {
  key: string;
  label: string;
}

@Component({
  selector: 'fr-data-table-header',
  template: ''
})
export class FrDataTableHeaderComponent {

  @Output() updateAction: EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();
  @Output() otherAction:  EventEmitter<FrDataTableEvent> = new EventEmitter<FrDataTableEvent>();

  private _title?: string;

  @Input()
  set title(title) {
    this._title = title;
  }

  get title(): string {
    return this._title || "";
  }

  private _actionKeys: Array<FrDataTableActionKey> = [];
  @Input()
  set actionKeys(actionKeys: Array<FrDataTableActionKey>) {
    this._actionKeys = actionKeys;
  }

  get actionKeys(): Array<FrDataTableActionKey> {
    return this._actionKeys;
  }

}
