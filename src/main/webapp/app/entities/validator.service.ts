import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor() {}

  static invalidacaoSelect(input: FormControl) {
    return input.value === 'padrao' ? { invalid: true } : null;
  }

  static invalidaValNeg(input: FormControl) {
    return input.value !== null && input.value < 0 ? { invalid: true } : null;
  }

  static invalidaValMov(input: FormControl, qtdEstoque: number, tipo: string) {
    return input.value !== null && tipo === '0' && input.value > qtdEstoque ? { invalid: true } : null;
  }

  static naoPreenchido(input: FormControl) {
    return (input.value === null || input.value === 'padrao') && input.touched ? { invalid: true } : null;
  }

  static dataFutura(input: FormControl) {
    if (input.value !== null) {
      const vet: string[] = input.value.split('/');
      const dataInformada = new Date(vet[2] + '/' + vet[1] + '/' + vet[0]);
      const dataAtual = moment()
        .tz('America/Sao_Paulo')
        .toDate();
      return input.value !== null && dataAtual.getTime() < dataInformada.getTime() ? { invalid: true } : null;
    } else {
      return null;
    }
  }

  static datasInconsistentes(dataInicio: Date, dataFim: Date) {
    return dataInicio.getTime() > dataFim.getTime() ? { invalid: true } : null;
  }
}
