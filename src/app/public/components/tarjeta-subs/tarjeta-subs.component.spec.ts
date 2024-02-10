import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaSubsComponent } from './tarjeta-subs.component';

describe('TarjetaSubsComponent', () => {
  let component: TarjetaSubsComponent;
  let fixture: ComponentFixture<TarjetaSubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TarjetaSubsComponent]
    });
    fixture = TestBed.createComponent(TarjetaSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
