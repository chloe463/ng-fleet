import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FrFormsModule } from "../src/app";

export default {
  title: "forms/input-text-container",
};

const moduleMetadata = {
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FrFormsModule,
  ],
};

export const InputTextcontainer = () => ({
  moduleMetadata,
  styles: [
    `
      .container {
        margin: 24px;
      }
    `,
  ],
  template: `
    <div class="container">
      <fr-input-text-container>
        <input frInput type="text" placeholder="placeholder" />
      </fr-input-text-container>
    </div>
  `,
});

export const DisabledInputTextcontainer = () => ({
  moduleMetadata,
  styles: [
    `
      .container {
        margin: 24px;
      }
    `,
  ],
  template: `
    <div class="container">
      <fr-input-text-container>
        <input frInput type="text" placeholder="placeholder" disabled/>
      </fr-input-text-container>
    </div>
  `,
});
