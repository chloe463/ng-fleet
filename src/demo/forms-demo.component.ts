import { Component } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

/* tslint:disable component-selector */
@Component({
  selector: 'forms-demo',
  styles: [`
    table {
      width: 80%;
      margin: 24px auto;
    }
    tr {
      height: 70px;
    }
    .buttons {
      display: flex;
      justify-content: space-around;
    }
  `],
  templateUrl: './forms-demo.component.html'
})
export class FormsDemoComponent {
  formGroup: FormGroup;
  radios = [
    { label: 'number', value: 1 },
    { label: 'string', value: 2 },
    { label: 'Array',  value: [1, 2, 3] },
    { label: 'Object', value: { key: 'value' } }
  ];
  checkboxes = [
    { name: 'check1' },
    { name: 'check2' },
    { name: 'check3' }
  ];
  options = [
    { label: 'Option1 number', value: 1 },
    { label: 'Option2 string', value: 'string' },
    { label: 'Option3 Array',  value: [1, 2, 3] },
    { label: 'Option4 Object', value: { key: 'value' } }
  ];

  constructor(private fb: FormBuilder) {
    this.resetFormGroup();
  }

  public resetFormGroup() {
    this.formGroup = this.fb.group({
      file: [],
      text: ['', Validators.required],
      select: '',
      radio: '',
      checkboxes: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ]),
      switch: false,
      date: new Date(),
      textArea: ''
    });
  }

  public onSubmit() {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
    return false;
  }

  public onFileChange(event): void {
    console.log(event);
  }

  public onSelectChange(event: Event): void {
    console.log(event);
  }

  public onRadioChange(event: Event): void {
    console.log(event);
  }

  public onCheckboxChange(event: Event): void {
    console.log(event);
  }

  public onDatePickerChange(event: Event): void {
    console.log(event);
  }

  public onTimePickerChange(event: Event): void {
    console.log(event);
  }

}
