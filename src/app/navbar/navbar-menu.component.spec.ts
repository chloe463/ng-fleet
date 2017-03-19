import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrNavbarMenuComponent } from './navbar-menu.component';

describe('FrNavbarMenuComponent', () => {
  let component: FrNavbarMenuComponent;
  let fixture: ComponentFixture<FrNavbarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrNavbarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrNavbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
