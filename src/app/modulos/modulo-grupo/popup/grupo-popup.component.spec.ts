import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoPopupComponent } from './grupo-popup.component';

describe('GrupoPopupComponent', () => {
  let component: GrupoPopupComponent;
  let fixture: ComponentFixture<GrupoPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoPopupComponent]
    });
    fixture = TestBed.createComponent(GrupoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
