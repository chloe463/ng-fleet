import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FrCheckboxChange, FrDatePickerChange, FrInputFileChange, FrRadioChange, FrSelectChange, FrTimePickerChange } from 'francette';

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
  // formGroup: FormGroup = this.fb.group({ });
  formGroup: FormGroup;
  radios = [
    { label: 'option1', value: '1' },
    { label: 'option2', value: '2' },
    { label: 'option3', value: '3' },
    { label: 'option4', value: '4' },
  ];
  checkboxes = [
    { name: 'check1', indeterminate: false },
    { name: 'check2', indeterminate: false },
    { name: 'check3', indeterminate: false },
    { name: 'check4 (indeterminate)', indeterminate: true },
  ];
  options = [
    { label: 'Option1', value: 1 },
    { label: 'Option2', value: 2 },
    { label: 'Option3', value: 3 },
    { label: 'Option4', value: 4 }
  ];

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      file: [],
      text: ['', Validators.required],
      select: '',
      radio: 1,
      checkboxes: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ]),
      switch: false,
      date: new Date(),
      textArea: ''
    });
  }

  public resetFormGroup() {
    this.formGroup.setValue({
      file: [],
      text: '',
      select: null,
      radio: null,
      checkboxes: [false, false, false, false],
      switch: false,
      date: new Date(),
      textArea: ''
    });
  }

  get checkBoxControls() {
    return (this.formGroup.controls['checkboxes'] as FormArray).controls as FormControl[];
  }

  public onSubmit() {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
    return false;
  }

  public onFileChange(event: FrInputFileChange): void {
    console.log(event);
  }

  public onSelectChange(event: FrSelectChange): void {
    console.log(event);
  }

  public onRadioChange(event: FrRadioChange): void {
    console.log(event);
  }

  public onCheckboxChange(event: FrCheckboxChange): void {
    console.log(event);
  }

  public onDatePickerChange(event: FrDatePickerChange): void {
    console.log(event);
  }

  public onTimePickerChange(event: FrTimePickerChange): void {
    console.log(event);
  }

}
