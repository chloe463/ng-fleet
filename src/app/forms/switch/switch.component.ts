import {
  Component,
  OnInit,
  Input,
  forwardRef,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

export interface IFrSwitchLabels {
  on: string;
  off: string;
}

const noop = () => {};

export const SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrSwitchComponent),
  multi: true
};

@Component({
  selector: 'fr-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['switch.component.scss'],
  providers: [SWITCH_CONTROL_VALUE_ACCESSOR],
  animations: [
    trigger('rippleState', [
      state('on', style({})),
      state('off', style({})),
      transition('off => on', [
        style({ background: '#ff7d90' }),
        animate(800, keyframes([
          style({ opacity: 1, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 0.2, transform: 'scale(1)', offset: 0.4 }),
          style({ opacity: 0.05, transform: 'scale(1)', offset: 0.9 }),
          style({ opacity: 0, transform: 'scale(1)', offset: 1 })
        ]))
      ]),
      transition('on => off', [
        style({ background: 'rgba(0,0,0,.26)' }),
        animate(800, keyframes([
          style({ opacity: 1, transform: 'scale(0)', offset: 0 }),
          style({ opacity: 0.2, transform: 'scale(1)', offset: 0.4 }),
          style({ opacity: 0.05, transform: 'scale(1)', offset: 0.9 }),
          style({ opacity: 0, transform: 'scale(1)', offset: 1 })
        ]))
      ]),
    ])
  ]
})
export class FrSwitchComponent implements OnInit, ControlValueAccessor {

  @Input() labels: IFrSwitchLabels;

  @HostBinding('class.fr-switch-host') true;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: (_: any) => void = noop;

  public labelText: string;
  public ripple = 'off';

  constructor() { }

  ngOnInit() {
    this.changeLabel();
  }

  get value(): any {
    return this._innerValue;
  }

  set value(obj: any) {
    if (obj !== undefined && obj !== this._innerValue) {
      this._innerValue = obj;
      this.changeLabel();
      this._onChangeCallback(obj);
      this._onTouchedCallback(obj);
    }
  }

  writeValue(obj: any): void {
    if (obj !== undefined && obj !== this._innerValue) {
      this._innerValue = obj;
      this.changeLabel();
      this._onChangeCallback(obj);
      this._onTouchedCallback(obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  public toggle(): void {
    this.value = !this.value;
    this.ripple = this.value ? 'on' : 'off';
  }

  public changeLabel(): void {
    this.labelText = this.value ? this.labels.on : this.labels.off;
  }

}
