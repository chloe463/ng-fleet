import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrancetteComponent } from './francette.component';

describe('FrancetteComponent', () => {
  let component: FrancetteComponent;
  let fixture: ComponentFixture<FrancetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrancetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrancetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
