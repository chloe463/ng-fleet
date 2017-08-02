import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrNavbarMenuItemComponent } from './navbar-menu-item.component';

describe('FrNavbarMenuItemComponent', () => {
  let component: FrNavbarMenuItemComponent;
  let fixture: ComponentFixture<FrNavbarMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrNavbarMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrNavbarMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
