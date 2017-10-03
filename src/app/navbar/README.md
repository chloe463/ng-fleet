# Navbar

## Usage

```ts
import { IFrNavbarNode } from 'francette';

@Component({
  selector: 'navbar-demo',
  template: `
<fr-navbar>
  <fr-navbar-logo [logo]="{title: 'Francette'}"></fr-navbar-logo>
  <fr-navbar-item *ngFor="let node of navbarNodes" [node]="node"></fr-navbar-item>
</fr-navbar>
  `
})
export class NavbarDemoComponent {
  public navbarNodes: Array<IFrNavbarNode> = [
    { url: '', title: 'nav' },
    { url: '', title: 'menu', children: [
      { url: '', title: 'child1' },
      { url: '', title: 'child2' },
      { url: '', title: 'child3' },
    ] }
  ];
}
```
