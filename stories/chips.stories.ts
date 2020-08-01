import { action } from "@storybook/addon-actions";
import { FrChipComponent } from "../src/app/chip/chip.component";

export default {
  title: "chips",
};

export const defaultChip = () => ({
  moduleMetadata: {
    declarations: [FrChipComponent],
  },
  props: {
    dismiss: () => action("fr-chip-dismiss"),
  },
  template: `
    <fr-chip (dismiss)="dismiss(i)">
      chip
    </fr-chip>
  `,
});
