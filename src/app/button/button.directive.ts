import { Directive, HostBinding } from '@angular/core';

/**
 * Normal buttons
 */
@Directive({
  selector: 'button[frButton], button[fr-button]'
})
export class FrButtonDirective {
  @HostBinding('class') btn = 'fr-btn';
}

@Directive({
  selector: 'button[frPrimaryButton], button[fr-primary-button]'
})
export class FrPrimaryButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn--primary';
}

@Directive({
  selector: 'button[frInfoButton], button[fr-info-button]'
})
export class FrInfoButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn--info';
}

@Directive({
  selector: 'button[frWarningButton], button[fr-warning-button]'
})
export class FrWarningButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn--warning';
}

@Directive({
  selector: 'button[frDangerButton], button[fr-danger-button]'
})
export class FrDangerButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn--danger';
}

@Directive({
  selector: 'button[frDisabledButton], button[fr-disabled-button]'
})
export class FrDisabledButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn--disabled';
}

/**
 * Skeleton buttons
 */
@Directive({
  selector: 'button[frSkeletonButton], button[fr-skeleton-button]'
})
export class FrSkeletonButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton';
}

@Directive({
  selector: 'button[frSkeletonPrimaryButton], button[fr-skeleton-primary-button]'
})
export class FrSkeletonPrimaryButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton--primary';
}

@Directive({
  selector: 'button[frSkeletonInfoButton], button[fr-skeleton-info-button]'
})
export class FrSkeletonInfoButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton--info';
}

@Directive({
  selector: 'button[frSkeletonWarningButton], button[fr-skeleton-warning-button]'
})
export class FrSkeletonWarningButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton--warning';
}

@Directive({
  selector: 'button[frSkeletonDangerButton], button[fr-skeleton-danger-button]'
})
export class FrSkeletonDangerButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton--danger';
}

@Directive({
  selector: 'button[frSkeletonDisabledButton], button[fr-skeleton-disabled-button]'
})
export class FrSkeletonDisabledButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-skeleton--disabled';
}

/**
 * Flat button
 */
@Directive({
  selector: 'button[frFlatButton], button[fr-flat-button]'
})
export class FrFlatButtonDirective {
  @HostBinding('class') btn = 'fr-btn fr-btn-flat';
}
