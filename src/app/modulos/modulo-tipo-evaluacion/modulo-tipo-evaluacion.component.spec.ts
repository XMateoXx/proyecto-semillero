import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloTipoEvaluacionComponent } from './modulo-tipo-evaluacion.component';

describe('ModuloTipoEvaluacionComponent', () => {
  let component: ModuloTipoEvaluacionComponent;
  let fixture: ComponentFixture<ModuloTipoEvaluacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloTipoEvaluacionComponent]
    });
    fixture = TestBed.createComponent(ModuloTipoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
