import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Input
} from '@angular/core';
import {FrTabComponent} from './tab.component';

@Component({
  selector: 'fr-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: []
})
export class FrTabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(FrTabComponent) _tabs: QueryList<FrTabComponent>;

  private _current: {index: number, tab: FrTabComponent};

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.select(this._tabs.first);
  }

  public select(tab: FrTabComponent): void {
    this._tabs.forEach((_tab: FrTabComponent, _index: number) => {
      _tab.selected = false;
      if (tab === _tab) {
        _tab.selected = true;
        _tab.state    = 'center';
        this._current = {index: _index, tab: _tab};
      }
    });
    this._tabs.forEach((_tab: FrTabComponent, _index: number) => {
      if (this._current.index < _index) {
        _tab.state = 'right';
      } else if (this._current.index > _index) {
        _tab.state = 'left';
      }
    });
  }
}
