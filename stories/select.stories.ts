import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { action } from "@storybook/addon-actions";
import { FrFormsModule } from "../src/app";

export default {
  title: "forms/select",
};

const moduleMetadata = {
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FrFormsModule,
  ],
};

const options = [
  { value: 1, label: "option1" },
  { value: 2, label: "option2" },
  { value: 3, label: "option3" },
  { value: 4, label: "option4" },
];

export const defaultSelect = () => ({
  moduleMetadata,
  styles: [`.container { margin: 24px }`],
  template: `
    <div class="container">
      <fr-select [browserNative]="false" (change)="onChange($event)">
        <fr-option *ngFor="let option of options" [value]="option.value" [label]="option.label"></fr-option>
      </fr-select>
    </div>
  `,
  props: {
    options,
    onChange: action("on-change-select"),
  },
});
