export interface IFrNavbarNode {
  title: string;
  url?: string;
  children?: Array<IFrNavbarNode>;
}

export interface IFrSideNavNodeGroup {
  title: string;
  collapsible?: boolean;
  nodes?: Array<IFrNavbarNode>;
}
