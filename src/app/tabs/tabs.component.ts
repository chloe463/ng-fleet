import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Input
} from '@angular/core';
import {TabComponent} from './tab.component';

@Component({
  selector: 'fr-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: []
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

  private _current: {index: number, tab: TabComponent};

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._select(this._tabs.first);
  }

  private _select(tab: TabComponent): void {
    this._tabs.forEach((_tab: TabComponent, _index: number) => {
      _tab.selected = false;
      if (tab === _tab) {
        _tab.selected = true;
        _tab.state    = 'center';
        this._current = {index: _index, tab: _tab};
      }
    });
    this._tabs.forEach((_tab: TabComponent, _index: number) => {
      if (this._current.index < _index) {
        _tab.state = 'right';
      } else if (this._current.index > _index) {
        _tab.state = 'left';
      }
    });
  }
}
