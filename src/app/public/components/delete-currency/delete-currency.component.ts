import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../interfaces/currency';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-currency.component.html',
  styleUrls: ['./delete-currency.component.scss']
})
export class DeleteCurrencyComponent  implements OnInit{
  @Output() cerrar = new EventEmitter();
  currencyService = inject(CurrencyService);
  router = inject(Router);
  currencys:Currency[] = []

  currency: Currency = {
    id: 0,
    name: '',
    symbol: '',
    value: 0
  };

  ngOnInit(): void {
    this.currencyService.getAll().then(res => {
      this.currencys = res.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  async onSubmit() {
    this.borrarCurrency();
  }

  borrarCurrency() {
    this.cerrar.emit();
    Swal.fire({
      title:
        '¿Querés eliminar la moneda ' + this.currency.name +'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.currencyService.delete(this.currency.id).then((res) => {
          if (res) {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          } else {
            Swal.fire(
              'Error borrando moneda',
              'Intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }
}
