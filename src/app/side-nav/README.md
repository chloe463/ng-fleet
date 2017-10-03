# Sidenav

## Usage

```typescript
import { IFrSideNavNodeGroup, IFrNavbarNode } from 'francette';

@Component({
  selector: `side-navbar-demo`,
  template: `
  <fr-navbar>
    <fr-side-nav>
      <fr-side-nav-item-group *ngFor="let group of sideNavNodeGroups" [group]="group">
        <fr-side-nav-item *ngFor="let node of group.nodes" [node]="node"></fr-side-nav-item>
      </fr-side-nav-item-group>
    </fr-side-nav>
  </fr-navbar>
  `
})
export class SideNavDemoComponent {

  public sideNavNodeGroups: Array<IFrSideNavNodeGroup> = [
    {
      title: 'Components',
      collapsible: true,
      nodes: this.sideNavbarNodes
    },
    {
      title: 'Group1',
      collapsible: false,
      nodes: [
        { url: 'item1-1', title: 'item1-1' },
        { url: 'item1-2', title: 'item1-2' },
      ]
    },
    {
      title: 'Group2',
      collapsible: true,
      nodes: [
        { url: 'item2-1', title: 'item2-1' },
        { url: 'item2-2', title: 'item2-2' },
      ]
    }
  ];
}
```
