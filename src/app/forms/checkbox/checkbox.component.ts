import {
    Component,
    Directive,
    OnInit,
    Input,
    ContentChildren,
    QueryList,
    forwardRef
} from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};

@Component({
    selector: 'fr-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: [],
    providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

    @Input() label;

    private _innerValue: any;
    private _onChangeCallback: (_: any) => void = noop;
    private _onTouchedCallback: () => void = noop;

    constructor() { }

    ngOnInit() {
        this.value = false;
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
    }
}
