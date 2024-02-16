import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Currency } from '../../interfaces/currency';
import { CurrencyService } from '../../services/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-currency.component.html',
  styleUrls: ['./new-currency.component.scss']
})
export class NewCurrencyComponent {
  
  currencyService = inject(CurrencyService);

  @Output() cerrar = new EventEmitter();
  @Input() currency:Currency = {
    id: 0,
    name: '',
    symbol: '',
    value: 0
  };
  

  async onSubmit() {
    this.createCurrency();
  }

  async createCurrency() {
    this.cerrar.emit();
    Swal.fire({
      title:
        '¿Querés agregar la moneda ' + this.currency.name +'?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.currencyService.create(this.currency).then((res) => {
          if (res !== undefined) {
            Swal.fire('Creada!', 'La moneda ha sido creada correctamente.', 'success');
          } else {
            //Error borrando contacto
            Swal.fire(
              'Error creando moneda',
              'Intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }
}
