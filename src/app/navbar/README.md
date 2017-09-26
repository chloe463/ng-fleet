# Navbar

## Usage

```ts
@Component({
  selector: 'navbar-demo',
  template: `
<fr-navbar>
  <fr-navbar-logo [logo]="{title: 'Francette', url: '/top'}"></fr-navbar-logo>
  <fr-navbar-item *ngFor="let node of navbarNodes" [node]="node"></fr-navbar-item>
</fr-navbar>
  `
})
export class NavbarDemoComponent {
  navbarLogo: IFrNavbarNode = {
    title: 'Francette',
    url: '/top'
  };

  navbarNodes: Array<IFrNavbarNode> = [
    { url: '', title: 'item1' },
    {
      url: '',
      title: 'item2',
      children: [
        { url: '', title: 'child1' },
        { url: '', title: 'child2' },
        { url: '', title: 'child3' },
      ]
    }
  ];
}
```
