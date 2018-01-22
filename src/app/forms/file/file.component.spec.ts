import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrInputFileComponent } from './file.component';

describe('FrInputFileComponent', () => {
  let component: FrInputFileComponent;
  let fixture: ComponentFixture<FrInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
