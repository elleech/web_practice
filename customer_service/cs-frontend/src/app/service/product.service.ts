import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private webService: WebService) {}

  getProducts() {
    return this.webService.get('/products');
  }

  getProduct(pdtId: string) {
    return this.webService.get(`/products/${pdtId}`);
  }

  createProduct(product: Product) {
    return this.webService.create<Product>('/products', product);
  }

  updateProduct(pdtId: string, product: Product) {
    return this.webService.update<Product>(`/products/${pdtId}`, product);
  }

  deleteProduct(pdtId: string) {
    return this.webService.delete(`/products/${pdtId}`);
  }
}
