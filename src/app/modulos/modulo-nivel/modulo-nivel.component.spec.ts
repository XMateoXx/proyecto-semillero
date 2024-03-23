import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloNivelComponent } from './modulo-nivel.component';

describe('ModuloNivelComponent', () => {
  let component: ModuloNivelComponent;
  let fixture: ComponentFixture<ModuloNivelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloNivelComponent]
    });
    fixture = TestBed.createComponent(ModuloNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
