import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FrFormsModule } from "../src/app";

export default {
  title: "forms/date-picker",
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

export const defaultDatePicker = () => ({
  moduleMetadata,
  styles: [`.container { margin: 24px }`],
  template: `
    <div class="container">
      <fr-date-picker [(ngModel)]="date"></fr-date-picker>
    </div>
  `,
  props: {
    date: new Date(),
  },
});
