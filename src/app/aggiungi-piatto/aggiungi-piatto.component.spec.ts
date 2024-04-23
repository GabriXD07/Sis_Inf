import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiOperaComponent } from './aggiungi-piatto.component';

describe('AggiungiOperaComponent', () => {
  let component: AggiungiOperaComponent;
  let fixture: ComponentFixture<AggiungiOperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiOperaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiOperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
