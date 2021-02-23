import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { FrDialogContext, FrDialogService } from './dialog.service';
import { FrDialogEntryComponent } from './dialog-entry.component';
import { NgModule, Component, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';

describe('FrDialogService', () => {
  let componentFactoryResolver: ComponentFactoryResolver;
  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   providers: [FrDialogService]
    // })
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        DummyDialogModule
      ],
      providers: [FrDialogService]
    })
    .compileComponents();
  });

  const deps = [ComponentFactoryResolver];
  beforeEach(inject(deps, (cfr: ComponentFactoryResolver) => {
    componentFactoryResolver = cfr;
  }));

  let instance: FrDialogService;
  it ('should instantiate', () => {
    instance = new FrDialogService(componentFactoryResolver);
    expect(instance).toBeTruthy();
  });

  it ('should return length of dialog stack', () => {
    instance = new FrDialogService(componentFactoryResolver);
    expect(instance.isShow()).toBeFalsy();
  });

  // it ('should return observable', () => {
  //   instance = new FrDialogService(componentFactoryResolver);
  //   expect(instance.open<any>(DummyDialogContent) instanceof Observable).toBeTruthy();
  //   instance.open<any>(DummyDialogContent).subscribe(ok => console.log(ok));
  // });
  // it ('should return observable', () => {
  // });

  // it ('should ...', inject([FrDialogService], (service: FrDialogService) => {
  //   expect(service).toBeTruthy();
  // }));
});

@Component({
  /* tslint:disable:component-selector */
  selector: 'dummy-dialog',
  template: `<fr-dialog-entry></fr-dialog-entry>`,
  providers: [FrDialogService]
})
class DummyComponent {
  constructor(public dialog: FrDialogService) {}

  openDialog() {
    this.dialog.open<any>(DummyDialogContentComponent).subscribe(
      ok => { },
      ng => { }
    );
  }
}

@Component({
  /* tslint:disabled:component-selector */
  selector: 'dialog-content',
  template: ``,
})
class DummyDialogContentComponent {
  constructor(public context: FrDialogContext<any>) {}
}

@NgModule({
  declarations: [DummyComponent, DummyDialogContentComponent, FrDialogEntryComponent],
  entryComponents: [DummyDialogContentComponent]
})
class DummyDialogModule {}
