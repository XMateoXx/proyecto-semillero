import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoEComponent } from './form-tipo-e.component';

describe('FormTipoEComponent', () => {
  let component: FormTipoEComponent;
  let fixture: ComponentFixture<FormTipoEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTipoEComponent]
    });
    fixture = TestBed.createComponent(FormTipoEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
