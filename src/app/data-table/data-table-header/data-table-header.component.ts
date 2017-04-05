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

@Component({
  selector: 'fr-data-table-header',
  templateUrl: './data-table-header.component.html'
})
export class FrDataTableHeaderComponent implements OnInit {

  @Output() updateAction = new EventEmitter();

  private _title: string;

  @Input()
  set title(title) {
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  constructor() { }

  ngOnInit() {
  }

  public invokeUpdateAction(event: IFrUpdateAction) {
    this.updateAction.emit(event);
  }

}
