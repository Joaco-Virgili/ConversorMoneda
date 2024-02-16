import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Currency } from '../../interfaces/currency';
import { CurrencyService } from '../../services/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.scss']
})
export class EditCurrencyComponent implements OnInit{
  @Output() cerrar = new EventEmitter();
  currencyService = inject(CurrencyService);
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
    this.editarCurrency();
  }

  async editarCurrency() {
    this.cerrar.emit();
    Swal.fire({
      title:
        '¿Querés editar la moneda ' + this.currency.name +'?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.currencyService.edit(this.currency).then((res) => {
          if (res !== undefined) {
            Swal.fire('Editado!', 'La moneda ha sido editada correctamente.', 'success');
          } else {
            Swal.fire(
              'Error editando moneda',
              'Intenta nuevamente.',
              'error'
            );
          }
        });
      }
    });
  }
}
