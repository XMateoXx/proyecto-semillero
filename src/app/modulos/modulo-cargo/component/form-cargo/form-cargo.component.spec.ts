import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCargoComponent } from './form-cargo.component';

describe('FormCargoComponent', () => {
  let component: FormCargoComponent;
  let fixture: ComponentFixture<FormCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCargoComponent]
    });
    fixture = TestBed.createComponent(FormCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
