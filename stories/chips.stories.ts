import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { FrChipComponent } from "../src/app/chip/chip.component";

export default {
  title: "chips",
  decorators: [withKnobs]
};

export const defaultChip = () => ({
  moduleMetadata: {
    declarations: [FrChipComponent],
  },
  template: `
    <fr-chip (dismiss)="dismiss(i)" [on]="on">
      chip
    </fr-chip>
  `,
  props: {
    dismiss: () => action("fr-chip-dismiss"),
    on: boolean("on", false),
  },
});
