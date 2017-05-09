import { Component } from '@angular/core';

@Component({
  selector: 'forms-demo',
  template: `
    <form (ngSubmit)="onSubmit(formValue.value)" #formValue="ngForm">
      <table style="width:80%;margin:15px auto">
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">input-text-container</td>
          <td>
            <fr-input-text-container>
              <input frInput type="text" name="text" placeholder="text" [(ngModel)]="form.text">
            </fr-input-text-container>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">select</td>
          <td>
            <fr-select [(ngModel)]="form.select" name="sampleSelect" placeholder="select" [browserNative]="false">
              <fr-option *ngFor="let option of options; let i = index; trackBy index" [value]="option.value" label="{{option.label}}"></fr-option>
              <fr-option value="123" label="label123"></fr-option>
              <fr-option value="987" label="label987"></fr-option>
            </fr-select>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">radio</td>
          <td>
            <fr-form-group label="radio">
              <fr-radio-group name="testRadio" [(ngModel)]="form.radio">
                <fr-radio value="1" label="radio1"></fr-radio>
                <fr-radio value="2" label="radio2"></fr-radio>
                <fr-radio *ngFor="let selectValue of selectValues" [value]="selectValue" label="{{selectValue.value}}"></fr-radio>
              </fr-radio-group>
            </fr-form-group>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">checkbox</td>
          <td>
            <fr-form-group label="checkbox">
              <fr-checkbox label="checkbox1" [(ngModel)]="form.checkbox[0]" name="checkbox1">checkbox1</fr-checkbox>
              <fr-checkbox label="checkbox1" [(ngModel)]="form.checkbox[1]" name="checkbox2">checkbox2</fr-checkbox>
              <fr-checkbox label="checkbox1" name="checkbox3" ngModel>checkbox3</fr-checkbox>
              <fr-checkbox label="checkbox1" name="checkbox4" ngModel>checkbox4</fr-checkbox>
              <fr-checkbox *ngFor="let chk of chks; let i = index" name="{{chk.name}}" [(ngModel)]="form.checkbox[i+2]">{{chk.label}}</fr-checkbox>
            </fr-form-group>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">date picker</td>
          <td>
            <fr-form-group label="date">
              <fr-date-picker name="calendar" [(ngModel)]="form.date"></fr-date-picker>
            </fr-form-group>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">time picker</td>
          <td>
            <fr-form-group label="time">
              <fr-time-picker name="time" [(ngModel)]="form.date"></fr-time-picker>
            </fr-form-group>
          </td>
        </tr>
        <tr style="height:50px">
          <td style="width:25%;text-align:right;padding-right:15px">text area</td>
          <td>
            <fr-input-text-container maxLength="10">
              <textarea frInput placeholder="TextArea" name="textarea" [(ngModel)]="form.textarea"></textarea>
            </fr-input-text-container>
          </td>
        </tr>
        <tr style="height:50px">
          <td>
            <button class="fr-btn-skeleton--primary" (click)="submit()" style="margin: auto 50%" frRipple>submit</button>
          </td>
          <td>
            <button class="fr-btn-skeleton--danger" (click)="reset()" style="margin: auto 50%" [frRipple]="'#EAEAEA'">reset</button>
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
  form: {[key: string]: any} = {
    text: '',
    select: '',
    radio: '',
    checkbox: {},
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
      date: new Date(),
      time: new Date()
    };
  }

  public onSubmit(e) {
    console.log(e);
    return false;
  }

}
