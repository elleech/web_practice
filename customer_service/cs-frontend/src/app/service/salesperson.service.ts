import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Salesperson from '../models/salesperson.model';

@Injectable({
  providedIn: 'root',
})
export class SalespersonService {
  constructor(private webService: WebService) {}

  getSalespeople() {
    return this.webService.get('/salespeople');
  }

  getSalesperson(saleUsername: string) {
    return this.webService.get(`/salespeople/${saleUsername}`);
  }

  createSalesperson(salesperson: Salesperson) {
    return this.webService.create<Salesperson>('/salespeople', salesperson);
  }

  updateSalesperson(saleUsername: string, salesperson: Salesperson) {
    return this.webService.update<Salesperson>(
      `/salespeople/${saleUsername}`,
      salesperson
    );
  }

  deleteSalesperson(saleUsername: string) {
    return this.webService.delete(`/salespeople/${saleUsername}`);
  }
}
