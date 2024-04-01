import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaPopupComponent } from './programa-popup.component';

describe('ProgramaPopupComponent', () => {
  let component: ProgramaPopupComponent;
  let fixture: ComponentFixture<ProgramaPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramaPopupComponent]
    });
    fixture = TestBed.createComponent(ProgramaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
