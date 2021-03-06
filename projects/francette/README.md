# Francette

![Main](https://github.com/chloe463/francette/workflows/Main/badge.svg)
[![npm version](https://badge.fury.io/js/francette.svg)](https://badge.fury.io/js/francette)

Simple components and style sheets for Angular 2.0 or higher.

Please see [this directory](https://github.com/chloe463/francette/tree/master/src/demo) and learn how to use this.

## Modules

|Name|Modules|Notes|
|:-|:-|:-|
|Buttons|`FrButtonModule`||
|Chips|`FrChipModule`||
|Data table|`FrDataTableModule`|Consists of `header`, `columns`, `rows` and `footer` components.|
|Dialog|`FrDialogModule`||
|Forms|`FrFormsModule`|Includes `checkbox`, `date-picker`, `input[type="file"]`, `input[type="text"]`, `radio`, `select`, `switch` and  `time-picker`.|
|Navbar|`FrNavbarModule`||
|Notification|`FrNotificationModule`||
|Progress bar/spinner|`FrProgressModule`||
|Ripple Effect|`FrRippleModule`||
|Sidenav|`FrSideNavModule`|It works with `FrNavbarModule`.|
|Tabs|`FrTabsModule`||
|Toaster|`FrToasterModule`||

## Installation

```
$ npm install --save francette

# or

$ yarn add --save francette
```

## Getting started

Add `FrancetteModule` to your NgModule imports array.

```typescript
import { NgModule } from '@angular/core';
import { FrancetteModule } from 'francette';

@NgModule({
  declarations: [
    /** Your components */
  ],
  imports: [
    /** Some other modules */
    FrancetteModule
  ]
})
export class AppModule {}
```

If you don't need all the `FrancetteModule` but need some parts of the module, you can import partial modules, say `FrFormsModule` or `FrTabsModule`.

```typescript
import { NgModule } from '@angular/core';
import { FrFormsModule, FrTabsModule } from 'francette';

@NgModule({
  declarations: [
    /** Your components */
  ],
  imports: [
    /** Some other modules */
    FrFormsModule,
    FrTabsModule
  ]
})
export class AppModule {}
```

Add a line to angular.json to import francette css file.

```json
{
  ...
  "project": {
    <projectName>: {
      "architect": {
        "build": {
          "styles: [
            "src/styles.scss".
            "node_modules/francette/francette.css" # Add this line
          ]
        }
      }
    }
  }
}
```
