import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloEvaluacionComponent } from './modulo-evaluacion.component';

describe('ModuloEvaluacionComponent', () => {
    let component: ModuloEvaluacionComponent;
    let fixture: ComponentFixture<ModuloEvaluacionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModuloEvaluacionComponent]
        });
        fixture = TestBed.createComponent(ModuloEvaluacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});