import { FrancetteModule } from "../src/app";

export default {
  title: "Tabs",
};

export const DefaultTab = () => {
  const selectedIndex = 1;
  return {
    moduleMetadata: {
      imports: [
        FrancetteModule,
      ],
    },
    styles: [`
      .container {
        margin: 24px
      }
      h2 {
        font-size: 32px;
        font-weight: 600;
        letter-spacing: 0.2px;
        color: rgba(0, 0, 0, 0.84);
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.84);
      }
    `],
    template: `
      <fr-tabs [(selectedIndex)]="selectedIndex">
        <fr-tab title="tab1">
          <div class="container">
            <h2>Tab1 content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </fr-tab>
        <fr-tab title="tab2">
          <div class="container">
            <h2>Tab2 content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </fr-tab>
        <fr-tab title="tab3">
          <div class="container">
            <h2>Tab3 content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </fr-tab>
      </fr-tabs>
    `,
    props: {
      selectedIndex,
    },
  };
};
