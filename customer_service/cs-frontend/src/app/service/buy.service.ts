import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Buy from '../models/buy.model';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  constructor(private webService: WebService) {}

  getBuys() {
    return this.webService.get('/buys');
  }

  getBuyById(buyId: string) {
    return this.webService.get(`/buys/search?buyId=${buyId}`);
  }

  getBuyByCustomer(custUsername: string) {
    return this.webService.get(`/buys/search?custUsername=${custUsername}`);
  }

  getBuyByProduct(pdtId: string) {
    return this.webService.get(`/buys/search?pdtId=${pdtId}`);
  }

  getBuyBySalesperson(saleUsername: string) {
    return this.webService.get(`/buys/search?saleUsername=${saleUsername}`);
  }

  createBuy(buy: Buy) {
    return this.webService.create<Buy>('/buys', buy);
  }

  updateBuy(buyId: string, buy: Buy) {
    return this.webService.update<Buy>(`/buys/${buyId}`, buy);
  }

  deleteBuy(buyId: string) {
    return this.webService.delete(`/buys/${buyId}`);
  }
}
