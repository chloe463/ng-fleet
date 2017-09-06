import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrNavbarMenuDirective } from './navbar-menu.component';

describe('FrNavbarMenuDirective', () => {
  let component: FrNavbarMenuDirective;
  let fixture: ComponentFixture<FrNavbarMenuDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrNavbarMenuDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrNavbarMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
