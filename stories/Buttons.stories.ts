import {
  FrButtonDirective,
  FrDangerButtonDirective,
  FrDisabledButtonDirective,
  FrFlatButtonDirective,
  FrInfoButtonDirective,
  FrPrimaryButtonDirective,
  FrSkeletonButtonDirective,
  FrSkeletonDangerButtonDirective,
  FrSkeletonDisabledButtonDirective,
  FrSkeletonInfoButtonDirective,
  FrSkeletonPrimaryButtonDirective,
  FrSkeletonWarningButtonDirective,
  FrWarningButtonDirective,
} from "../src/app/button/button.directive";

export default {
  title: "My Buttons",
};

export const defaultButton = () => ({
  moduleMetadata: {
    declarations: [FrButtonDirective],
  },
  template: `
    <button frButton>Default</button>
  `,
});

export const primary = () => ({
  moduleMetadata: {
    declarations: [FrPrimaryButtonDirective],
  },
  template: `
    <button frPrimaryButton>Primary</button>
  `,
});

export const info = () => ({
  moduleMetadata: {
    declarations: [FrInfoButtonDirective],
  },
  template: `
    <button frInfoButton>Info</button>
  `,
});

export const warning = () => ({
  moduleMetadata: {
    declarations: [FrWarningButtonDirective],
  },
  template: `
    <button frWarningButton>Warning</button>
  `,
});

export const danger = () => ({
  moduleMetadata: {
    declarations: [FrDangerButtonDirective],
  },
  template: `
    <button frDangerButton>Danger</button>
  `,
});

export const disabled = () => ({
  moduleMetadata: {
    declarations: [FrDisabledButtonDirective],
  },
  template: `
    <button frDisabledButton>Disabled</button>
  `,
});

export const skeleton = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonButtonDirective],
  },
  template: `
    <button frSkeletonButton>Skeleton</button>
  `,
});

export const skeletonPrimary = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonPrimaryButtonDirective],
  },
  template: `
    <button frSkeletonPrimaryButton>Skeleton</button>
  `,
});

export const skeletonInfo = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonInfoButtonDirective],
  },
  template: `
    <button frSkeletonInfoButton>Skeleton</button>
  `,
});

export const skeletonWarning = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonWarningButtonDirective],
  },
  template: `
    <button frSkeletonWarningButton>Skeleton</button>
  `,
});

export const skeletonDanger = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonDangerButtonDirective],
  },
  template: `
    <button frSkeletonDangerButton>Skeleton</button>
  `,
});

export const skeletonDisabled = () => ({
  moduleMetadata: {
    declarations: [FrSkeletonDisabledButtonDirective],
  },
  template: `
    <button frSkeletonDisabledButton>Skeleton</button>
  `,
});

export const flat = () => ({
  moduleMetadata: {
    declarations: [FrFlatButtonDirective],
  },
  template: `
    <button frFlatButton>Skeleton</button>
  `,
});
