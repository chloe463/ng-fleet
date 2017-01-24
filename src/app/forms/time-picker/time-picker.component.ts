import {
    Component,
    OnInit,
    Input,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface ITime {
    hour: number,
    minute: number,
    second: number
}

const noop = () => {};

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
};

@Component({
  selector: 'fr-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {

    @Input() showSeconds: boolean;

    private _innerValue: any;
    private _onChangeCallback: (_: any) => void = noop;
    private _onTouchedCallback: () => void = noop;

    private _model: ITime;

    constructor() { }

    get value(): any {
        return this._innerValue;
    }

    set value(obj: any) {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
            this._onChangeCallback(obj);
        }
    }

    writeValue(obj: any): void {
        if (obj !== null && obj !== this._innerValue) {
            this._innerValue = obj;
            this._model = {
                hour: obj.hour,
                minute: obj.minute,
                second: obj.second
            };
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    setDisableState(isDisabled: boolean): void {
    }

    ngOnInit() {
        this._resetModel();
    }

    private _resetModel() {
        const now   = new Date();
        this._model = {
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        };
        this.value = this._model;
    }

    private _change() {
        this.value = {
            hour: this._model.hour,
            minute: this._model.minute,
            second: this._model.second
        };
    }

    /**
     * Add 1 hour
     */
    private _addHour() {
        this._model.hour = (this._model.hour + 1) % 24;
        this._change();
    }

    /**
     * Subtract 1 hour
     */
    private _subHour() {
        this._model.hour = (this._model.hour - 1 + 24) % 24;
        this._change();
    }

    /**
     * Add 1 minute
     */
    private _addMinute() {
        this._model.minute = (this._model.minute + 1) % 60;
        this._change();
    }

    /**
     * Subtract 1 minute
     */
    private _subMinute() {
        this._model.minute = (this._model.minute - 1 + 60) % 60;
        this._change();
    }

    /**
     * Add 1 second
     */
    private _addSecond() {
        this._model.second = (this._model.second + 1) % 60;
        this._change();
    }

    /**
     * Subtract 1 second
     */
    private _subSecond() {
        this._model.second = (this._model.second - 1 + 60) % 60;
        this._change();
    }
}
