import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FrRippleModule } from '../ripple/ripple.module';
import { FrCheckboxComponent } from './checkbox/checkbox.component';
import { FrDatePickerComponent } from './date-picker/date-picker.component';
import { FrFormGroupComponent } from './form-group/form-group.component';
import { FrInputTextComponent } from './input-text/input-text.component';
import { FrInputDirective, FrInputTextContainerComponent } from './input-text-container/input-text-container.component';
import { FrOptionComponent } from './select/option.component';
import { FrRadioGroupComponent, FrRadioComponent } from './radio/radio/radio.component';
import { FrSwitchComponent } from './switch/switch.component';
import { FrSelectComponent } from './select/select.component';
import { FrTimePickerComponent } from './time-picker/time-picker.component';
import { FrInputFileComponent } from './file/file.component';

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
    FrSwitchComponent,
    FrTimePickerComponent,
    FrInputFileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FrRippleModule
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
    FrSwitchComponent,
    FrTimePickerComponent,
    FrInputFileComponent
  ]
})
export class FrFormsModule { }
