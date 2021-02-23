import { Component } from '@angular/core';
import { IFrNavbarNode, IFrSideNavNodeGroup } from 'francette';

@Component({
  selector: 'fr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public navbarNodes: Array<IFrNavbarNode> = [
    { url: '', title: 'nav' },
    { url: '', title: 'menu', children: [
      { url: '', title: 'child1' },
      { url: '', title: 'child2' },
      { url: '', title: 'child3' },
    ] }
  ];

  public sideNavbarNodes: Array<IFrNavbarNode> = [
    { url: 'buttons', title: 'buttons' },
    { url: 'chips', title: 'chips' },
    { url: 'data-table', title: 'data-table' },
    { url: 'dialog', title: 'dialog' },
    { url: 'forms', title: 'forms' },
    { url: 'progress', title: 'progress' },
    { url: 'tabs', title: 'tabs' },
    { url: 'toaster', title: 'toaster' },
    { url: 'tooltip', title: 'tooltip' },
    { url: 'kpi-table', title: 'kpi-table' }
  ];

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

