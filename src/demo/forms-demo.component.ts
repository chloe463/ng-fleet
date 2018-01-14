import { Component } from '@angular/core';

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
  template: `
    <form (ngSubmit)="onSubmit(formValue.value)" #formValue="ngForm">
      <table>
        <tr>
          <td>
            <fr-input-text-container>
              <input frInput type="text" name="text" placeholder="text" [(ngModel)]="form.text">
            </fr-input-text-container>
          </td>
        </tr>
        <tr>
          <td>
            <fr-select [(ngModel)]="form.select" name="sampleSelect" placeholder="select"
              [browserNative]="false"
              (change)="onSelectChange($event)">
              <fr-option *ngFor="let option of options; let i = index" [value]="option.value" label="{{option.label}}"></fr-option>
              <fr-option value="123" label="label123"></fr-option>
              <fr-option value="987" label="label987"></fr-option>
            </fr-select>
          </td>
        </tr>
        <tr>
          <td>
            <fr-form-group label="radio">
              <fr-radio-group name="testRadio" [(ngModel)]="form.radio" (change)="onRadioChange($event)">
                <fr-radio value="1">radio1</fr-radio>
                <fr-radio value="2">radio2</fr-radio>
                <fr-radio *ngFor="let selectValue of selectValues" [value]="selectValue">
                {{selectValue.value}}
                </fr-radio>
              </fr-radio-group>
            </fr-form-group>
          </td>
        </tr>
        <tr>
          <td>
            <fr-form-group label="checkbox">
              <fr-checkbox label="checkbox1" [(ngModel)]="form.checkbox[0]" name="checkbox1"
                (change)="onCheckboxChange($event)">checkbox1</fr-checkbox>
              <fr-checkbox label="checkbox1" [(ngModel)]="form.checkbox[1]" name="checkbox2">checkbox2</fr-checkbox>
              <fr-checkbox label="checkbox1" name="checkbox3" ngModel>checkbox3</fr-checkbox>
              <fr-checkbox label="checkbox1" name="checkbox4" ngModel>checkbox4</fr-checkbox>
              <fr-checkbox *ngFor="let chk of chks; let i = index" name="{{chk.name}}"
                [(ngModel)]="form.checkbox[i+2]">{{chk.label}}</fr-checkbox>
            </fr-form-group>
          </td>
        </tr>
        <tr>
          <td>
            <fr-form-group label="switch">
              <fr-switch name="switch" [(ngModel)]="form.switch" [labels]="{ on: 'On', off: 'Off' }"></fr-switch>
            </fr-form-group>
          </td>
        </tr>
        <tr>
          <td>
            <fr-form-group label="date-time">
              <fr-date-picker name="calendar" [(ngModel)]="form.date" (change)="onDatePickerChange($event)"></fr-date-picker>
              <fr-time-picker name="time" [(ngModel)]="form.date" (change)="onTimePickerChange($event)"></fr-time-picker>
            </fr-form-group>
          </td>
        </tr>
        <tr>
          <td>
            <fr-input-text-container>
              <textarea frInput placeholder="TextArea" name="textarea" maxLength="10" [(ngModel)]="form.textarea"></textarea>
            </fr-input-text-container>
          </td>
        </tr>
        <tr>
          <td>
            <div class="buttons">
              <button class="fr-btn-skeleton--primary" (click)="submit()" frRipple>submit</button>
              <button class="fr-btn-skeleton--danger" (click)="reset()" frRipple>reset</button>
            </div>
          </td>
        </tr>
      </table>
    </form>
  `
})
export class FormsDemoComponent {
  chks = [
    { name: 'chk1', label: 'chk1' },
    { name: 'chk2', label: 'chk2' },
    { name: 'chk3', label: 'chk3' },
  ];

  options = [
    {value: 0, label: 'value1'},
    {value: 1, label: 'value2'},
    {value: 2, label: 'value3'},
  ];
  selectValues = [
    {key: 1, value: 'val1'},
    {key: 2, value: 'val2'},
  ];
  selectDisabled = true;
  form: any = {
    text: '',
    select: '',
    radio: '',
    checkbox: {},
    switch: false,
    date: new Date(),
    time: new Date()
  };

  public toggleSelect() {
    this.selectDisabled = !this.selectDisabled;
  }

  public submit() {
    console.log(this.form);
  }

  public reset() {
    this.form = {
      text: '',
      select: '',
      radio: '',
      checkbox: {},
      switch: false,
      date: new Date(),
      time: new Date()
    };
  }

  public onSubmit(e) {
    console.log(e);
    return false;
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
