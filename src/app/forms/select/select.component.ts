import {
    Component,
    OnInit,
    Input,
    ContentChildren,
    QueryList,
    forwardRef
} from '@angular/core';
import { OptionComponent } from './option.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const SELECT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    selector: 'fr-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
    @Input() name;

    @ContentChildren(OptionComponent) _options: QueryList<OptionComponent>

    private _innerValue: any;
    private _onChangeCallback: (_:any) => void = noop;
    private _onTouchedCallback: () => void = noop;
    private _isDisabled: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    get value(): any {
        return this._innerValue;
    }

    set value(obj: any) {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
            this._onChangeCallback(obj);
        }
    }

    get disabled(): boolean {
        return this._isDisabled;
    }

    set disabled(isDisabled: boolean) {
        this._isDisabled = isDisabled;
    }

    writeValue(obj: any): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    setDisableState(isDisabled: boolean): void {
        this._isDisabled = isDisabled;
    }
}
