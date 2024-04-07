import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facultad_PopupComponent } from './facultad-popup.component';

describe('PopupComponent', () => {
  let component: Facultad_PopupComponent;
  let fixture: ComponentFixture<Facultad_PopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Facultad_PopupComponent]
    });
    fixture = TestBed.createComponent(Facultad_PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
