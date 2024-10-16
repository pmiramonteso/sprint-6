import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Output() totalWebCost = new EventEmitter<number>();
  
  form: FormGroup;
  modalTitle: string = '';
  modalBody: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      numeroDePaginas: [0, Validators.min(0)],
      numeroDeIdiomas: [0, Validators.min(0)],
    });

    this.form.valueChanges.subscribe(values => {
      const total = this.calcularTotal(values);
      this.totalWebCost.emit(total);
    });
  }

  setModalContent(title: string, body: string) {
    this.modalTitle = title;
    this.modalBody = body;

      const modalElement = document.getElementById('dynamicModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

  calcularTotal(values: any): number {
    return (values.numeroDePaginas * 30) + (values.numeroDeIdiomas * 30);
  }

  incrementoPaginas() {
    this.form.patchValue({
      numeroDePaginas: this.form.value.numeroDePaginas + 1
    });
  }

  decrementoPaginas() {
    if (this.form.value.numeroDePaginas > 0) {
      this.form.patchValue({
        numeroDePaginas: this.form.value.numeroDePaginas - 1
      });
    }
  }

  incrementoIdiomas() {
    this.form.patchValue({
      numeroDeIdiomas: this.form.value.numeroDeIdiomas + 1
    });
  }

  decrementoIdiomas() {
    if (this.form.value.numeroDeIdiomas > 0) {
      this.form.patchValue({
        numeroDeIdiomas: this.form.value.numeroDeIdiomas - 1
      });
    }
  }
}
