import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FrFormsModule } from "../src/app";

export default {
  title: "forms/time-picker",
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

export const defaultTimePicker = () => ({
  moduleMetadata,
  styles: [`.container { margin: 24px }`],
  template: `
    <div class="container">
      <fr-time-picker [(ngModel)]="time"></fr-time-picker>
    </div>
  `,
  props: {
    date: new Date(),
  },
});
