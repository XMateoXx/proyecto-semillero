import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaPopupComponent } from './asignatura-popup.component';

describe('AsignaturaPopupComponent', () => {
  let component: AsignaturaPopupComponent;
  let fixture: ComponentFixture<AsignaturaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturaPopupComponent]
    });
    fixture = TestBed.createComponent(AsignaturaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
