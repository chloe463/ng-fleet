import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'fr-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('tabState', [
      state('center', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('right', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('center => left', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('center => right', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('left => center', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ]),
      transition('right => center', [
        animate('500ms cubic-bezier(0.35, 0.25, 0, 1)')
      ])
    ]),
  ]
})
export class FrTabComponent implements OnInit {

  @HostBinding('class.fr-tab') tab = true;

  @Input() title: string = '';

  private _selected: boolean = false;
  private _state: string = 'inactive';

  constructor() { }

  ngOnInit() {
    this.selected = false;
    this.state = 'left';
  }

  @HostBinding('class.fr-tab--active')
  get selected(): boolean {
    return this._selected;
  }

  set selected(selected: boolean) {
    this._selected = selected;
  }

  @HostBinding('class.fr-tab--inactive')
  get inActive(): boolean {
    return !this._selected;
  }

  get state(): string {
    return this._state;
  }

  set state(newState: string) {
    this._state = newState;
  }
}
