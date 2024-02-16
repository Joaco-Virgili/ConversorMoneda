import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCurrencyComponent } from './new-currency.component';

describe('NewCurrencyComponent', () => {
  let component: NewCurrencyComponent;
  let fixture: ComponentFixture<NewCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewCurrencyComponent]
    });
    fixture = TestBed.createComponent(NewCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
