# Francette

Simple components and style sheets for Angular 2.0 or heigher.

## Version Compatibility

|Angular version|Francette Version|
|:-|:-|
|2.x|0.6 or lower|
|4.x or higher|0.7 or heigher|

## OVERVIEW

This library provides...

* Buttons
* Chips
* Data table
* Dialog
* Forms
  * Checkbox
  * Date Picker
  * Form group
  * Text
  * Radio
  * Select
  * Time Picker
* Navbar
* Notification
* Progress bar/spinner
* Ripple Effect
* Sidenav
* Tabs
* Toaster

## Installation

```
$ npm install --save francette

# or

$ yarn add --save francette
```

## Get started

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
