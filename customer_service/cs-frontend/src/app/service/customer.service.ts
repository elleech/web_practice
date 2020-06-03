import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Customer from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private webService: WebService) {}

  getCustomers() {
    return this.webService.get('/customers');
  }

  getCustomer(custUsername: string) {
    return this.webService.get(`/customers/${custUsername}`);
  }

  createCustomer(customer: Customer) {
    return this.webService.create<Customer>('/customers', customer);
  }

  updateCustomer(custUsername: string, customer: Customer) {
    return this.webService.update<Customer>(
      `/customers/${custUsername}`,
      customer
    );
  }

  deleteCustomer(custUsername: string) {
    return this.webService.delete(`/customers/${custUsername}`);
  }
}
