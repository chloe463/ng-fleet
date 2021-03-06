import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
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

  @ViewChild('input', { static: true }) private input: ElementRef;

  private _innerValue: any;
  private _onChangeCallback: (_: any) => void = noop;
  private _onTouchedCallback: () => void = noop;
  private _isDisabled = false;

  public acceptRegexp: RegExp;
  public files: any[] = [];
  public fileOnArea = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.input.nativeElement.multiple = this.multiple;
    this.acceptRegexp = this.buildRegexp(this.accept);

    this.ngZone.runOutsideAngular(() => this.onDragEnter());
    this.ngZone.runOutsideAngular(() => this.onDragOver());
    this.ngZone.runOutsideAngular(() => this.onDragLeave());
    this.ngZone.runOutsideAngular(() => this.onDrop());
  }

  public buildRegexp(accept: string): RegExp {
    const replaced = accept.replace(/\*/g, '.*')
      .replace(/\+/g, '\\+')
      .replace(/\//g, '\\\/')
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

  public setUnit(size: number): string {
    const units: string[] = ['KB', 'MB', 'GB', 'TB', 'PB'];
    let transformed: number = size;
    let unit = 'B';
    for (let i = 0; i < units.length; ++i) {
      transformed = transformed / 1000;
      unit        = units[i] ? units[i] : 'PB';
      if (transformed < 1000) {
        break;
      }
    }
    return `${transformed.toFixed(1)} ${unit}`;
  }

  private isFileTypeAcceptable(fileType: string): boolean {
    return fileType.match(this.acceptRegexp) !== null;
  }

  public updateValue(files: File[]) {
    if (files.length === 0) {
      return;
    }
    if (!this.multiple && files.length > 1) {
      throw new Error('It does NOT accept multiple files');
    }
    this.files = [];
    const filteredFiles: File[] = [];
    Array.from(files).forEach((file: File): void => {
      if (!this.isFileTypeAcceptable(file['type'])) {
        throw new Error(`${file['type']} is NOT acceptable.\nPlease put ${this.accept} file(s).`);
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
    this._onTouchedCallback();
  }

  public onChange(event: any) {
    this.preventDefaults(event);
    this.updateValue(event.target.files);
    // this.value = event.target.files;
  }

  private preventDefaults(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragEnter() {
    this.renderer.listen(this.el.nativeElement, 'dragenter', (event) => {
      this.preventDefaults(event);
      this.fileOnArea = !this.disabled ? true : false;
    });
  }

  public onDragOver() {
    this.renderer.listen(this.el.nativeElement, 'dragover', (event) => {
      this.preventDefaults(event);
    });
  }

  public onDragLeave() {
    this.renderer.listen(this.el.nativeElement, 'dragleave', (event) => {
      this.preventDefaults(event);
      this.fileOnArea = false;
    });
  }

  public onDrop() {
    this.renderer.listen(this.el.nativeElement, 'drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.ngZone.run(() => {
        if (this.disabled) {
          alert('It is disabled');
          return;
        }
        const files = (event as DragEvent).dataTransfer?.files as unknown as File[] || [] as File[];
        // NOTE: Typecast for Safari
        this.updateValue(files);
        // this.value      = event.dataTransfer.files;
        this.fileOnArea = false;

        return false;
      });
    });
  }

}
