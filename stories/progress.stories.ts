import { FrProgressBarComponent } from "./../src/app/progress/bar/bar.component";
import { FrProgressSpinnerComponent } from "./../src/app/progress/spinner/spinner.component";

export default {
  title: "Progress",
};

export const Bar = () => ({
  component: FrProgressBarComponent,
  moduleMetadata: {
    declarations: [
      FrProgressBarComponent,
    ],
  },
});

export const Spinner = () => ({
  component: FrProgressSpinnerComponent,
  moduleMetadata: {
    declarations: [
      FrProgressSpinnerComponent,
    ],
  },
});
