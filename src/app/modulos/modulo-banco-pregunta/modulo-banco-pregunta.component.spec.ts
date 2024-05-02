import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloBancoPreguntaComponent } from './modulo-banco-pregunta.component';

describe('ModuloBancoPreguntaComponent', () => {
  let component: ModuloBancoPreguntaComponent;
  let fixture: ComponentFixture<ModuloBancoPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloBancoPreguntaComponent]
    });
    fixture = TestBed.createComponent(ModuloBancoPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
