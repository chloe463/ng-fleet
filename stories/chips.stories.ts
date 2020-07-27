import { FrChipComponent } from "../src/app/chip/chip.component";

export default {
  title: "chips",
};

export const defaultChip = () => ({
  moduleMetadata: {
    declarations: [FrChipComponent],
  },
  props: {
    dismiss: () => console.log("dismiss!"),
  },
  template: `
    <fr-chip (dismiss)="dismiss(i)">
      chip
    </fr-chip>
  `,
});
