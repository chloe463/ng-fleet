import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrInputTextComponent } from './input-text.component';

describe('FrInputTextComponent', () => {
  let component: FrInputTextComponent;
  let fixture: ComponentFixture<FrInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
