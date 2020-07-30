import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FrFormsModule } from "../src/app";

export default {
  title: "forms/switch",
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

export const defaultCheckbox = () => ({
  moduleMetadata,
  styles: [`.container { margin: 24px }`],
  template: `
    <div class="container">
      <fr-switch [labels]="labels" [(ngModel)]="model"></fr-switch>
    </div>
  `,
  props: {
    labels: {
      on: "On",
      off: "Off",
    },
    model: false,
  },
});
