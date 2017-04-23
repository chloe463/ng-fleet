import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FrCheckboxComponent } from './checkbox/checkbox.component';
import { FrDatePickerComponent } from './date-picker/date-picker.component';
import { FrFormGroupComponent } from './form-group/form-group.component';
import { FrInputTextComponent } from './input-text/input-text.component';
import { FrInputDirective, FrInputTextContainerComponent } from './input-text-container/input-text-container.component';
import { FrOptionComponent } from './select/option.component';
import { FrRadioGroupComponent } from './radio/radio-group.component';
import { FrRadioComponent } from './radio/radio.component';
import { FrSelectComponent } from './select/select.component';
import { FrTimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
  declarations: [
    FrCheckboxComponent,
    FrDatePickerComponent,
    FrFormGroupComponent,
    FrInputTextComponent,
    FrInputDirective,
    FrInputTextContainerComponent,
    FrOptionComponent,
    FrRadioComponent,
    FrRadioGroupComponent,
    FrSelectComponent,
    FrTimePickerComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    FrCheckboxComponent,
    FrDatePickerComponent,
    FrFormGroupComponent,
    FrInputTextComponent,
    FrInputDirective,
    FrInputTextContainerComponent,
    FrOptionComponent,
    FrRadioComponent,
    FrRadioGroupComponent,
    FrSelectComponent,
    FrTimePickerComponent
  ]
})
export class FrFormsModule { }
