import {
  Component,
  OnInit,
  AfterContentInit,
  OnChanges,
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
export class FrTabsComponent implements OnInit, AfterContentInit, OnChanges {

  @ContentChildren(FrTabComponent) _tabs: QueryList<FrTabComponent>;

  @Input() selectedIndex = 0;

  private _current: {index: number, tab: FrTabComponent};

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.select(this.selectedIndex === 0 ? this._tabs.first : this._tabs.toArray()[this.selectedIndex]);
  }

  ngOnChanges(changes) {
    if (this._tabs !== undefined) {
      this.select(this._tabs.toArray()[changes.selectedIndex.currentValue]);
    }
  }

  public select(tab: FrTabComponent): void {
    let state = 'left';
    this._tabs.forEach((_tab: FrTabComponent, _index: number) => {
      _tab.state    = state;
      _tab.selected = false;
      if (tab === _tab) {
        _tab.selected = true;
        _tab.state    = 'center';
        this._current = {index: _index, tab: _tab};
        state         = 'right';
        this.selectedIndex = _index;
      }
    });
  }
}
