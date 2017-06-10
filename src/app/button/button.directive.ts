import { Directive } from '@angular/core';

/**
 * Normal buttons
 */
@Directive({
  selector: 'button[frButton], button[fr-button]',
  host: { 'class': 'fr-btn' }
})
export class FrButtonDirective {}

@Directive({
  selector: 'button[frPrimaryButton], button[fr-primary-button]',
  host: { 'class': 'fr-btn fr-btn--primary' }
})
export class FrPrimaryButtonDirective {}

@Directive({
  selector: 'button[frInfoButton], button[fr-info-button]',
  host: { 'class': 'fr-btn fr-btn--info' }
})
export class FrInfoButtonDirective {}

@Directive({
  selector: 'button[frWarningButton], button[fr-warning-button]',
  host: { 'class': 'fr-btn fr-btn--warning' }
})
export class FrWarningButtonDirective {}

@Directive({
  selector: 'button[frDangerButton], button[fr-danger-button]',
  host: { 'class': 'fr-btn fr-btn--danger' }
})
export class FrDangerButtonDirective {}

@Directive({
  selector: 'button[frDisabledButton], button[fr-disabled-button]',
  host: { 'class': 'fr-btn fr-btn--disabled' }
})
export class FrDisabledButtonDirective {}

/**
 * Skeleton buttons
 */
@Directive({
  selector: 'button[frSkeletonButton], button[fr-skeleton-button]',
  host: { 'class': 'fr-btn-skeleton' }
})
export class FrSkeletonButtonDirective {}

@Directive({
  selector: 'button[frSkeletonPrimaryButton], button[fr-skeleton-primary-button]',
  host: { 'class': 'fr-btn-skeleton--primary' }
})
export class FrSkeletonPrimaryButtonDirective {}

@Directive({
  selector: 'button[frSkeletonInfoButton], button[fr-skeleton-info-button]',
  host: { 'class': 'fr-btn-skeleton--info' }
})
export class FrSkeletonInfoButtonDirective {}

@Directive({
  selector: 'button[frSkeletonWarningButton], button[fr-skeleton-warning-button]',
  host: { 'class': 'fr-btn-skeleton--warning' }
})
export class FrSkeletonWarningButtonDirective {}

@Directive({
  selector: 'button[frSkeletonDangerButton], button[fr-skeleton-danger-button]',
  host: { 'class': 'fr-btn-skeleton--danger' }
})
export class FrSkeletonDangerButtonDirective {}

@Directive({
  selector: 'button[frSkeletonDisabledButton], button[fr-skeleton-disabled-button]',
  host: { 'class': 'fr-btn-skeleton--disabled' }
})
export class FrSkeletonDisabledButtonDirective {}

/**
 * Flat button
 */
@Directive({
  selector: 'button[frFlatButton], button[fr-flat-button]',
  host: { 'class': 'fr-btn-flat' }
})
export class FrFlatButtonDirective {}
