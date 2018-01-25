import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  DefaultValueAccessor,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

export class FrInputFileChange {
  source: FrInputFileComponent;
  value: any;
}

const noop = () => {};

export const INPUT_FILE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrInputFileComponent),
  multi: true
};

@Component({
  selector: 'fr-input-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers: [INPUT_FILE_CONTROL_VALUE_ACCESSOR]
})
export class FrInputFileComponent implements OnInit, ControlValueAccessor {

  @Input() name = '';
  @Input() accept = '';
  @Input() multiple = false;
  @Input() dropArea = true;

  @Output() change: EventEmitter<FrInputFileChange> = new EventEmitter<FrInputFileChange>();

  @ViewChild('input') private input: ElementRef;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  private acceptRegex: RegExp;
  public files: any[] = [];
  public fileOnArea = false;

  constructor() { }

  ngOnInit() {
    this.input.nativeElement.multiple = this.multiple;
    this.acceptRegex = this.buildRegexp(this.accept);
  }

  private buildRegexp(accept: string): RegExp {
    const replaced = accept.replace(/\*/g, '.*')
      .replace(/\+/g, '\\+')
      .replace(/\//g, '\/')
      .replace(/,/g, '|');
    return new RegExp(replaced);
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
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  set disabled(isDisabled) {
    this._isDisabled = isDisabled;
  }

  get disabled() {
    return this._isDisabled;
  }

  public needDropArea(): boolean {
    return this.disabled === false && this.dropArea === true;
  }

  public emitChange(): void {
    const event = new FrInputFileChange();
    event.source = this;
    event.value  = this.value;
    this.change.emit(event);
  }

  private setUnit(size: number): string {
    const units: string[] = ['KB', 'MB', 'GB', 'TB', 'PB'];
    let transformed: number = size;
    let unit = 'B'
    for (let i = 0; i < unit.length; ++i) {
      transformed = transformed / 1000;
      unit        = units[i] ? units[i] : 'PB';
      if (transformed < 1000) {
        break;
      }
    }
    return `${transformed.toFixed(1)} ${unit}`;
  }

  private isFileTypeAcceptable(fileType): boolean {
    return fileType.match(this.acceptRegex);
  }

  public updateValue(files) {
    if (files.length === 0) {
      return;
    }
    if (!this.multiple && files.length > 1) {
      alert('It does NOT accept multiple files');
      return;
    }
    this.files = [];
    const filteredFiles: File[] = [];
    Array.from(files).forEach((file: File): void => {
      if (!this.isFileTypeAcceptable(file['type'])) {
        alert(`${file['type']} is NOT acceptable.\nPlease put ${this.accept} file(s).`);
        return;
      }
      filteredFiles.push(file);
      this.files.push({
        name: file.name,
        type: file.type,
        size: this.setUnit(file.size)
      });
    });
    this.value = filteredFiles;
    this.emitChange();
  }

  public onChange(event) {
    this.preventDefaults(event);
    this.updateValue(event.target.files);
    // this.value = event.target.files;
  }

  private preventDefaults(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent) {
    this.preventDefaults(event);
    this.fileOnArea = !this.disabled ? true : false;
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    this.preventDefaults(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent) {
    this.preventDefaults(event);
    this.fileOnArea = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      alert('It is disabled');
      return;
    }
    this.updateValue(event.dataTransfer.files);
    // this.value      = event.dataTransfer.files;
    this.fileOnArea = false;

    return false;
  }

}
