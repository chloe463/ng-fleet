# Ripple

## Usage

```ts
@Component({
  selector: 'buttons-demo',
  template: `
    <button frRipple class="fr-btn">button</button>
    <button frRipple class="fr-btn--primary" frRipple>primary</button>
    <button frRipple class="fr-btn--info">info</button>
    <button frRipple class="fr-btn--warning">warning</button>
    <button frRipple class="fr-btn--danger">danger</button>
    <button frRipple class="fr-btn--default">default</button>
    <button frRipple class="fr-btn--disabled" disabled>disabled</button>

    <button frRipple class="fr-btn-fab">&nbsp;</button>
    <button frRipple class="fr-btn-fab--primary">+</button>
    <button frRipple class="fr-btn-fab--info">+</button>
    <button frRipple class="fr-btn-fab--warning">-</button>
    <button frRipple class="fr-btn-fab--danger">-</button>
    <button frRipple class="fr-btn-fab--default">*</button>
    <button frRipple class="fr-btn-fab--disabled" disabled>-</button>

    <button frRipple class="fr-btn-skeleton">skeleton</button>
    <button frRipple class="fr-btn-skeleton--primary">primary</button>
    <button frRipple class="fr-btn-skeleton--info">info</button>
    <button frRipple class="fr-btn-skeleton--warning">warning</button>
    <button frRipple class="fr-btn-skeleton--danger">danger</button>
    <button frRipple class="fr-btn-skeleton--default">default</button>
    <button frRipple class="fr-btn-skeleton--disabled" disabled>disabled</button>
    <button class="fr-btn-flat" [frRipple]="'#CCC'">flat</button>
  `
})
export class ButtonsDemoComponent {
}

```
