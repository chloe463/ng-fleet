import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FrDialogContext, FrDialogService } from './dialog.service';
import { FrDialogEntryComponent } from './dialog-entry.component';
import { NgModule, Component, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  let deps = [ComponentFactoryResolver];
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
  selector: 'dummy',
  template: `<fr-dialog-entry></fr-dialog-entry>`,
  providers: [FrDialogService]
})
class Dummy {
  constructor(public dialog: FrDialogService) {}

  openDialog() {
    this.dialog.open<any>(DummyDialogContent).subscribe(
      ok => { },
      ng => { }
    );
  }
}

@Component({
  selector: 'dialog-content',
  template: ``,
})
class DummyDialogContent {
  constructor(public context: FrDialogContext<any>) {}
}

@NgModule({
  declarations: [Dummy, DummyDialogContent, FrDialogEntryComponent],
  entryComponents: [DummyDialogContent]
})
class DummyDialogModule {}
