import { Component } from '@angular/core';

@Component({
  selector: 'fr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Francette';
  chips = [
    { label: 'chip1' },
    { label: 'chip2' },
    { label: 'chip3' },
    { label: 'chip4' },
    { label: 'chip5' }
  ];
  selectedIndex = 0;
  chks = [
    { name: 'chk1', label: 'chk1' },
    { name: 'chk2', label: 'chk2' },
    { name: 'chk3', label: 'chk3' },
  ];
  data = {
    dateList: [
      20170101, 20170102, 20170103, 20170104, 20170105, 20170106, 20170107
    ],
    kpi: [
      { name: 'row0', values: [1, 2, 3, 4, 5, 6, 7] },
      { name: 'row1', values: [2, 3, 4, 5, 6, 7, 8] },
      { name: 'row2', values: [3, 4, 5, 6, 7, 8, 9] },
    ]
  };
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
    time: { hour: 0, minute: 0, second: 0 }
  };

  public toggleSelect() {
    this.selectDisabled = !this.selectDisabled;
  }

  public submit() {
    console.log(this.form);
  }

  public resetSelect() {
    this.options = [
      {value: 9, label: 'value9'},
      {value: 8, label: 'value8'},
      {value: 7, label: 'value7'},
    ];
  }

  public reset() {
    this.form = {
      text: '',
      select: '',
      radio: '',
      checkbox: {},
      date: new Date(),
      time: { hour: 0, minute: 0, second: 0 }
    };
  }

  public onSubmit(e) {
    console.log(e);
    return false;
  }

  public removeChip(index: number) {
    this.chips = [
      ...this.chips.slice(0, index),
      ...this.chips.slice(index+1),
    ];
  }
}

@Component({
  selector: 'fr-nav-sample1',
  template: `<h1>Nav1 content</h1>`
})
export class FrNavSample1Component { }
@Component({
  selector: 'fr-nav-sample2',
  template: `<h1>Nav2 content</h1>`
})
export class FrNavSample2Component { }
@Component({
  selector: 'fr-nav-sample3',
  template: `<h1>Nav3 content</h1>`
})
export class FrNavSample3Component { }
